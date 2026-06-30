---
title: "Metsu: What It Extracts (Facet Catalog)"
date: 2026-06-27
summary: "This is the build spec: every signal the engine could pull from your words, graded by whether real science actually backs it. I cut the facets that would be invented. I kept the validated ones. And I promoted the goldmine I almost missed in v1: narrative identity, the story you tell about your own life. Decades of peer-reviewed work say you can code that straight from text, and nobody else in this space touches it. That's the wedge."
category: research
status: shipped
tags: ["cognitive science", "psycholinguistics", "AI memory", "narrative identity"]
---

> ↩ Part of [**Metsu**](/archive/metsu), my living cognitive engine. The science behind these facets: [**Cognitive-Science Grounding →**](/archive/lcde-extraction-grounding).


*Six-angle research pass, cited and cross-checked. This grades every candidate facet by validated extractability from ONE person's personal text, cuts the pseudoscience, and adds high-value constructs the first list missed. This is the build spec for the extraction engine.*

---

## The five things that changed

1. **Narrative identity is the goldmine.** The McAdams narrative-identity literature is the single richest *validated-for-free-text* vein in the whole space: it was designed to code autobiographical text, has trained-coder reliability (κ/ICC .70–.96), automated dictionaries, and meta-analytic links to wellbeing. It was barely in v1. It should be a headline CORE pillar. This is the differentiated wedge: nobody in the competitive scan (Mem0, MemSync, Purpose, Karpathy me.md) touches it.

