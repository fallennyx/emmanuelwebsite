---
title: "Catalyst Radar: A Quant Backtest of 482 Live Breakout Alerts"
date: 2026-06-16
summary: "An adversarial study of 482 live alerts the engine actually fired. I graded all of them: conditional win rates, feature interactions, regime analysis, exit timing, plus an $8 Grok experiment to test whether the LLM layer predicts anything. The honest result: the only robust edge is a two-variable filter, the biggest lever is an exit rule and not an entry, and the LLM's direction call adds nothing measurable."
category: research
status: shipped
tags: ["quant", "backtest", "statistics", "Python", "trading", "LLM eval"]
---

> ↩ Part of the [**Catalyst Radar**](/archive/catalyst-radar-engine) project — the validation pass on the shipped engine.

**Catalyst Radar fires a long/short signal when it detects a structural break of structure (BOS) on a crypto perp. This is a skeptical, adversarial study of 482 of those alerts across two calendar windows (Feb 25–Mar 23 and Apr 5–May 11, 2026). The job was not to find reasons to trade — it was to find evidence that survives scrutiny. Three things did: (1) the engine has no edge at baseline; (2) exactly one two-variable filter holds up under every robustness check, and its edge lives in *win rate*, not average return; (3) the single highest-value lever in the entire dataset is not an entry filter at all — it's a time-based exit. A separate $8 experiment using Grok `x_search` to reconstruct the LLM's catalyst direction shows the LLM-vs-structure disagreement does *not* predict failure — which vindicates the engine's decision to keep the LLM advisory-only.**

The raw data is downloadable so anyone can check the work:

- [**alert-backtest.csv**](/archive/files/alert-backtest.csv) — 482 alerts, 31 columns (score, alpha_z, structure type, regime context, forward returns at +1/2/4/8h).
- [**alert-backtest-llm.csv**](/archive/files/alert-backtest-llm.csv) — the same rows with the reconstructed Grok `x_search` direction, confidence, and catalyst per alert.

The production engine that generated these alerts is documented separately: [**Catalyst Radar: Real-Time Market-Event Detection Engine →**](/archive/catalyst-radar-engine).

---

## 1. The data, and what it cannot tell you

Every honest backtest starts with its own limitations. These are load-bearing — most wrong conclusions in this space come from ignoring them.

- **Direction is recomputed, not stored.** The replays ran without the LLM classifier, so `direction` was re-derived by re-running the BOS detection on the exact 1h bars the engine saw. Direction is therefore *structurally guaranteed* to match the BOS logic. You cannot test "did the LLM disagree with the structure?" from this CSV alone. (Section 8 fixes this with a separate data pull.)
- **Entry = close of the alert-hour bar**, not the live mark at fire time. The true fill is somewhere inside that hourly candle. This is a known *positive* bias.
- **No intrabar high/low** for the forward windows. `px_+Nh` are bar closes, so maximum favorable excursion and true drawdown are not computable — only close-to-close returns. Every exit conclusion below is a close-to-close proxy.
- **No news in the replay DBs** (zero rows). The variable most people assume matters — catalyst quality — is entirely absent from the base dataset.
- **Replay, not live.** No slippage, no latency, no partial fills.

**Baselines** (the numbers every finding is measured against):

| Metric | Value |
|---|---|
| +4h win rate | **40.7%** (coin-flip = 50%) |
| +4h average signed return | −0.02% |
| +4h stdev | 4.74% (fat-tailed) |
| +1h win rate | 49.5% (+0.23% avg) |
| Direction mix | 386 long (80%) / 95 short (20%) |
| Asset mix | crypto_t2 68%, crypto_t1 21%, crypto_meme 9%, commodity <1% |

The distribution is fat-tailed: the top 10 winners at +4h range from +12% to +54% (FF on Apr 10 = +53.8%). A handful of trades dominate every mean. This single fact dictates the entire methodology — **means lie here; win rates and medians don't.**

**Method.** For every feature and combination: conditional win rate vs the 40.7% baseline, lift (WR / baseline; >1.3 is meaningful), average/median/stdev, sample size N (flagged when < 20), and a Mann-Whitney U test (non-parametric, because returns are not normal). All of it is reproducible from `scripts/ultra_research.py` in the repo.

---

## 2. The engine has no edge at baseline

