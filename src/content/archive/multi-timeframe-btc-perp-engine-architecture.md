---
title: "Multi-Timeframe Execution Engine: A Complete Architecture"
date: 2026-03-15
summary: "Early architecture research, before I built Catalyst Radar. A single perp account can't hold opposing positions at once, so every multi-timeframe system has to solve the net-position problem first. This is the spec where I worked that out: three layers, 15M, 1H, 4H, on BTC-PERP, reconciled into one net position. The thinking that fed the build."
category: project
status: archived
draft: true
tags: ["architecture", "systems design", "concurrency", "execution"]
---

> ↩ Part of the [**Catalyst Radar**](/archive/catalyst-radar-engine) project — the initial architecture research that fed into the build.


**A single perpetual futures account cannot hold opposing positions simultaneously — every multi-timeframe system must solve this "net position" problem before anything else.** This report provides a complete, implementable framework for a three-layer BTC-PERP trading engine (15M/1H/4H) on Lighter DEX, covering virtual position management, specific indicator parameters, conflict resolution logic, adaptive leverage, and session-aware execution. The architecture treats 4H as a high-conviction strategic layer, 1H as the primary swing layer, and 15M as a tactical entry/momentum capture tool. Every rule below includes concrete thresholds, tested parameters, and pseudocode suitable for direct implementation.

---

## Solving the net position problem on Lighter DEX

Perpetual futures exchanges — Lighter included — use a **netting order management system**: one position per instrument per account. If a bot is long 0.1 BTC on a 4H trend and simultaneously wants to short 0.03 BTC on a 15M scalp, the exchange sees only a net long of 0.07 BTC. This constraint shapes the entire architecture.

**Lighter DEX supports sub-accounts** tied to the same Ethereum wallet, each with independent positions, margin, and API keys (up to 256 keys per sub-account). This creates three viable approaches:

**Approach 1 — Physical isolation via sub-accounts.** Create three sub-accounts (`4H-trend`, `1H-swing`, `15M-scalp`), each running independently. Capital is fragmented across accounts, reducing margin efficiency, but implementation is straightforward and eliminates cross-strategy interference. For a **$794 account**, splitting capital means each sub-account operates with roughly $300–400, which severely limits position sizing.

**Approach 2 — Virtual position tracking on a single account.** The bot maintains an internal ledger tracking each strategy's "virtual" position, then computes and submits the net position on-chain. NautilusTrader (the leading open-source institutional trading platform) implements this natively: strategies configured with `OmsType.HEDGING` run on a venue with `OmsType.NETTING`, and the execution engine manages the translation automatically. The core data structure:

```
VirtualPosition per strategy: {strategy_id, side, size, entry_price, stop, target, timeframe}
Net Position = sum(all virtual positions with sign)
Delta Order = target_net - current_exchange_position
```

When the 15M scalp closes, the netting engine recalculates the net, computes the delta from the current exchange position, and submits a single order. Key implementation requirements include atomic batch calculations (to avoid intermediate states), mutex-protected execution (to prevent order duplication), per-strategy PnL attribution using virtual entry prices, and proportional allocation of funding rate payments.

**Approach 3 — Hybrid (recommended for $794 account).** Run the 4H trend position on the main account (largest, longest-held) and short-term strategies on a sub-account. This preserves most capital efficiency while preventing a bad scalp from affecting the trend position's margin. The hybrid approach reduces complexity versus full virtual tracking while offering better capital utilization than pure sub-account isolation.

---

## The 4H strategic layer: high-conviction "obvious" setups

Research consistently shows that **4H is the optimal timeframe for BTC swing trading** — reliable signals with manageable noise. Published backtests confirm: RSI crossover strategies on BTC 4H achieve a **profit factor of 2.09 and Sharpe of 5.13**, versus 0.91 and -0.48 on 1H. Supertrend on BTC 4H returned +31.5% over two years with a 62% win rate and Sharpe of 2.1. The 4H layer should generate the fewest trades with the highest conviction.

