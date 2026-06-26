// FDD Diff Engine — live demo proxy.
//
// Holds the OpenRouter key server-side and runs ONE FDD item's year-over-year
// diff with Gemini 2.5 Flash-Lite. Input is an item NUMBER only — the prior and
// current sections are the bundled real Alloy filings, so this endpoint can only
// ever diff the sample. Nobody can spend the key on arbitrary text.
//
// Deterministic items (9, 17, 20, 23) bypass the LLM entirely, mirroring the
// production engine (apps/worker-v2): Item 20 returns precomputed verbatim outlet
// deltas; 9/17/23 are template/CFR generators.
//
// Env: OPENROUTER_API_KEY (set in Netlify dashboard).

import sample from "./alloy_sample.json";

const MODEL = "google/gemini-2.5-flash-lite";
const ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";
// Netlify synchronous functions are killed at 10s by default (raisable to 26s on
// paid plans). Defaults below stay safely under 10s. To unlock full recall after
// raising the Netlify limit, set env: CALL_TIMEOUT_MS=24000, DIFF_SECTION_CHARS=60000.
const SECTION_CAP = parseInt(process.env.DIFF_SECTION_CHARS || "40000", 10);
const CALL_TIMEOUT_MS = parseInt(process.env.CALL_TIMEOUT_MS || "8500", 10);
const MAX_TOKENS = 8000;
const MAX_ATTEMPTS = 3;
// Don't START another attempt past this — the browser retries with a fresh invocation,
// so a slow/erroring provider degrades to a quick soft-fail rather than a hang.
const RETRY_BUDGET_MS = Math.max(2000, CALL_TIMEOUT_MS - 3500);

const DETERMINISTIC_NOTES = {
  9: "Item 9 is a deterministic generator — the franchisee-obligations cross-reference table is rebuilt from the franchise agreement, not LLM-diffed.",
  17: "Item 17 is a deterministic generator — renewal/termination table rebuilt and the franchise agreement scanned for banned acknowledgements (NASAA Rule 7).",
  23: "Item 23 is a deterministic generator — receipt pages rebuilt with verbatim CFR language and a rolled-forward issuance date.",
};

const SYSTEM_PROMPT =
  "You are a precision legal analyst reviewing a Franchise Disclosure Document (FDD) update.\n" +
  "Your ONLY job: identify factual differences between last year's FDD item section and this " +
  "year's FDD item section, and quote them verbatim.\n" +
  "ABSOLUTE RULES:\n" +
  "1. VERBATIM ONLY. Every prior_value copied character-for-character from [PRIOR YEAR FDD]. " +
  "Every new_value copied from [CURRENT YEAR FDD]. Do not paraphrase or reconstruct.\n" +
  "2. NO INVENTION. If you cannot find a verbatim match, do not report it. An empty list is correct.\n" +
  "3. QUOTE LENGTH. Shortest verbatim span that identifies the value (target under 80 chars, cap 200).\n" +
  "4. Report only substantive factual changes (fees, dollar amounts, counts, dates, names, terms, " +
  "obligations). Ignore pure formatting or whitespace differences.\n" +
  '5. JSON ONLY. Return one object: {"changes":[{"field_path":string,"prior_value":string,' +
  '"new_value":string,"change_type":"modified"|"added"|"removed","is_material":boolean,' +
  '"summary":string}]}. No prose, no markdown.';

const norm = (s) => String(s == null ? "" : s).replace(/\s+/g, " ").trim().toLowerCase();

// Deterministic anti-hallucination gate (whitespace-normalized verbatim match).
function validate(rawChanges, prior, neu) {
  const pl = norm(prior);
  const nl = norm(neu);
  const kept = [];
  let discarded = 0;
  for (const c of rawChanges || []) {
    const ct = String(c.change_type || "").trim();
    const fp = String(c.field_path || "").trim();
    const summary = String(c.summary || "").trim();
    const pv = norm(c.prior_value);
    const nv = norm(c.new_value);
    const typeOk = ct === "modified" || ct === "added" || ct === "removed";
    const fieldsOk = fp && ct && summary;
    const priorOk = ct === "added" || (pv && pl.includes(pv));
    const newOk = ct === "removed" || (nv && nl.includes(nv));
    if (typeOk && fieldsOk && priorOk && newOk) {
      kept.push({
        field_path: fp,
        prior_value: String(c.prior_value || ""),
        new_value: String(c.new_value || ""),
        change_type: ct,
        is_material: Boolean(c.is_material),
        summary,
      });
    } else {
      discarded += 1;
    }
  }
  return { kept, discarded };
}

