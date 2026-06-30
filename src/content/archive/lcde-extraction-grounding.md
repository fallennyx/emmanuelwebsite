---
title: "Metsu: Cognitive-Science Grounding"
date: 2026-06-26
summary: "I'm building this engine on the side, and to build it right I need to understand the human brain — how we communicate, how we talk, how to pull what's actually in someone's head out as cleanly as possible. Smarter people in psycholinguistics, psychology, and neuroscience have already done the hard part. So I went and did the research and pulled what they proved straight into the engine. This is what it produced: what you can read from a person's words, what you can't, and what the engine should refuse to guess."
category: research
status: shipped
tags: ["cognitive science", "psycholinguistics", "AI memory", "research grounding"]
---

> ↩ The cognitive-science grounding behind [**Metsu**](/archive/metsu), my living cognitive engine. What it pulls out: [**Facet Catalog →**](/archive/lcde-facet-catalog).


*The science that defines what the engine extracts, what it infers, and what it refuses. Every design rule below traces to peer-reviewed evidence. Built June 2026.*

---

## Bottom line (the reframe that makes this defensible)

The academic literature on "inferring personality/cognition from text" reports a hard ceiling: aggregate predictive validity of **r ≈ 0.3–0.4** against self-report, explaining **under 20% of variance**, dropping further at the individual level, and **generalizing poorly across text domains and populations**. If the engine's job were "predict someone's Big Five score from their notes," the science says it would mostly fail and any confident output would be pseudoscience.

**The engine does not do that.** The defensible move is to split the product into two epistemically distinct layers:

- **Layer A — Grounded extraction (high confidence).** What the person *actually expressed*: beliefs they stated, ideas they voiced, decisions they made, questions they wrestled with, topics they return to, the framings and vocabulary they use. This is qualitative content analysis, not trait prediction. Every item cites a source span. The groundedness constraint sidesteps the inference problem entirely. This is the bulk of the value and it is not subject to the r ≈ 0.3 ceiling, because it is extraction, not inference.

- **Layer B — Inferred disposition (low confidence, hedged, dimensional).** Cognitive-style and emotional-baseline read. This IS subject to the ceiling, so it must be: dimensional never typological, hedged with explicit confidence, grounded in validated markers where they exist, framed as "patterns in this corpus" never "who you are," and computed from deterministic psycholinguistic features wherever possible rather than LLM vibes.

The differentiator ("mythos") is exactly this discipline: most "AI personality" tools ship Layer B as if it were Layer A, dressed as confident truth, which the Barnum effect makes *feel* accurate while being invalid. An engine that separates what you said from what's inferred, cites every claim, computes validated features deterministically, and refuses to output a type is scientifically honest in a field full of astrology. That is a real, articulable edge.

---

## 1. What the science validates (the usable signal)

**Function words carry more psychological signal than content words.** Under 500 function words (pronouns, articles, prepositions, auxiliaries, conjunctions, negations) make up ~55% of all words used, and their patterns track attention, status, and thinking style more reliably than topic words. This is the most replicated finding in the field. *Confidence: strong.* (Tausczik & Pennebaker 2010; Pennebaker 2011.)

**Analytic vs narrative style is computable and reproducible.** The Categorical-Dynamic Index / "Analytic Thinking" index is a factor from eight function-word categories (articles + prepositions load high = categorical/formal; pronouns, auxiliaries, adverbs, conjunctions, negations load low = dynamic/narrative). It correlated r ≈ 0.18–0.20 with college GPA across 50,000+ essays. *Confidence: strong that it is a reproducible style marker; weak/contested that it measures cognitive "ability."* Markowitz (2023) argues it tracks motivation-to-think, not capacity. **Design rule: treat it as a style signal, never an IQ proxy.** (Pennebaker et al. 2014, PLOS ONE; Markowitz 2023.)

**Integrative complexity is a validated, decades-replicated construct.** Scored 1–7 for differentiation + integration, inter-coder reliability >0.80; drops in leader complexity precede conflict escalation. Real predictive track record, but a known structure/content confound (it can pick up topic valence, not just thinking structure). *Confidence: strong as predictor, moderate construct validity.* (Suedfeld & Tetlock; Conway AutoIC 2014.)

