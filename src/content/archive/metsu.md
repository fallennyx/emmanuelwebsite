---
title: "Metsu — The Living Cognitive Distillation Engine"
date: 2026-06-27
summary: "Everyone is racing to give AI memory of your facts and preferences. I'm building the layer underneath. Metsu is a model of how you actually think, reason, decide, and make meaning, grounded in validated psychology and cited to your own words. It ports into any AI to make it yours, and you can read it to understand yourself. The personalization everyone wants, with the depth nobody else has."
category: project
status: building
tags: ["AI memory", "cognitive modeling", "psycholinguistics", "Python", "Claude API"]
---

Everyone is racing to give AI memory of your facts and preferences. I'm building the layer
underneath. Metsu is a model of how you actually think: your beliefs, your mental models,
your reasoning style, how you decide, and how you make sense of your own life. Grounded in
validated psychology, cited to your own words. It ports into any AI to make it yours, and
you can read it to understand yourself.

*The name: Metsu (滅) is a Buddhist word for cessation, the end of suffering.*

## What it is, plainly

A pipeline that reads your own raw output (notes, voice memos, chat logs) and distills a
structured model of how you think. Not your facts. Not your preferences. Your cognition.
The model is portable, so you drop it into any LLM, and readable, so you can review it
yourself.

## Two faces, one engine

- **A, the promise: optimize any AI for you.** A machine-readable cognitive profile that
  personalizes any model far past "remembers your tone." This is the headline, and the
  larger need in an AI-saturated world.
- **B, the depth: a mirror you can read.** The same model rendered for a human. It surfaces
  patterns in how you think and narrate your own life that you might not see yourself. This
  is the uncontested, scientifically richest layer, and it is what makes A credible.

## Why it's different

The field treats personalization as a storage problem: remember more facts. It is actually
a cognitive-modeling problem. Metsu grounds personalization in validated cognitive science
and models the layer nobody else does, the life-story layer, with every claim cited to your
own words. Depth is the moat, not memory size.

## The rules it won't break

This is the trust story, and it's non-negotiable.

- **Grounded.** Every extracted claim is quoted back to its source. No uncited inference.
- **Two layers, kept separate.** What you expressed (cited) versus what is cautiously
  inferred (hedged, dimensional).
- **No pseudoscience.** No personality types, no diagnoses, no population comparisons. Metsu
  openly shows what it refuses to infer, and why.
- **Built on peer-reviewed psycholinguistics**, not vibes.

## Where it is right now

In active development. I won't overclaim, so here is the honest state.

**Built and tested:** the cognitive-science grounding research, a live competitive-landscape
scan, an evidence-graded catalog of which cognitive facets are validly extractable, the core
data schema with the two-layer epistemics enforced in the type system, a deterministic
psycholinguistic feature layer (pure code, unit-tested), a pluggable LLM transport, the
grounded extraction prompt, ingestion adapters, and the parallel extraction engine that turns
documents into grounded cognitive atoms. Full test suite green.

**Next:** the synthesis layer that assembles the model over time, the portable output
(`context.md`), the narrative-identity depth, and a faithfulness harness that scores
groundedness. The open research question I'm working now: how to rigorously prove a
personalized model produces better outputs.

## The research behind it

- **[What It Extracts (Facet Catalog) →](/archive/lcde-facet-catalog)**. Every signal Metsu
  could pull from your words, graded by what real science backs, with narrative identity as
  the headline.
- **[Cognitive-Science Grounding →](/archive/lcde-extraction-grounding)**. The peer-reviewed
  evidence behind what it extracts, what it infers, and what it refuses to guess.

## The builds it grew from

- **[Voice Distillation →](https://github.com/fallennyx/voicedistillation)**. Turns voice-memo
  transcripts into a structured second brain. MAP then REDUCE on Claude, routed through the
  local `claude` CLI, no API key. Built to run on my own recordings.
- **[Personal Knowledge Distillation →](https://github.com/fallennyx/distillation-pipeline)**.
  The earlier notes version, built on my own 700-plus notes.