The median alert *loses* at every horizon from +2h onward (+2h −0.28%, +4h −0.39%, +8h −0.46%). The only horizon that is even a coin flip is **+1h** (49.5% WR, +0.23% avg). 

This is the most important fact in the study: **the engine's signal lives in the first hour and decays after.** Everything downstream is either (a) finding the minority of conditions under which the signal survives to +4h, or (b) exploiting the +1h concentration directly via exits.

---

## 3. The one positive filter that survives

Dozens of single features and combinations were tested. After halving the dataset by date, removing outlier tickers, and requiring N ≥ 30, **exactly one positive filter survives**:

> **`|alpha_z| ≥ 3 AND score_pctile ≥ 75`**
> (strong BTC-decoupling *and* top-quartile conviction-for-the-day)

| Cut | N | WR@4h | lift | avg@4h | med@4h |
|---|---|---|---|---|---|
| Filter | 92 | **56.5%** | 1.39 | +1.41% | +0.27% |
| First half (dates) | 46 | 54.3% | 1.34 | +1.05% | +0.22% |
| Second half | 46 | 58.7% | 1.44 | +1.76% | +0.40% |
| Minus top-3 outlier tickers (FF/MYX/TON) | 83 | 54.2% | 1.33 | +0.28% | +0.23% |

The critical nuance: **the win-rate edge is real; the average-return edge is not.** Mann-Whitney vs the rest gives p = 0.044. But the standard error on the mean is 0.93% (t = 1.51) — *not* significant. Remove the three biggest winners and the mean collapses from +1.41% to +0.28%, while the win rate barely moves (56.5% → 54.2%). A 2,000-sample bootstrap puts the win-rate 95% CI at **[46.7%, 66.3%]** — the lower bound clears the 40.7% baseline, narrowly.

**Implementation consequence:** this edge must be monetized through a fixed risk:reward structure that profits from *directional accuracy*, not by assuming a +1.4% expected move. Anyone sizing off the mean is sizing off three lucky trades.

Two mechanics worth isolating:

- **`alpha_z` is non-monotone.** Buckets: `<2` → 38.7% WR, **`[2,3)` → 30.0%**, `[3,5)` → 43.6%, `>5` → 46.3%. There is a *dead zone* at marginal decoupling (the impulse-bypass band) that underperforms even the `<2` bucket. The edge requires *strong* decoupling, not *any*.
- **`score` predicts magnitude, not direction.** Spearman(score, signed return) ≈ −0.03 (nothing), but Spearman(score, |signed return|) ≈ +0.18. High score → bigger moves *either way*. Useful for position sizing; useless as a direction filter.

### The "triple stack" trap

The pre-study hypothesis was that adding `cluster_size == 1` (isolated signal) to the two-variable filter would sharpen it. **It does the opposite.** The three-variable stack drops to 50.0% WR (N=42), its mean collapses to −0.32% once the FF outlier is removed, and its first-half win rate is only 38.9%. The cluster condition is noise here. **Stop at two variables** — every added condition shrinks N and invites overfitting.

---

## 4. The negative filters (the real value)

The strongest, most robust signals in the dataset are negative — and they stack cleanly.

| Filter | N | WR@4h | lift | avg@4h | note |
|---|---|---|---|---|---|
| `vol_ratio > 15×` | 95 | 33.7% | 0.83 | −1.16% | large-N, monotone tail |
| `\|alpha_z\| ∈ [2,3)` (dead zone) | 90 | 30.0% | 0.74 | −0.77% | holds both halves |
| `crypto_meme` | 45 | 31.1% | 0.76 | −1.30% | fat two-sided tails |
| `crypto_t1 AND cluster ≥ 3` | 36 | 22.2% | 0.55 | −0.44% | sharp |
| `vol_ratio > 15× AND \|alpha_z\| < 3` | 26 | 15.4% | 0.38 | −1.65% | stacked drag |
| `\|alpha_z\| ∈ [2,3) AND score_pctile ≥ 50` | 24 | 16.7% | 0.41 | −1.60% | "false conviction" |

That last row is the most damning finding about the engine's own calibration: it is *most confident* (high score percentile) about its *weakest* structural signals (marginal alpha_z), and those are the worst trades in the book.

### Two "negatives" that are actually exit signals