### Confluence scoring determines setup quality

A 4H setup qualifies as "obvious" only when it scores **3 or higher on a 5-point confluence scale**, with at least one factor from each of three categories (structure, level, momentum):

- **Structure alignment (+1):** Trade direction matches daily/weekly trend (HH+HL sequence for longs, LH+LL for shorts)
- **Key level confluence (+1):** Price sits at a significant support/resistance (previous daily/weekly high-low, round number like $100K, volume profile POC, or EMA200)
- **Momentum confirmation (+1):** RSI(14) in favorable zone (40–60 on pullback in trend), MACD histogram supporting direction, or ADX > 20
- **Candlestick pattern (+1):** Valid reversal/continuation signal — bullish/bearish engulfing, pin bar (wick ≥ 2× body), or inside bar breakout at the level
- **Volume confirmation (+1):** Candle volume exceeds **150% of the 20-period average**

Score of 3/5 = tradeable at 60% position size. Score of 4/5 = high conviction at 80%. Score of 5/5 = maximum position size at 100%. Never trade setups scoring 2 or below.

### Primary 4H strategy: Ichimoku cloud breakout + market structure

Use **standard Ichimoku settings (9,26,52)** on 4H as the starting point. Multiple sources confirm 4H and daily are the most reliable timeframes for Ichimoku, and crypto traders who adjust to (10,30,60) should only do so after rigorous backtesting.

**Long entry rules:** Price closes above the Kumo cloud on a 4H candle (body close, not just wick) + Tenkan-sen crosses above Kijun-sen (TK cross) + Chikou Span is above price from 26 periods ago + future cloud is green (Senkou A > Senkou B). All four conditions aligning simultaneously produces the strongest signal. **Stop-loss** is placed 1× ATR(14) below the cloud bottom. **Take-profit** targets the previous swing high (TP1, close 50% of position) then trails using Kijun-sen as a dynamic stop (exit when price closes below Kijun-sen).

### Secondary 4H strategy: market structure breaks (BOS/CHoCH)

Programmatic detection uses the **N-bar pivot method with N=5** for main structure on 4H. A swing high is a bar whose high exceeds the highs of 5 bars on both sides; swing low mirrors this. To filter insignificant pivots, require the price distance from the previous pivot to exceed **1.5× current ATR**.

