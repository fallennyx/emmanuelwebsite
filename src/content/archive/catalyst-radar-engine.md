---
title: "Catalyst Radar: Real-Time Market-Event Detection Engine"
date: 2026-06-26
summary: "The whole Catalyst Radar project in one place: a Python engine that scans 163 perpetual markets every five minutes, ranks the unusual movers, classifies each catalyst with Claude, and fires a deterministic alert. Then I backtested 482 of its live alerts and the honest answer came back: the edge dies after the first hour. So I don't trade it by hand. The engine ships, the research ships, and the backtest that killed the trade thesis ships too. The thinking is the artifact."
category: project
status: shipped
tags: ["Python", "asyncio", "Claude API", "event detection"]
---

The production build behind the Catalyst write-ups: a single-process Python engine
that scans ~163 perpetual markets (crypto, equity, commodity, forex) every five
minutes, ranks unusual movers by a vol-normalized composite score, routes each to the
right news sources, classifies the catalyst with Claude Haiku, and runs survivors
through a five-rule suppression chain before pushing a deterministic alert. Three
cooperating asyncio loops in one process.

## Code

[View **catalyst-radar** on GitHub →](https://github.com/fallennyx/catalyst-radar)

## The full arc

Everything in this project, in the order it happened — the thinking is as much the
artifact as the code:

1. **[Multi-Timeframe Execution Engine: A Complete Architecture →](/archive/multi-timeframe-btc-perp-engine-architecture)**
   *(initial research)* — early architecture work on reconciling conflicting signals
   across timeframes into a single net position. One of the first specs I worked through
   before building anything.
2. **[Catalyst Radar v1: Architecture Optimization Brief →](/archive/catalyst-radar-v1-optimization-brief)**
   — tore apart the v1 spec's three structural flaws (uniform polling cadence, one LLM
   call per ticker, naive ranking) and redesigned the loop, the two-stage prefilter
   pipeline, and the ranking formula.
3. **[Catalyst Detection Engine v2: Peer Review & Spec →](/archive/catalyst-detection-engine-v2-review)**
   — an adversarial peer review of my own architecture: where it leaves IR on the table,
   the LightGBM meta-label gate, CryptoBERT classification, and five free-tier data
   assumptions that died in 2026.
4. **[A Quant Backtest of 482 Live Breakout Alerts →](/archive/catalyst-radar-alert-backtest)**
   *(validation)* — an adversarial study of 482 live alerts with the raw CSVs attached: the
   engine has no edge at baseline, one two-variable filter survives every robustness check,
   the biggest lever is a time-based exit, and the LLM direction call adds nothing measurable.
   The finding that settled it — this is infrastructure and research, not a trading desk.