2. **Three of the intuitive facets have NO validated text measure and must be cut or relabeled:** systems-thinking markers (no instrument exists), analogical-reasoning style (NLP measures model performance, not a person's trait), and maximizing-vs-satisficing (questionnaire-bound, and the questionnaire itself is contested). Shipping these as scored traits would be inventing science.

3. **The single best net-new addition is hedging / metacognition** (LIWC tentative + certainty + insight): high validity, transparent, cheap, directly indexes epistemic humility and confidence. Promote to CORE.

4. **The abstraction family collapses into one signal.** Analytic style, Linguistic Category Model, Construal Level, and Linguistic Intergroup Bias all reuse the same abstraction machinery. Ship ONE abstraction signal with optional lenses, not four redundant facets.

5. **Per-entry affect is out; corpus-relative trends are in.** Word-count affect detection has poor positive predictive value on single texts. A "you feel sad" claim on one note will be wrong often enough to break trust. Roll all affect to within-person trends. This is an architecture constraint, not a footnote.

---

## CORE — validated, default-on backbone

Grouped by what they measure. Method class in brackets: [D] deterministic/lexicon, [L] LLM extraction (span-grounded), [C] trained classifier.

**Expressed content (Layer A, cited)**
- Core beliefs / convictions [L] — stance extraction toward stated targets; near-reading-comprehension, the most defensible operation in the set.
- Idea index [L] — voiced ideas/concepts; the primitive every downstream idea facet depends on.
- Idea recurrence / obsessions [D+L] — reference rate per topic over time; best single signal of preoccupation.
- Idea trajectory [D+L] — one-off vs intensifying vs abandoned; first derivative of recurrence (needs timestamps).
- Decisions voiced [L] — stated decisions; primitive for the execution half.
- Execution signals [L] — shipped/planned/abandoned/stalled, by linking decisions to later status language.
- Action vs intention language [D+L] — NEW. Goal-intention vs implementation-intention ("when X, I'll do Y") vs completed action. Highest value-to-extractability ratio found; meta-analytically robust.
- Identity claims [L] — "I am X" self-definitions, scorable on agency/communion.

**Cognitive style (Layer B, hedged, mostly deterministic)**
- Analytic vs narrative style [D] — LIWC CDI; best-evidenced cognitive-style measure (predicted GPA across 50k students). Style axis, not ability.
- Causal / insight words [D] — meaning-making / sense-making signal; transparent dictionaries.
- Metacognition / hedging / tentativeness [D] — NEW, high value. Epistemic humility and confidence; cheap and well-validated.
- Self- vs other-focus [D] — pronoun balance; one of the best-validated function-word constructs.
- Status / role language [D] — Kacewicz/Pennebaker pronoun markers; relative status (caveat: relational, not absolute dominance).
- Register / tone [D] — formality/lexical density; robust corpus-linguistics finding (needs cross-context text).

**Narrative identity (the goldmine — Layer A/B, [L]+[C], when episodic content exists)**
- Agency / Communion (the Big Two) [D] — validated LIWC dictionaries (Pietraszkiewicz 2019); the scoring backbone.
- Redemption vs contamination sequences [C/L] — gold-standard coding manuals; predicts wellbeing/generativity.
- Narrative coherence [C/L] — temporal/causal/thematic; κ .71–.80; predicts wellbeing prospectively.
- Autobiographical reasoning / meaning-making [L] — the mechanism that turns events into identity.
- Aspirational vs current self [D+L] — self-discrepancy + possible selves + regulatory-focus LIWC proxy.

**Affect over time (Layer B, corpus-relative trends only)**
- Affective baseline [D] — Warriner VAD / VADER, z-scored within the person; the engine's emotional zero-point.
- Emotional variability / inertia [D] — within-person SD + autocorrelation; best fit for one-person-over-time (flag mean-dependence).
- Absolutist language [D] — distress structure; specific to anxiety/depression/SI, beats raw negative sentiment.
- Time orientation [D/C] — past/present/future focus; Park classifier, behavior-validated.
- Psychological distancing [D] — regulation signal; experimentally grounded (Kross/Nook), trivially extractable inputs.

**Drives**
- Drives / theme frequency [D+L] — what they return to; LIWC attentional-focus, low-inference and robust.
- Certainty (expressed strength only) [D] — hedge/booster detection. NOTE: "vs evidence/calibration" is CUT (no ground truth in solo text).

**Identity layer (not psychology, keep separate)**
- Idiolect / stylometric signature [D] — function-word fingerprint. CORE for *individuation/consistency*, explicitly NOT a personality inference. Keep labeled as an identity layer.

---

## OPTIONAL-VALIDATED — real support, modest effects, user-toggled

Regulatory focus (promotion/prevention) [D] NEW near-core · Implicit motives power/achievement/affiliation [D] NEW · Divergent thinking / semantic distance (DSI, forward flow) [D] NEW, best computable creativity signal · Cross-domain connections [D] · Conversational receptiveness (Yeomans, ready-made tool) [D] NEW, needs dialogue · Linguistic Style Matching [D] NEW, needs dialogue · Cognitive distortions (CBT classifier) [C] NEW, needs trained model · Emotion granularity [C] NEW, aggregate-only · Rumination vs reflection [D] NEW · Curiosity types (5DC) [L] · Self-discrepancy actual/ideal/ought [D+L] · Possible selves [L] · Self-distancing in self-narration [D] · Engagement rhythm / cadence [D] metadata-only · AI-prompting style [D+L] emerging, needs AI logs · Procrastination / temporal-discounting markers [D] · Schwartz personal values (PVD) [D] · Moral foundations (eMFD/DDR) [D] low end · Intrinsic vs extrinsic motivation [D] · Belief evolution [L] needs timestamps · Belief-vs-behavior contradictions [L] conditional · Risk posture [C] weak/indirect · Bottleneck patterns [L] · Conditions for follow-through [L] · In-group/out-group (LIB) [D] needs group content · Persuasion style [L] · Self-acknowledged limitations [L] · Metacognitive markers in AI chats [D]

---

## OPTIONAL-EXPLORATORY — ship only with a visible "exploratory" label

Recurring mental models / frames [L] (high product value, low measurement validity — generate as span-grounded hypotheses, never scored traits) · Worldview frames [L] · SDT need satisfaction [L] (dominant theory, no validated text method yet) · Values-as-attention (= theme salience if relabeled) · Epistemic cognition [L] · Novelty-seeking vs depth [L] · Reversibility awareness [L] · Capability calibration [L] (claim yes, calibration no) · Conscientiousness/self-control signal [D] · State triggers [L] · Open loops / unresolved threads [L] (Zeigarnik; novel, unvalidated extraction, but distinctive) · Sustained-attention topics [D] · Humor patterns [L] · Relationship mental models [L] · Family references [D] (content feature) · **Compression / associative input style [D]** (my coinage, a measurable stylistic signal, but not a literature-backed construct; honest label required) · Tool / workflow preferences [L] · Attachment markers in language [D] (thin, weak avoidant signal) · Affinity-for-Technology / trust-in-AI [L] (scale-validated, not text-extractable)

---

## CUT — do not ship as scored facets

- Systems-thinking markers — no validated text measure exists; any score would be invented.
- Analogical-reasoning style — NLP analogy work measures system performance, not a person's trait. (Keep only as an event detector feeding "mental models.")
- Maximizing vs satisficing — questionnaire-bound; the questionnaire itself has contested dimensionality.
- Cognitive Reflection (CRT) markers — a performance test, not recoverable from prose. Redirect to Analytic + tentativeness.
- Certainty "vs evidence" / calibration-against-truth — no external ground truth in one person's corpus.
- Per-entry absolute mood — poor PPV; roll to corpus-relative trends instead.
- Dominance (D in VAD) standalone — low incremental value; fold into valence/arousal.
- "Voice vs typed = two selves" — reframe to modality / self-presentation-vs-self-disclosure divergence (validated); the "two selves" framing is an over-read.
- Psychological flexibility — strong construct, no NLP extraction method.

---

## Design implications (architecture, from the evidence)

1. **The idiographic gap is the master caveat.** Every method here was validated *between-person at large N*. None is validated for one person's small corpus. Treat all effect sizes as upper bounds; present facets as trends and hypotheses, never measurements. This is exactly what the two-layer + groundedness architecture already enforces.

2. **Three method classes, three implementation tiers.** [D] deterministic/lexicon (cheapest, most auditable, ship first), [L] LLM span-grounded extraction (Layer A content), [C] trained classifiers (cognitive distortions, granularity, narrative coding — heaviest, ship last). The facet registry should tag each facet with its class.

3. **Facets gate on data shape.** Timestamps (trajectory, volatility, belief evolution), dialogue (receptiveness, style matching), episodic content (narrative identity), group references (LIB), AI logs (prompting style). The registry must enable/disable facets by what the corpus actually contains, and degrade gracefully.

4. **Consolidate the abstraction family** into one signal with optional lenses (analytic, construal, intergroup), not four redundant facets.

5. **Affect rolls up.** No per-entry absolute affect claims anywhere. Corpus-relative z-scored trends only.

6. **Narrative identity is the headline.** It is the most validated free-text vein and the least occupied by competitors. Leaning into it is both the scientifically strongest and the most differentiated move.

---

## Key sources
Pennebaker LIWC / CDI (liwc.app manuals) · Ponizovskiy Personal Values Dictionary (per.2294) · Pietraszkiewicz Big Two dictionaries (ejsp.2561) · McAdams redemption/contamination (0146167201274008) · narrative coherence (acp.3859) · Al-Mosaiwi absolutist (2167702617747074) · Warriner VAD norms (s13428-012-0314-x) · Park temporal orientation (jopy.12239) · Nook distancing signature (PMC11904052) · Regulatory Focus LIWC (pone.0288726) · DSI semantic distance (PMC8062332) · Yeomans conversational receptiveness (receptiveness.net) · implementation intentions meta-analysis · Conway AutoIC r≈.46 (pops.12021) · maximizing-scale critique (S0191886915003062) · stylometry vs psychology (aclanthology 2021.emnlp-main.25).