`cluster_size ≥ 5` (many tickers firing the same hour) looks like a false-signal filter at +4h (18.2% WR, N=22). But its **+1h win rate is 68.2%.** Same story for `btc_ret_4h > +2%` (overheated BTC): 20.5% WR @4h, **64.1% @1h.** These fire on a synchronized macro pump, are correct for about an hour, then mean-revert. Suppressing them forgoes a 68% +1h hit rate. The right action is not *drop* — it's *take profit fast*. Which leads to the biggest finding in the study.

---

## 5. The biggest lever is an exit, not a filter

Sum the signed return across the entire book by exit horizon:

| Exit at | Σ signed return | avg | WR |
|---|---|---|---|
| **+1h** | **+112.2** | **+0.23%** | **49.5%** |
| +2h | +12.7 | +0.03% | 42.4% |
| +4h | −9.3 | −0.02% | 40.5% |
| +8h | −41.4 | −0.09% | 41.4% |

**A flat "exit everything at +1h" rule turns the whole book from net-negative to net-positive.** No entry filter studied comes close to this effect size.

But it's not unconditional. For the *winners* (top quartile, +4h > 2%, N=79), holding to +4h is far better (Σ +501 vs +209 at +1h); 42 of 79 peaked at +4h, only 4 peaked at +1h. And of the top-20 winners, 19 *built* from +1h → +4h — only FF (the +94.7% @1h → +53.8% @4h textbook spike) faded. So the fade risk is concentrated in the losers and the single mega-outlier, while genuine winners ramp.

The optimal policy is therefore **asymmetric**: default to a +1h exit (it kills the fat left tail of faders), but *if +1h is already positive*, hold to +4h to let the builders run. This is now the core of the engine's exit logic.

**Profit-path frequencies** (close-to-close proxy) make the shape concrete:

| Path (sign at +1h → +4h) | n | % | avg@4h |
|---|---|---|---|
| Consistent loss (−,−) | 175 | 36.4% | −2.45% |
| Early win held (+,+) | 136 | 28.3% | +3.45% |
| Early win *reversed* (+,−) | 100 | 20.8% | −1.71% |
| Early loss recovered (−,+) | 57 | 11.9% | +2.10% |

20.8% of alerts are "early win reversed" — the painful case. No feature cleanly predicts it (all Mann-Whitney p > 0.09), but the weak tendency is higher `vol_ratio` (15.6 vs 9.1). More evidence that high volume = fade risk, and that a +1h exit is the only reliable defense.

---

## 6. Regimes

| Regime split | Result |
|---|---|
| **BTC impulse** (`btc_range_expansion=1`, N=159) vs not (N=320) | 39.6% vs 41.2% WR, p=0.24 — **no difference.** BTC breaking out neither helps nor hurts an individual BOS call. The "swamped by macro" hypothesis is rejected at the aggregate. |
| **Clustered** (≥3) vs **isolated** (=1) | Real divergence, but *horizon-inverted*: clusters win early (58.8% @1h), lose late (36.3% @4h). Timing artifact, not a quality difference. |
| **Asset class** | Genuinely different regimes. `crypto_t1` is structurally *inert* — 32% WR, stdev 1.16, P(>+5%)=0% and P(<−5%)=0% (these instruments barely move). `crypto_meme` has fat two-sided tails and a negative median. `crypto_t2` is the only class carrying the book (44.2% WR, +0.24%). |
| **Calendar** | No window beats baseline. Week 18 is a genuinely bad large-N stretch (32.4% WR, N=74) with no identifiable feature explanation. |

`crypto_t1`'s inertness is a real actionable finding: the BOS fires, but the instrument doesn't move enough to be worth a trade in either direction. A strong de-prioritization candidate.

---

## 7. Robustness and overfitting defense

Every headline finding was put through halving, outlier trimming, and minimum-N gates.

- **The two-variable filter** survives all three on win rate; its *mean* does not (FF-driven). Verdict: robust as a direction filter, fragile as a magnitude claim.
- **Trimmed dataset** (drop top/bottom 5% of returns): the whole-book average goes from −0.02% to −0.33%. The "edge" of the engine as a whole is entirely in the tails — i.e. in *not* missing the rare big winners. This is why the engine's design philosophy (never suppress a structural break) is defensible: the cost of a false positive is small; the cost of missing FF is the whole month.
- **Single-ticker concentration:** the triple stack's apparent +1.80% mean is 60% driven by FF alone. Flagged and rejected accordingly.

