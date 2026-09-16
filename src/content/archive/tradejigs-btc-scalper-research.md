---
title: "Tradejigs: Eight Months of BTC Backtests and the Edge I Couldn’t Find"
date: 2026-09-15
summary: "I built a deterministic BTC scalper and then spent eight months trying to disprove it. What survived is an honest engine, a funding-rate audit, and no consistent edge. The negative results are the deliverable."
category: research
status: shipped
tags: ["Python", "quant", "backtesting", "BTC", "negative results"]
draft: false
---

I built a trading engine and then spent eight months trying to prove it wrong.

I didn’t want a bot I could point at an account and hope about. I wanted the opposite: a
small deterministic system whose risk rules I trust, plus a research loop that exists to
kill my ideas quickly. If a strategy only worked on the months I liked, I wanted the data
to say so.

## What the engine actually is

The arithmetic is separated from the opinion. Position sizing, P&L, margin-ROI stops,
fixed, first-reversal and volatility trailing, stale-data rejection, exchange minimums,
cooldowns, a daily-loss latch, funding-rate deduplication, and a no-simultaneous-opposing-
positions rule all live in deterministic code with decimal math.

An AI layer can propose a trade. It cannot change policy, position size, leverage, or loss
limits, and its output is schema-validated before anything reads it. The engine also
collects its own public context from free sources with explicit coverage gaps instead of
pretending it has a complete picture.

Nothing here trades. There is no signer, no order transport, no hosted model call in the
loop, and no scheduler. It is a recorder, a replay CLI, a risk engine, and an async
proposal boundary. 191 tests pass.

## How I tried to break it

Every study got a written plan before it got results. The rules were frozen, then run on
months the tuning never touched. A few protocol choices mattered more than any model:

- Timestamps use request-start time, not response time, so a candle only counts as
  complete if it actually was when the request went out.
- Funding rates are deduplicated by timestamp, and conflicting duplicates are rejected
  instead of averaged.
- Costs are applied as explicit sensitivity, not assumed away.
- The same frozen rules run under two independent execution paths.

## What the numbers say

| Check | Result |
| --- | --- |
| Eight frozen months | 5 positive, 3 negative |
| Trades per path | 64 |
| Net on $111 research equity | about +$2.16 and +$2.10 |
| Return over eight months | about 1.9 percent |
| April transfer test, never used for tuning | lost about $0.50 on both paths |
| 2bp execution stress | retained $1.89 to $1.99 |
| Funding-rate placebo, zero-event window | matched exactly |

About 1.9 percent over eight months is not an edge. It is noise with a plausible story
attached.

Two findings mattered more than the total. First, fixed-horizon attribution: 24 of 35
trailing winners were still positive 24 hours later, with a gross endpoint sum near $18
against an actual matched net of $8.34 to $8.44, while only 6 of 27 hard stops recovered
by 24 hours. That points at exit timing rather than direction, and it is a hypothesis, not
an executable strategy. Second, the funding-handling improvement in one slice rode on two
tiny stop clearances of $0.00125 to $0.00243. That is mechanical, not robust.

## One lesson had nothing to do with math

I checked venue eligibility too late. The exchange I first targeted excludes US residents,
and a VPN does not change that. Even if the numbers had held up, the live path did not
exist for me. Verify the boring constraint before you build the clever thing.

## What this does not prove

- Not profitability, and not live safety.
- Not that BTC cannot be scalped. This is evidence against specific rules I tested.
- Passing tests and replay results do not establish fills, queue position, latency,
  partial fills, mark-price liquidation, outages, or restart behavior.
- No credential, signer, order transport, or live order has ever existed.

## Why I am publishing the losing version

The Catalyst Radar backtest on this site already ends with the trade thesis dying after the
first hour. This is the longer version of the same habit: build the thing, try to disprove
it, keep the receipts.

Most trading content shows you the winning month. The useful artifact is the protocol. A
negative result you trust is worth more than a positive result you cannot reproduce.
