---
title: "Personal Distillation Pipeline: Voice & Notes → Second Brain"
date: 2026-06-25
summary: "Two builds, one job: take a pile of my own raw output, voice memos and 700-plus notes, and distill a model of my own mind. What I believe, how I think, which ideas keep coming back, how the thinking has changed over time. Both are MAP→REDUCE pipelines on Claude, built to run on my own data. These are the laptop-grade precursors. The productized version is the Living Cognitive Distillation Engine."
category: project
status: shipped
tags: ["Python", "Claude API", "RAG", "personal tooling"]
---

Two personal builds with the same goal: take a pile of your own raw output — voice memos,
notes — and distill a longitudinal model of your own mind. Who you are, how you think,
which ideas recur, and how your thinking has *changed over time*. Both are MAP→REDUCE
pipelines on Claude that I built to run on my own data.

## The builds

- **[Voice Distillation →](https://github.com/fallennyx/voicedistillation)** — turns a folder
  of voice-memo transcripts into a structured second brain. Stage 1 maps each memo to a compact
  JSON "atom" (Haiku); Stage 2 rolls those up into a monthly synthesis (Sonnet). Every model
  call routes through the local `claude` CLI in headless mode — no API key, no per-token billing —
  and your recordings stay git-ignored.
- **[Personal Knowledge Distillation →](https://github.com/fallennyx/distillation-pipeline)** —
  the earlier notes version. Batches markdown notes, extracts beliefs / patterns / decisions /
  ideas, then aggregates a temporal synthesis of what changed, stayed, or regressed. Built on my
  own 700+ notes.

## Where it's headed

These are the personal, laptop-grade precursors. The evolved, productized idea — a *living*,
portable, zero-maintenance cognitive model — is mapped out here:

- **[The Living Cognitive Distillation Engine →](/archive/living-cognitive-distillation-engine-positioning)**
  — positioning & competitive intelligence for turning this into a real product.