**Explanatory style is extractable from any text with strong validity.** The CAVE technique scores permanence/pervasiveness/personalization (the "3 Ps") from naturalistic text, correlating r = 0.71 with the Attributional Style Questionnaire and predicting long-term health and longevity prospectively. *Confidence: strong* (the single best-validated text-to-cognition method found, though labor-intensive). (Schulman, Castellon & Seligman 1989; Peterson, Seligman & Vaillant 1988.)

**Absolutist language indexes distorted thinking structure.** Words like *always, never, completely, nothing* were ~50% more frequent in anxiety/depression forums and ~80% more in suicidal-ideation forums, tracking severity better than negative-emotion words. *Confidence: strong at group level; the design caveat is it was validated forum-level, not individual-level.* (Al-Mosaiwi & Johnstone 2018.)

**Psychological distancing has a clear linguistic signature.** Reduced first-person-singular use, more abstract language, and third-person/name self-reference mark successful emotion regulation and reduce reactivity without consuming cognitive control. Partly cross-linguistic. *Confidence: strong, multi-method (behavioral, ERP, fMRI).* (Nook et al. 2017; Kross & Ayduk 2017; Orvell et al. 2019/2021.)

**Values are recoverable from text at modest strength.** The Personal Values Dictionary (Schwartz framework) correlates r ≈ 0.10–0.40 with self-reported values and recovers the predicted circumplex structure. *Confidence: moderate; aggregate/relative only.* (Ponizovskiy et al. 2020.) For moral signal, the original Moral Foundations Dictionary is contested keyword-counting; the extended eMFD and embedding-based DDR methods are meaningfully better. (Hopp et al. 2021; Garten et al. 2018.)

**Self-referential language reflects self-focus, weakly.** First-person-singular use correlates with depression at r ≈ 0.10–0.13 (meta-analytic, N ≈ 3,758–4,754), but the signal is general negative affectivity / self-focus, **not depression specifically.** *Confidence: strong that the effect is real; strong that it is too small for any individual inference.* (Edwards & Holtzman 2017; Tackman et al. 2019.)

**Personality-from-language tops out at r ≈ 0.3–0.4 aggregate.** Open-vocabulary models on 75,000 Facebook users hit r ≈ 0.31–0.41; the canonical validation (Park et al. 2015) averaged r = 0.38, with Openness most predictable (~0.43) and Neuroticism/Agreeableness hardest (~0.35). Language captures *non-redundant* signal beyond informant report and is temporally stable (test-retest r ≈ 0.70). *Confidence: strong for the numbers; strong that this is an aggregate ceiling.* (Schwartz et al. 2013; Park et al. 2015.)

**LLMs roughly match purpose-built models, with caveats.** Zero-shot GPT/Claude infer Big Five from social text at r ≈ 0.29; a 2025 *Nature Human Behaviour* study found multi-model-averaged LLM scores on open narratives matched or beat benchmarks. But a rigorous 2025 critique found weak construct validity (max r ≈ 0.27, interrater κ < 0.10) and a "decisiveness bias" toward predicting moderate-to-high trait levels. *Confidence: promising but not settled; treat LLM trait output as hypothesis, never measurement.* (Peters & Matz 2024; Wright et al. 2025; arXiv:2511.23101.)

---

## 2. What the science forbids (hard guardrails)

These are non-negotiable. Each is a published debunk or a robust methodological limit. Violating them turns the engine into astrology.

**No "I-use = narcissism."** Flatly false: r = 0.02, 95% CI [−0.02, 0.04], across 4,811 people, 5 labs, 5 measures, 2 languages. The folk belief had near-zero support. *Confidence: very strong debunk.* (Carey et al. 2015; APA 2015.)

**No clinical inference.** Never output depression, anxiety, or any diagnosis. The pronoun signal (r ≈ 0.13) explains ~1% of variance and is non-specific. Self-focus is the most you can note, hedged, and only as a corpus pattern.