async function callModel(key, item, title, prior, neu) {
  const user =
    `=== PRIOR YEAR FDD — ITEM ${item}: ${title} ===\n${prior.slice(0, SECTION_CAP)}\n\n` +
    `=== CURRENT YEAR FDD — ITEM ${item}: ${title} ===\n${neu.slice(0, SECTION_CAP)}\n\n` +
    "Compare the two sections. Return ONLY the JSON object.";
  const payload = {
    model: MODEL,
    temperature: 0.0,
    max_tokens: MAX_TOKENS,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: user },
    ],
  };

  let lastErr = "no response";
  const started = Date.now();
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    if (attempt > 0 && Date.now() - started > RETRY_BUDGET_MS) break; // stay under the 10s kill
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), CALL_TIMEOUT_MS);
    try {
      const resp = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
          "HTTP-Referer": "https://akanmutech.com",
          "X-Title": "FDD Diff Engine",
        },
        body: JSON.stringify(payload),
        signal: ctrl.signal,
      });
      if (!resp.ok) {
        lastErr = `HTTP ${resp.status}`;
        if ([401, 403].includes(resp.status)) {
          // Key present but rejected (invalid / disabled / no credits). Retrying
          // can't fix a bad key — tag it terminal so the handler surfaces "API key
          // invalid" instead of the generic transient-provider soft-fail.
          const e = new Error(`OpenRouter auth ${resp.status}: ${(await resp.text()).slice(0, 200)}`);
          e.authError = true;
          throw e;
        }
        if ([429, 500, 502, 503].includes(resp.status)) {
          await new Promise((r) => setTimeout(r, 800 * (attempt + 1)));
          continue;
        }
        throw new Error(`OpenRouter ${resp.status}: ${(await resp.text()).slice(0, 200)}`);
      }
      const body = await resp.json();
      const choice = body?.choices?.[0];
      const content = choice?.message?.content || "";
      const finish = choice?.finish_reason;
      // finish_reason 'error' = upstream provider failed mid-generation (partial/empty
      // content); 'length' = truncated past max_tokens. Both are unparseable — retry.
      if (!content.trim() || finish === "error") {
        lastErr = `bad response (finish=${finish})`;
        await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
        continue;
      }
      const usage = body.usage || {};
      let parsed;
      try {
        parsed = JSON.parse(content);
      } catch {
        lastErr = "json parse";
        continue; // retry once on malformed/truncated JSON
      }
      return { changes: parsed.changes || [], usage };
    } catch (e) {
      if (e.authError) throw e; // terminal — never burn retries on a bad key
      lastErr = e.name === "AbortError" ? `timeout after ${CALL_TIMEOUT_MS}ms` : e.message;
    } finally {
      clearTimeout(timer);
    }
  }
  throw new Error(`model call failed after ${MAX_ATTEMPTS} attempts: ${lastErr}`);
}

export default async (req) => {
  const t0 = Date.now();
  const url = new URL(req.url);
  const item = parseInt(url.searchParams.get("item") || "", 10);

  if (!Number.isInteger(item) || item < 1 || item > 23) {
    return Response.json({ error: "item must be 1–23" }, { status: 400 });
  }
  const rec = sample.items[String(item)];
  if (!rec) return Response.json({ error: `no sample data for item ${item}` }, { status: 404 });

  const base = {
    item,
    title: rec.title,
    deterministic: Boolean(rec.deterministic),
    always_review: Boolean(rec.always_review),
  };

  // Deterministic path — no LLM, no key spend.
  if (rec.deterministic) {
    return Response.json({
      ...base,
      llm: false,
      changes: rec.changes || [],
      discarded: 0,
      note: DETERMINISTIC_NOTES[item] || null,
      ms: Date.now() - t0,
    });
  }

  const key = process.env.OPENROUTER_API_KEY || process.env.openrouter;
  if (!key) {
    return Response.json({ ...base, error: "OPENROUTER_API_KEY not configured" }, { status: 500 });
  }

  try {
    const { changes, usage } = await callModel(key, item, rec.title, rec.prior, rec.new);
    const { kept, discarded } = validate(changes, rec.prior, rec.new);
    return Response.json({
      ...base,
      llm: true,
      changes: kept,
      discarded,
      tokens: { in: usage.prompt_tokens || 0, out: usage.completion_tokens || 0 },
      ms: Date.now() - t0,
    });
  } catch (e) {
    if (e.authError) {
      // Key was present but rejected — surface it plainly so a bad/empty key is not
      // mistaken for a transient provider outage (which the soft-fail implies).
      return Response.json({
        ...base,
        llm: true,
        changes: [],
        discarded: 0,
        auth_error:
          "OpenRouter rejected the API key (HTTP 401/403) — it is invalid, disabled, or out of credits. Set/replace OPENROUTER_API_KEY in the Netlify site env.",
        ms: Date.now() - t0,
      });
    }
    // Soft-fail: a flaky provider error on one item must not break the run. Return
    // 200 with no changes + a visible note; the browser also retries with a fresh call.
    return Response.json({
      ...base,
      llm: true,
      changes: [],
      discarded: 0,
      soft_error: "Live diff unavailable for this item on this run (provider error/timeout) — rerun to retry.",
      ms: Date.now() - t0,
    });
  }
};

export const config = { path: "/api/diff-item" };