---

## 8. Does the LLM enrichment layer predict anything? ($8 says no)

The engine's v3 design keeps the LLM **advisory only** — it classifies the catalyst and assigns a direction, but a disagreement with the structural BOS direction never blocks an alert. The open question was whether that's leaving money on the table: *does the LLM disagreeing with the structure predict failure?* The base CSV can't answer it (direction was recomputed from BOS, so they agree by construction). So I ran a separate experiment.

**News sourcing was the hard part.** The replay DBs have zero news, and the obscure perps that produce the most actionable breakouts (FF, MYX, USELESS, BIRB) have essentially no mainstream article coverage anywhere. I evaluated and rejected three sources before landing on one:

- **GDELT** — IP-throttled to uselessness, title-only, mapped only 21 of 99 tickers.
- **CoinGecko** `/news` — PRO-plan only, and no historical date filtering even when paid.
- **newsdata.io** — free tier's archive (the only historical endpoint) is paywalled; `coin=` rejects the long-tail symbols.
- **xAI Grok `x_search`** ✓ — supports `from_date`/`to_date` scoping *and* reaches the long tail via X cashtags (where micro-cap catalysts actually break). One date-scoped `grok-4.3` call per (ticker, date) does news retrieval **and** direction judgment together.

I classified all 482 alerts this way (deduped by ticker-date, disk-cached, ~$0.02/call, **$8.22 total**), then correlated the Grok direction against the structural direction and the forward returns.

**Result: the LLM direction call adds no measurable predictive value.**

| Horizon | Agree (N=215) | Conflict (N=46) | Test |
|---|---|---|---|
| **+4h win rate** | 40.0% | 39.1% | p = 0.93 — *identical* |
| **+1h win rate** | 50.7% | 43.5% | p = 0.32 — not significant |

When Grok disagrees with the structure, the alert performs the same at +4h (p=0.93) and only insignificantly worse at +1h. Restricting to high-confidence conflicts (conf ≥ 0.7, N=37) doesn't rescue it — still 37.8% WR. Alerts where Grok found *no* catalyst on X (N=218) weren't worse either (+0.30% avg @4h), consistent with the engine being **structural, not news-driven**.

There is one thread — not yet actionable — worth re-testing as live data accumulates: *within* the high-conviction two-variable stack from Section 3, the 10 alerts where Grok conflicted underperformed badly (40% WR vs 60.5% for agreement). But **N=10**; that's a hypothesis, not a finding.

**The takeaway is a vindication, not a fix:** the v3 invariant — let structure trigger the alert and keep the LLM as commentary — is the correct call. The LLM has no demonstrated direction edge, so letting it suppress alerts would destroy signal for nothing.

---

## 9. What I'd actually implement

Expressed as concrete thresholds for an engineer, ranked by expected value:

1. **Asymmetric time exit** *(highest EV).* Default exit at +1h; extend to +4h only if the +1h return is positive. Flips the book from net-negative to net-positive.
2. **Conviction tier:** tag `|alpha_z| ≥ 3 AND score_pctile ≥ 75` as high-conviction (56.5% WR, lift 1.39) and prioritize/size it — but monetize via fixed R:R, not expected move. Do **not** add a third condition.
3. **Blowoff fast-exit:** `vol_ratio > 15×` → force the +1h exit (43% WR @1h is fine; 34% @4h is not — the damage is in the hold).
4. **De-prioritize marginal decoupling:** `|alpha_z| ∈ [2,3)` (30% WR) and structurally inert `crypto_t1` (no tails) — don't suppress, just rank down so they never occupy the top quartile.
5. **Keep the LLM advisory.** The data says it predicts nothing on direction; use it as alert-body commentary only.

The three missing variables that would most improve this, in order: **intrabar high/low** (every exit conclusion here is a close-to-close proxy), **true catalyst type** (still only indirectly observable), and the **live LLM direction** at fire time (this study reconstructed it after the fact).

*Methodology, scripts, and the full numeric dump live in the [catalyst-radar repo](https://github.com/fallennyx/catalyst-radar). All figures above are reproducible from the two CSVs linked at the top.*