**No typologies.** MBTI-style four-letter types flip for 39–76% of people on retest because dichotomizing near-median continuous scores manufactures false boundaries. Dimensional output is strictly more defensible. **The engine never emits a "type."** (Stein & Swan 2019.)

**Aggregate ≠ individual.** Every validated effect above is a population correlation. For one person, an r = 0.3 estimate carries wide uncertainty. The engine models one person, so it must lean on *within-person* longitudinal patterns and grounded extraction, and avoid any comparison to population norms (no validated basis exists). (Curran & Bauer 2011 on within/between disaggregation.)

**Guard against the Barnum effect.** People rate vague universal statements as highly accurate and personal (Forer 1949). A profile that *feels* accurate is a danger signal, not a success signal. Specificity-with-citation is the antidote: a claim tied to a quote the person actually wrote cannot be Barnum filler.

**Distrust the LLM's own confidence.** LLMs are sycophantic (they confirm whatever self-narrative is in the prompt), overconfident when verbalizing certainty, and confabulate under uncertainty — and psychological profiling is a maximally uncertain generative task. Any LLM disposition read is a hypothesis to falsify, never a fact. (Social sycophancy arXiv:2505.13995; overconfidence *Nat. Mach. Intell.* 2026.)

**Assume non-generalizability and bias.** Pronoun markers fail cross-culturally; most validation is English/WEIRD; LLM inference accuracy varies by demographic and the field cannot separate training-data bias from real expression differences. Word-count affect detection has poor positive predictive value (LIWC negative-emotion agreement ~37%) and is unreliable under ~50 words. (Kučera & Mehl 2022; Bantum & Owen 2009; Peters & Matz 2024.)

---

## 3. Spoken vs written: weight them differently

Spontaneous speech and stream-of-consciousness reveal more affect and less filtering (disfluencies, higher LIWC "authenticity," uninhibited function-word patterns) than edited writing, which is curated. Public/social text is shaped by *self-presentation* (impression management for an audience), a construct distinct from *self-disclosure*; it is an idealized-but-often-genuinely-held version of the self. (Bazarova & Choi 2019; Bailey et al. 2020.)

**Design rules:**
- Tag every document with modality (spoken / private-written / public-written) and weight private + spoken higher for disposition signal, public lower ("performed identity").
- The voice-vs-notes delta feature is scientifically grounded: it operationalizes the self-disclosure vs self-presentation distinction. "What you say but never write" is a real psychological seam, not a gimmick.

---

## 4. Engine design translation (this defines the build)

### 4.1 Two-layer output, never blended

Every output separates **Expressed** (Layer A, cited, high confidence) from **Inferred** (Layer B, hedged, dimensional). The UI and the context.md visibly mark which is which. This single discipline is the product's integrity.

### 4.2 Hybrid extraction: deterministic features + grounded LLM

The most validated cognitive-style signals are *computable in code*, cheaply and reproducibly, and should not be left to LLM judgment:

- Analytic/narrative index (CDI) from function-word counts
- First-person-singular rate, pronoun ratios (we/I, I/you)
- Absolutist-word frequency
- Abstractness / distancing markers
- Type-token ratio, word count, words-per-document
- Schwartz value-dictionary and eMFD scores (relative, hedged)

Compute these deterministically per corpus and per time-window (not per short document — the <50-word reliability floor means ratios must be aggregated). They give reproducible, citable numbers that *anchor* the LLM's qualitative read instead of letting it freelance. The LLM's job is Layer A thematic extraction (grounded to spans) plus careful, hedged narrative synthesis that is *constrained by* the computed features. **This hybrid is the moat: combine the field's highest-signal validated methods rather than re-inventing them, and refuse the parts that don't replicate.**

### 4.3 Revised CognitiveAtom schema (per document)

Keep the architecture doc's grounded fields (these are Layer A and defensible): `beliefs`, `mental_models`, `ideas`, `decisions`, `self_concept`, `execution_signals`, plus `themes`/`entities`/`open_questions` from the voice repo. Changes the science requires:

