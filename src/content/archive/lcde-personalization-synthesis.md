---
title: "Metsu: How Personalization Works, and How to Prove It"
date: 2026-06-28
summary: "This is the other half of Metsu: actually making any AI yours, not just storing your facts. I pulled the research on what really drives personalization (it's your own words, not descriptions of you), then went after the part everyone dodges: proof. The field hides behind a benchmark that's already been debunked. So I specced a falsifiable test. Hide your last messages, predict what you'd say, score it against what you actually wrote. If it can't predict you, it doesn't know you. That's the bar."
category: research
status: shipped
tags: ["AI personalization", "LLM evaluation", "cognitive modeling", "research"]
---

> ↩ Part of [**Metsu**](/archive/metsu), my living cognitive engine. The cognitive side: [**What It Extracts →**](/archive/lcde-facet-catalog) and [**the science →**](/archive/lcde-extraction-grounding).


*Six-angle cited research pass on optimizing any LLM for one person. Confirms A works, states the design rules from evidence, the competitor teardown, the moat, and most importantly the protocol that PROVES personalization (the problem that was open). 2026-current.*

---

## Headline

A works, the science says exactly how to do it better than the field, and the "you'd just have to believe it" problem is solvable with a falsifiable predictive evaluation. The unique, capability-proving move is not the personalization itself (contested) but the *rigorous proof* of it that the whole field is currently dodging behind a discredited benchmark.

---

## 1. What actually makes personalization work (design rules, from evidence)

- **The active ingredient is the user's own outputs.** A controlled ablation found profiles personalize because they encode the user's own *responses/endorsed text*, not descriptions of the user and not their inputs. Dropping the input halves of examples and packing in more of the user's actual outputs improved results (LaMP-2 F1 0.571 to 0.626). *Confidence: strong.* (arXiv:2406.17803)
- **Distilled profile beats raw dump.** A condensed, synthesized profile had greater personalization impact than raw context snippets. Deeper profiling beats surface. Your synthesis engine is the right call. *Confidence: mixed-to-strong.* (arXiv:2502.11528)
- **Retrieval personalization gives real gains:** ~15% average improvement on generation tasks (LaMP), RAG+PEFT ~16%. *Confidence: strong.* (arXiv:2404.05970)
- **Stable cognition as scaffold beats transient preferences** for consistency and for organizing sparse/noisy data. *Confidence: emerging (2026 preprints).*
- **Persona role-play does NOT help objective tasks and can hurt** (no significant gain across 162 personas; 9 significant negative effects in a 6-model replication). It only helps subjective/creative work. *Design rule: frame the profile as preferences and voice, never as "act as a type."* *Confidence: strong.* (arXiv:2311.10054, arXiv:2512.05858)
- **Voice/style: 3 to 5 verbatim exemplars dominate descriptions** (GPT-4o authorship match 28.6% to 59.7% zero to 5-shot), plateauing around 4 to 5; add a short explicit style-descriptor block; lean harder on raw samples for informal voice. *Confidence: strong.* (arXiv:2509.14543)

## 2. The proof protocol (solves the open problem)

The field lacks standard personalization evaluation and hides behind a discredited memory benchmark. Build the rigorous version. Five designs, most-falsifiable first; run at least the first two.