**Break of Structure (BOS)** confirms trend continuation: in an uptrend, a new pivot high exceeds the previous pivot high with a candle body close (not just a wick). **Change of Character (CHoCH)** signals potential reversal: in an uptrend, price breaks below the most recent swing low — the first lower low after a series of higher lows. After a bullish BOS, mark the order block (last bearish candle before the impulse) and any Fair Value Gap (three consecutive same-direction candles where candle 1's wick and candle 3's wick don't overlap). Wait for price to retrace 50–75% into the OB/FVG zone, enter with a stop below the swing low, targeting the high created by the BOS candle (2:1 to 4:1 R:R). After CHoCH, do not trade immediately — wait for confirming BOS in the new direction.

### Tertiary 4H strategy: EMA200 mean reversion

When the daily EMA200 slopes upward (macro uptrend), price touches the 4H EMA200, RSI(14) drops to ≤ 35, volume spikes to ≥ 1.5× the 20-period average, and a bullish hammer or engulfing forms — enter long. Stop at 1.5–2× ATR below the EMA200 (typically **$900–$1,200** on BTC 4H). TP1 at the 4H EMA50 (close 50%), TP2 at the previous swing high or 3:1 R:R. **Time stop:** exit at breakeven if price hasn't reverted within 10 candles (40 hours). Historical data shows BTC's 4H EMA200 produces an average trend length of ~247 candles with 1.64 exact rejections per trend.

---

## The 1H swing layer: moderate frequency, good risk-reward

No single indicator works reliably on BTC 1H in isolation — this is the clearest finding across all research. An ETH Zurich master's thesis achieving **Sharpe 3.2** on hourly BTC used a combination of Bollinger Bands + volume + multiple moving averages + a custom volatility indicator. The 1H layer must combine multiple signals with strict filters.

### Composite 1H entry system

**Primary signal: EMA 9/21 crossover with triple filter.** EMA 9 crossing above EMA 21 signals a potential long, but only when RSI(14) > 55, ADX(14) > 20, and price is above EMA 50. For shorts, mirror conditions: EMA 9 below 21, RSI < 45, ADX > 20, price below EMA 50. A candle body ratio ≥ 0.45 (body/range) filters out indecision bars. Without these filters, standalone EMA crossovers on crypto achieve only **~32% win rates** — essentially noise. With the full filter stack, documented results show approximately 50% win rates.

**Secondary signal: Bollinger Band squeeze breakout.** Standard settings (20-period SMA, 2 standard deviations) with squeeze detection when BandWidth falls into the **bottom 20th percentile** of its rolling 20-period range. For stronger confirmation, use the Keltner Channel method: BBs contracting inside Keltner Channels signal an ultra-tight squeeze, and expansion back outside KC confirms a legitimate breakout. Direction is determined by the EMA trend filter and RSI position relative to 50. Published backtests show BB squeeze on BTC H1 is marginally unprofitable (profit factor 0.96) with standard settings alone, but adding Supertrend(14,3) filter + 4× ATR stop-loss + 6× ATR take-profit produced **87.65% profit with 54% win rate**.

**Tertiary signal: order block + FVG retest.** Identify the last bearish candle before a bullish impulse that breaks market structure; the zone from its body low to wick high forms the bullish order block. Validate with: a break of structure, an adjacent Fair Value Gap (three consecutive same-direction candles where candle 1 and candle 3 wicks don't overlap), volume multiplier ≥ 1.5× average, and EMA trend alignment. Fresh (untested) order blocks carry the highest probability; each subsequent touch weakens them; after 4 touches, expect the level to break. **Claimed win rates of 55–65%** when combined with BOS + FVG confluence + trend alignment, though these are largely unverified.

### VWAP as institutional trend filter on 1H

Anchor VWAP to the daily open (00:00 UTC). Price consistently above VWAP with above-midline action indicates strong bullish control — only longs. Below VWAP with below-midline: only shorts. Between: range-bound, use mean-reversion or sit out. ±1σ deviation bands serve as dynamic intraday support/resistance; ±2σ bands mark overextension zones with high mean-reversion probability. Every VWAP breakout must be accompanied by a volume spike for validation.

---

## Timeframe hierarchy: how signals flow from 4H to 15M

Professional systems universally employ a top-down architecture. Published data shows **trades with aligned signals across two or more timeframes achieve 58% win rates versus 39% for non-aligned trades** — a 19-percentage-point improvement. Multi-timeframe alignment improves risk-adjusted returns by approximately 23%.

### The three-screen implementation

**Screen 1 (4H) determines directional bias only.** The 4H bias is computed from EMA stack alignment: EMA 20 > EMA 50 > EMA 200 with ADX > 20 = bullish. All three EMAs in reverse order with ADX > 20 = bearish. EMAs converging (difference < 0.1%) = transitioning. Otherwise = neutral. The bias remains valid for **5 candles (20 hours)** unless invalidated by price closing below EMA 50 (for bullish), a lower low below the previous 4H swing low, ADX dropping below 15, or EMA 20 crossing below EMA 50.

**Screen 2 (1H) identifies the setup within the 4H bias.** If the 4H bias is bullish, the 1H scanner looks for: pullback to 1H EMA 21 (price touches within 0.2% and closes above), test of a pre-identified support level (within ±0.3% of the level), or Bollinger Band squeeze reaching the 20th-percentile threshold. If 4H is neutral or transitioning, no 1H setups qualify. The 1H setup remains valid for **4 candles (4 hours)** — if no 15M entry triggers in this window, the setup expires.

**Screen 3 (15M) provides the precise entry trigger.** Once a 1H setup is flagged, the 15M scanner watches for: a bullish engulfing or hammer candle, RSI(14) between 40–70 (not overbought), volume above the 20-period SMA, or a break above the previous 15M swing high (8-bar lookback). The entry executes on close of the confirmation candle.

### Confluence scoring for position sizing

Each timeframe contributes a weighted, strength-adjusted score:

| Timeframe | Weight | Trend strength (ADX-based, 0–1) |
|-----------|--------|----------------------------------|
| 4H | 3 | ADX/50, capped at 1.0 |
| 1H | 2 | ADX/50, capped at 1.0 |
| 15M | 1 | ADX/50, capped at 1.0 |

**Score = Σ(direction × strength × weight)** where direction is +1 (bullish), 0 (neutral), or -1 (bearish). Normalize by dividing by the maximum possible score (6.0). A normalized score ≥ +0.70 triggers a full-size long; +0.40 to +0.69 triggers 75% size; +0.20 to +0.39 triggers 50% size; -0.19 to +0.19 is a **no-trade zone**. Mirror thresholds apply for shorts. This framework prevents forced trades during ambiguous conditions.

### Conflict resolution: higher timeframe always wins

When 4H says "strong long" but 15M shows exhaustion, the statistically optimal action is to **skip the 15M counter-trend trade entirely** or, at most, reduce the lower timeframe's size to 25% of normal. Research is unambiguous: professional traders rarely fight higher-timeframe pressure. Lower-timeframe trades should only execute in the direction of the higher-timeframe bias approximately 80% of the time; exceptions require the 15M setup to score independently at 4/5 or higher on its own confluence scale.

---

## The 15M tactical layer: entry precision and momentum capture

The 15M layer serves two functions: (1) providing precise entries for setups identified on 1H/4H, and (2) capturing quick momentum impulses during high-volume sessions. Hold times range from **15 minutes to 2 hours** (1–8 candles).

Standalone 15M trades are only permitted when the 4H bias is clear and the 1H is trending in the same direction. Entry signals include: EMA 9/21 crossover with RSI(14) > 55 (longs) or < 45 (shorts) + ADX > 25, break above/below the previous 4–6 candle range with volume > 1.5× average, or a pin bar at a pre-identified 1H order block. **Stop-loss: 1.5× ATR(14)** on 15M, roughly **$100–$200** on BTC. **Take-profit: 2.5× ATR** or the nearest 1H support/resistance, whichever comes first. **Time stop: if price hasn't moved +0.3% after 4 candles (1 hour), close at breakeven.**

Session filtering is critical for 15M: avoid entries during **02:00–06:00 UTC** (lowest global liquidity). The best windows are the London killzone (**07:00–10:00 UTC**) and NY open (**13:30–16:00 UTC**), where volume peaks and directional moves are most reliable.

---

## Position sizing, leverage, and survival on a $794 account

The account size makes position sizing the most consequential design decision. A **$794 account risks ruin rapidly at aggressive leverage**: at 5% risk per trade, just 6 consecutive losses produce a 23% drawdown; 15 consecutive losses wipe out over half the account. Recovery from a 50% drawdown requires a 100% gain.

### Risk allocation across timeframes

Total portfolio risk at any moment must not exceed **3% of equity ($23.82)**. Individual trade risk: **1% ($7.94)**. Allocation by timeframe:

| Layer | Risk budget | Max concurrent | Leverage | Stop distance |
|-------|-----------|---------------|----------|---------------|
| 4H trend | 60% of budget | 1 position | 1–2× | 2.5× ATR (~$2,250) |
| 1H swing | 25% of budget | 1 position | 2–3× | 2.0× ATR (~$800) |
| 15M scalp | 15% of budget | 1 position | 3–5× | 1.5× ATR (~$300) |

With BTC at $85,000, the ATR-based position sizing for 1% risk ($7.94) works out to:

- **15M:** Position = $7.94 / ($150 ATR × 2.0 multiplier) = 0.0265 BTC ($2,249 notional), effective leverage ~2.8×
- **1H:** Position = $7.94 / ($400 ATR × 2.0) = 0.0099 BTC ($843 notional), effective leverage ~1.1×
- **4H:** Position = $7.94 / ($900 ATR × 2.5) = 0.0035 BTC ($300 notional), effective leverage ~0.4×

These are conservative but survival-oriented. Maximum **2 concurrent positions** to leave margin buffer. Total margin for two positions at recommended leverage stays under 70% of account equity.

### Adaptive leverage via ATR regime detection

Compute a volatility ratio: **Current ATR(14) / Long-term ATR(100)**. When the ratio exceeds 1.5 (high volatility regime), reduce leverage by 33%, shorten expected hold times, and widen stops to 3× ATR. When below 0.5 (low volatility), increase leverage by 25% (capped at timeframe maximums) and tighten stops to 1.5× ATR. Published research from VT Markets (Q1 2026) showed traders using ATR-based risk management **reduced drawdowns by 43%** versus fixed-lot sizing.

### Kelly criterion as an upper bound

For the 4H layer (assumed 58% win rate, 1.5:1 average win/loss), full Kelly suggests risking 30% per trade — far too aggressive. **Quarter-Kelly** yields 7.5% ($60) per trade, which provides a practical upper bound for the 4H layer during maximum-conviction setups. For 15M (52% win rate, 1.33:1), quarter-Kelly is approximately 4% ($32). These Kelly calculations assume stable statistics — recalculate every 50 trades using an expanding window, and never exceed half-Kelly under any circumstance.

### Funding rate drag cannot be ignored

Typical BTC perp funding runs 0.01% per 8 hours. At 10× leverage, this compounds to **~110% annually** — an invisible cost that destroys longer-hold strategies. At 2× leverage (the 4H layer's target), annual drag drops to ~22%. This is why the 4H layer must use the lowest leverage and the 15M layer's quick exits inherently minimize funding exposure.

---

## Hold time optimization and exit management

### The triple barrier method

Use Marcos López de Prado's triple barrier framework: every trade has three exit conditions, whichever triggers first wins.

| Timeframe | Upper barrier (TP) | Lower barrier (SL) | Vertical barrier (time) |
|-----------|--------------------|---------------------|-------------------------|
| 15M | 2.5× ATR from entry | 1.5× ATR from entry | 8 candles (2 hours) |
| 1H | 3.0× ATR from entry | 2.0× ATR from entry | 6 candles (6 hours) |
| 4H | 3.5× ATR from entry | 2.5× ATR from entry | 8 candles (32 hours) |

**Stale trade detection** adds an intermediate time check: if the 15M trade hasn't gained +0.3% after 4 candles (1 hour), tighten the stop to breakeven. If the 1H trade hasn't gained +0.5% after 3 candles (3 hours), tighten to breakeven. If the 4H trade hasn't gained +1.0% after 3 candles (12 hours), tighten to breakeven. QuantPedia research confirms that trailing exits based on candle closes (hold while hourly bars remain positive, close on first negative bar) outperformed fixed-bar exits, producing **Sharpe 1.07 and Calmar 0.87** on BTC.

### Volatility regime adjusts hold time

When the ATR ratio (ATR14/ATR100) exceeds 1.5, halve the maximum hold duration — high-volatility environments produce faster mean reversion and more whipsaws. When the ratio drops below 0.5, standard hold times apply but expect smaller absolute moves.

---

## Session-aware execution for 2025–2026 BTC markets

The January 2024 spot Bitcoin ETF approval fundamentally changed BTC's intraday structure. BTC's **correlation with the Nasdaq 100 reached 0.87** in 2024, and US market hours (14:30–21:00 UTC) now dominate price discovery. Volatility dropped approximately 55% from pre-ETF levels. These shifts demand session-aware trading rules.

The **12:00–16:00 UTC 4H candle** captures the London-NY overlap and consistently carries the highest volume and most directional movement — weight signals from this candle most heavily. The **00:00–04:00 UTC candle** covers the quietest Asian hours and produces the least reliable directional signals. Avoid initiating new positions during **02:00–06:00 UTC** (minimum global activity, 42% less market depth than peak).

Best entry windows by session:

- **London killzone (07:00–10:00 UTC):** Breakout tendency from Asian ranges; London often creates the low of day in bullish markets. Ideal for 1H breakout entries.
- **NY open (13:30–16:00 UTC):** Highest global volume; economic data releases at 13:30 UTC cause significant moves. Ideal for 15M momentum captures and 1H trend continuation entries.
- **Asian session (00:00–07:00 UTC):** Low volatility, consolidation. Mark the session high/low as key levels — London frequently sweeps these.

Macro calendar awareness is now essential: avoid new entries **15 minutes before and after** US economic releases (CPI, FOMC, employment data, typically 13:30 UTC). Weekend position sizes should be reduced by 50% — institutional traders are inactive, volumes drop significantly, and price action becomes more erratic.

---

## State machine architecture for the complete system

Each timeframe maintains one of seven states: `TRENDING_UP_STRONG` (ADX > 30, full EMA stack bullish), `TRENDING_UP_WEAK` (ADX 20–30, stack bullish), `TRENDING_DOWN_STRONG`, `TRENDING_DOWN_WEAK`, `RANGING` (ADX < 20, EMAs converging), `TRANSITIONING_TO_UP`, or `TRANSITIONING_TO_DOWN`. State transitions occur on each candle close. When the 4H state changes, the 1H and 15M states reset — a higher-timeframe shift invalidates lower-timeframe setups.

The state combination matrix maps the three timeframe states to actions. When all three are `TRENDING_UP_STRONG`, execute full-size longs. When 4H is strong bullish but 1H is ranging, wait for a 1H setup to form. When 4H is transitioning, no directional trades are permitted regardless of lower-timeframe signals. This eliminates ambiguity from the decision process and creates a fully deterministic trading engine.

For open-source implementation reference, **Freqtrade** handles multi-timeframe analysis via its `@informative()` decorator (merging 1H and 4H data into a 15M strategy dataframe with forward-fill to prevent look-ahead bias). **Jesse** provides cleaner multi-timeframe access via `self.get_candles(exchange, symbol, '4h')`, with zero look-ahead bias in backtesting and native Optuna hyperparameter optimization. Both frameworks support futures trading and have active communities with published BTC strategy examples.

---

## Conclusion: what this architecture gets right

The critical insight across all research is that **no single indicator or timeframe produces a reliable edge on BTC in isolation**. The 1H EMA crossover wins 32% of the time alone; add RSI + ADX + higher-timeframe filters and it climbs to ~50%. Multi-timeframe alignment improves win rates from 45% to 60–75%. The compounding of small edges across multiple independent filters — and the discipline to skip trades when those filters disagree — is what separates profitable systematic trading from noise.

For a $794 account specifically, survival must come before optimization. The recommended 1% risk per trade, maximum 2 concurrent positions, and quarter-Kelly sizing provide a risk-of-ruin below 1% — meaning the account survives long enough to collect on its statistical edge. The virtual position netting architecture (or Lighter's sub-accounts as a simpler alternative) resolves the single-instrument constraint, and the state machine ensures every trade decision flows from 4H bias through 1H setup to 15M trigger without human judgment calls. Start with the 4H layer alone — it has the strongest documented edge — and add 1H and 15M layers only after the 4H strategy has proven its parameters in live conditions over at least 100 trades.