- **Add `source_span` (verbatim quote) to every extracted item.** Groundedness is enforced, not hoped for. No span, no claim.
- **Add a deterministic `linguistic_features` block** (computed, not LLM-generated) at the document and aggregate level.
- **Demote `emotional_state` to dimensional + low-confidence:** valence and arousal only, corpus-relative, never a labeled emotion asserted as fact.
- **Add `confidence` to every Layer B item** (strong / weak / unvalidated).
- **Add `modality` and `audience`** (spoken/written, private/public) for source weighting.
- **Remove anything typological.** No type labels anywhere in the schema.
- **`communication_patterns` stays** but as observed style description, not trait claim.

### 4.4 Extraction-prompt principles

The MAP prompt must instruct the model to: extract only what is present (no inference beyond text), quote the supporting span for every item, leave fields empty when absent (empty is correct), separate what the person *asserts* from what the prompt's reader might infer, and never assign a type, diagnosis, or population comparison. The voice repo's existing extraction prompt already does most of this ("extract only what is actually present, do NOT invent") — extend it with the span requirement and the no-inference/no-diagnosis guardrails.

### 4.5 Synthesis principles

Model one person *longitudinally and within-person* (rolling-state spine fits this exactly). Track change over time, which is legitimate when repeatedly sampled. Never compare to population norms. Surface contradictions between stated belief and behavior (the notes repo's "actions over intentions" framing is well-aligned with the self-presentation literature). Lead every disposition claim with its evidence pattern; if the evidence is thin, say so (this mirrors the existing STRENGTHS prompt's honest-ceiling discipline).

---

## 5. The one-paragraph pitch this licenses

Most tools that claim to model "how you think" are running Barnum-effect astrology: confident, type-based, uncited, and invalid the moment you check them against the science. LCDE separates what you actually expressed (every claim quoted back to its source) from what is cautiously inferred (dimensional, hedged, never a type, never a diagnosis), computes the genuinely validated psycholinguistic features in reproducible code, weights spoken-private signal over performed-public signal, and tracks you against your own past rather than a population it has no right to compare you to. It is the first cognitive-model tool that refuses to lie to you to feel impressive.

---

## Sources (primary)

Tausczik & Pennebaker (2010), *J. Language and Social Psychology* — LIWC framework. Pennebaker et al. (2014), *PLOS ONE* — CDI/Analytic Thinking. Markowitz (2023), *Applied Cognitive Psychology* — analytic-index reinterpretation. Suedfeld & Tetlock; Conway et al. (2014), *Political Psychology* — integrative complexity. Schulman, Castellon & Seligman (1989); Peterson, Seligman & Vaillant (1988) — CAVE/explanatory style. Al-Mosaiwi & Johnstone (2018), *Clinical Psychological Science* — absolutist words. Nook et al. (2017), *Psychological Science*; Kross & Ayduk (2017); Orvell et al. (2019/2021) — distancing language. Ponizovskiy et al. (2020), *European J. Personality* — Personal Values Dictionary. Hopp et al. (2021); Garten et al. (2018) — eMFD / DDR. Edwards & Holtzman (2017); Tackman et al. (2019) — I-talk/depression. Carey et al. (2015); APA (2015) — narcissism debunk. Schwartz et al. (2013), *PLOS ONE*; Park et al. (2015), *JPSP*; Youyou, Kosinski & Stillwell (2015), *PNAS* — personality from language. Peters & Matz (2024), *PNAS Nexus*; Wright et al. (2025), *Nature Human Behaviour*; arXiv:2511.23101 — LLM inference. Stein & Swan (2019) — MBTI critique. Forer (1949) — Barnum effect. Open Science Collaboration (2015), *Science* — replication baseline. Bazarova & Choi (2019); Bailey et al. (2020), *Nature Communications* — self-presentation vs disclosure. Bantum & Owen (2009); Kučera & Mehl (2022) — affect-detection and cross-cultural limits. Curran & Bauer (2011), *Annual Review of Psychology* — within/between disaggregation.