1. **Held-out next-message prediction (the falsifiable core).** Time-split the user's history, hide the last N messages, generate what they would say, score against the real text with Word Mover's Distance + sentence similarity (substance) and length-ratio + type-token-ratio (style), z-scored per-user then averaged. Ground truth = what they actually wrote. (YNTP-100, arXiv:2510.14398; Pref-LaMP "ground-truth user completions" arXiv:2512.23067)
2. **Forced-choice prediction (Goodhart-resistant).** Predict the user's real binary choices on held-out data; report hold-out preference accuracy vs a generic baseline and a majority baseline; binomial significance test. Style tricks cannot game a discrete-choice accuracy. (arXiv:2503.17338)
3. **Authorship-verifier / self-recognition.** Can a stylometric verifier (or the user, blind) distinguish the model's output from the user's real writing? It's hard even for GPT-4o with real samples, so a meaningful pass rate is a strong claim. Pair with human d-prime self-recognition. (arXiv:2408.08946)
4. **Blind A/B, personalized vs generic, WITH a false-personalization control** (someone else's profile) to rule out "any tailoring feels better." Hidden-numeral analog scale to avoid anchoring (PRISM design). (arXiv:2404.16019, arXiv:2502.19158)
5. **Validated LLM-as-judge, only after calibration:** prove the judge correlates with the user's own ratings (report Spearman rho, Cohen kappa); use a different model family than the generator (self-preference bias is proven); randomize order; never optimize the score you report. (arXiv:2506.13639, arXiv:2506.22316)

**Cross-cutting guards:** always include a generic baseline AND a false-personalization control; time-split to prevent leakage; report per-user variance; remember a populated memory store is NOT evidence of better output (AlpsBench). *Confidence: strong on designs 1-2, the rest solid with the stated guards.*

## 3. Delivery architecture (hybrid, not one mechanism)

- **Small, high-signal static core (context.md):** most portable, zero infra, auditable. Keep it tight and front-loaded because of context rot and lost-in-the-middle (every model degrades as input grows; U-shaped attention favors start/end). Format as Markdown with short labeled sections, most load-bearing first. (Chroma context-rot; Liu et al. TACL 2024; Anthropic context-engineering; arXiv:2411.10541)
- **Retrieval/memory for the long tail:** beats full-context on cost and latency (and accuracy on the vendor LOCOMO numbers, flagged); graph store for temporal/relational facts.
- **Per-user LoRA only if you control the weights:** now economically feasible (S-LoRA serves thousands of adapters per GPU), and YNTP-100 found LoRA beats prompting at matching an individual. Not portable across closed APIs.
- **MCP for delivery:** mature, vendor-neutral (donated to a Linux Foundation foundation Dec 2025). But MCP is transport, NOT a profile format. There is no neutral standard for "the user's portable cognitive model" yet (PAM and a W3C group are racing to fill it). White space.
- **Recommended:** small cited context.md core + retrieval for depth + MCP delivery, with the profile schema as your own design (the missing standard). LoRA later if/when you control a model. *Confidence: strong.*

## 4. Competitive teardown (punchline)

- **The field's benchmark is discredited.** LoCoMo conversations are short enough that plain full-context beats the memory systems on it; Zep's reproduction reversed Mem0's SOTA claim. Every "243% / 26% / 18.9%" is vendor-run on this flawed benchmark. *Confidence: strong (documented, code published).*
- **Everyone stores facts/preferences, not cognition.** Mem0, MemSync, Letta, OpenAI memory, Claude memory, Cognee, Zep all model what is true about the user (optionally as graphs, optionally time-aware). None models how the user reasons, decides, and makes meaning, grounded in validated psychology with cited inferences.
- **MemSync is the only one that even claims psychology** and its grounding stops at the episodic/semantic storage taxonomy; it does not infer trait structure or reasoning style.
- **Honest hard truths (where they're strong):** you can't out-distribute OpenAI/Claude native memory (be portable, sit on top); you can't beat Zep at temporal-graph plumbing (use it underneath); "transparent memory" alone isn't differentiating (Claude ships markdown memory). The higher bar you can own: a transparent *inference chain* (this trait, from these cited behaviors, hedged).

## 5. The moat and positioning

Lead with A (personalization), powered by three things no incumbent combines:
1. **Depth:** model how you think (cognition), not what you prefer (facts), grounded in validated psychology.
2. **Proof:** the predictive evaluation in section 2, which the field avoids. This is the capability flex.
3. **Trust leg:** user-owned, local-first. This is the most defensible leg. "Portable" alone is commoditizing fast (the labs shipped memory import in Q1 2026). But privacy is the #1 adoption lever (57%), only ~8% of users accept unconditional data access, and people pay a premium and churn over AI-data trust. Incumbents structurally can't copy local-first because their business is centralized data. *Confidence: strong.*

Do not headline "portability." Headline "the personalization that's actually grounded and actually proven, and that you own."

## 6. Risks to design against (the science names them)

- **Sycophancy is structurally coupled to personalization.** Personalization features measurably increase agreeableness; models flip correct answers to wrong ones to agree ~14.7% of the time. Your separation of expressed-vs-inferred and your refusal to flatter is a direct mitigation and a selling point. (arXiv:2502.08177; MIT News Feb 2026)
- **Over-personalization** (irrelevance, repetition, intrusiveness) is real and benchmarkable (OP-Bench). Use only high-signal profile content; more is not better.
- **Personalization-induced hallucination:** models treat the user's beliefs as truth. Keep preferences and facts/beliefs explicitly separated and labeled (your two-layer schema already does this). (arXiv:2601.11000)

---

## Sources (load-bearing)
arXiv:2406.17803 (what in a profile drives personalization) · arXiv:2404.05970 / 2402.04401 (LaMP gains) · arXiv:2311.10054 / 2512.05858 (persona prompting fails on objective tasks) · arXiv:2510.14398 (YNTP-100 held-out prediction) · arXiv:2512.23067 (Pref-LaMP ground-truth completions) · arXiv:2503.17338 (hold-out preference accuracy) · arXiv:2408.08946 (authorship attribution hard for LLMs) · arXiv:2404.16019 (PRISM) · arXiv:2502.19158 (personalization eval gap) · arXiv:2506.13639 / 2506.22316 (LLM-judge bias) · research.trychroma.com/context-rot · aclanthology.org/2024.tacl-1.9 (lost in the middle) · anthropic.com/engineering/effective-context-engineering-for-ai-agents · arXiv:2411.10541 (prompt format matters) · arXiv:2509.14543 (style exemplars) · arXiv:2504.19413 (Mem0/LOCOMO, vendor) · blog.getzep.com/lies-damn-lies-statistics-is-mem0-really-sota (LoCoMo discredited) · arXiv:2311.03285 (S-LoRA) · arXiv:2502.08177 (sycophancy) · arXiv:2601.11000 (personalization-induced hallucination) · W3C AI Agent Memory Interoperability CG (2026) · github.com/portable-ai-memory.
