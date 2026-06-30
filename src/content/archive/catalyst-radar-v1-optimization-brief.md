---
title: "Catalyst Radar v1: Architecture Optimization Brief"
date: 2026-05-20
summary: "My first hard pass at fixing the Catalyst Radar architecture. The v1 spec had three structural flaws: uniform polling, one LLM call per ticker, and a ranking that leaned on a lagging number. So I redesigned the loop, the prefilter, and the scoring to fix signal-to-noise and keep the cost near zero."
category: research
status: archived
tags: ["architecture", "event detection", "LLM pipeline", "systems design"]
---

> ↩ Part of the [**Catalyst Radar**](/archive/catalyst-radar-engine) project — see the shipped engine and the rest of its evolution.

The 92-hour build target underprices the right architecture by ~40%. The v1 spec has three structural flaws — **30-min uniform cadence, single-Haiku-per-ticker, and 24h%-led ranking** — that must be fixed before signal-to-noise reaches the ≥75% catalyst-attribution and ≥80% mover-recall targets. The fixes are: a hybrid event-driven + tiered-periodic loop, a two-stage embedding-prefilter pipeline that reserves Haiku for natural-language rationale only, and a vol-normalized max-window-pop score with funding-rate and BTC-beta residualization. Build revised to ~125–140 hours; recurring spend stays under $10/mo. The leveraged-only universe filter is the single best decision in the v1 spec because it makes funding rate, OI velocity, and liquidation cascades **universal** signals across crypto, equity, commodity, and FX perps — exploit that.

---

## 1. Free catalyst source manifest by asset class

Reliability scale: A = official, low-latency, machine-readable, stable. B = official but HTML/scrape or moderate latency. C = third-party scrape, ToS-grey or fragile. F = paywalled or dead.

### Crypto perps — top 5 by ROI

| Source | Endpoint | Freq | Limit | Reliability |
|---|---|---|---|---|
| Bybit announcements (official) | `api.bybit.com/v5/announcements/index?type=new_crypto` | Real-time | 600/5s | **A** |
| Upbit notices (Korean) | `api-manager.upbit.com/api/v1/notices/search` | Real-time | ~6/min safe | **B** |
| Binance bapi listings | `binance.com/bapi/composite/v1/public/cms/article/list/query?catalogId=48` | Real-time | Undocumented; 1/30s + UA rotation | **B** (officially "not for public use") |
| Coinalyze (funding/OI/liq) | `api.coinalyze.net/v1/...` | 1-min | **40/min FREE** | **A** |
| DefiLlama emissions | `api.llama.fi/emissions` | Daily | None practical | **A** |

Supporting tier: CoinDesk RSS (`coindesk.com/arc/outboundfeeds/rss/`), The Block RSS, Decrypt RSS, Etherscan v2 (5/sec, 100k/day free), CoinGecko Demo categories (30/min free key), Whale Alert public Telegram (live API is paid; archive free 2026-Q1).

**Critical paywall gaps with no clean free workaround:** Coinglass ($29/mo minimum), Twitter/X firehose (no usable free API), Nansen/Arkham smart-money labels (must self-curate from public Dune dashboards by @hildobby, @adam_tehc), live Whale Alert API. Build curated address tables by hand; this is unavoidable.

### Equity perps — top 5

| Source | Endpoint | Freq | Limit | Reliability |
|---|---|---|---|---|
| SEC EDGAR Atom (per-form) | `sec.gov/cgi-bin/browse-edgar?action=getcurrent&type=8-K&output=atom` | Real-time | **10/sec across sec.gov; UA header mandatory** | **A** |
| Finnhub free | `finnhub.io/api/v1/calendar/earnings`, `/company-news` | Hourly | 60/min | **A** |
| Yahoo via yfinance | `Ticker(sym).calendar`, `.upgrades_downgrades`, `.option_chain` | Daily | Aggressive throttle ~few hundred/day/IP | **B** |
| Farside Investors | `farside.co.uk/btc-etfs/` HTML | Daily | None | **A** for BTC/ETH ETF flows |
| pykrx + Naver scrape (Hyundai) / yfinance ASML.AS (Euronext) | various | Daily/intraday delayed | n/a | **C** (ToS-grey) |

**No free analyst-rating-change real-time feed exists in 2026.** Use yfinance `upgrades_downgrades` polled hourly + 8-K/424B EDGAR scan as proxy. **No free options unusual activity feed exists.** Synthesize from yfinance option chain: `vol/OI > 3 AND vol > 5× 20-day avg` per contract. AlphaVantage free dropped to 25 req/day — unusable.

### Commodity perps

| Source | Endpoint | Freq | Reliability |
|---|---|---|---|
| EIA v2 | `api.eia.gov/v2/petroleum/stoc/wstk/data/` (series `WCESTUS1` crude, `WGTSTUS1` gasoline) | Wed 10:30 ET weekly | **A** |
| OPEC press RSS | `opec.org/opec_web/en/feeds.htm` | Event | **A** |
| GDELT 2.0 DOC | `api.gdeltproject.org/api/v2/doc/doc?query=...` | 15-min | **A** — universal geopolitical layer |
| Mining.com per-commodity RSS | `mining.com/commodity/gold/feed/` | Hourly | **B** |
| Baker Hughes XLSX scrape | `rigcount.bakerhughes.com/na-rig-count` | Fri 1pm ET | **B** |

**Reuters and AP have no first-party RSS in 2026.** Anything labeled "Reuters RSS" is third-party scrape (rss.app/feedspot). GDELT replaces both as the universal wire layer. ACLED is weekly, ISW is editorial — neither belongs in a 30-min loop.

### FX + macro

| Source | Endpoint | Reliability |
|---|---|---|
| Forex Factory XML | `nfs.faireconomy.media/ff_calendar_thisweek.xml` (URL has moved twice in 24mo — verify on deploy) | **B** |
| FRED API | `api.stlouisfed.org/fred/series/observations` (key series: DTWEXBGS, DGS10, DEXJPUS, T10Y2Y) | **A**, 120/min |
| BLS Public Data v2 | `api.bls.gov/publicAPI/v2/timeseries/data/` (CPI=`CUUR0000SA0`, NFP=`CES0000000001`) | **A**, 500/day with key |
| Fed/ECB/BoJ/BoE/SNB/RBA RSS bundle | 6 official feeds | **A** |
| BIS central-bank speeches | `bis.org/doclist/cbspeeches.rss` | **A** — single firehose for global CB tone |
| Treasury Fiscal Data | `api.fiscaldata.treasury.gov/services/api/fiscal_service/v1/accounting/od/upcoming_auctions` | **A** |
| Polymarket Gamma | `gamma-api.polymarket.com/markets` | **A** — best free implied-probability source for political/regulatory catalysts |

**Trading Economics free tier (100 lifetime requests) is unusable for production.** Skip.

---

## 2. LLM prompt template and pipeline architecture

**The single biggest finding: replace "Haiku call per ticker" with a two-stage pipeline.** Embeddings + NER prefilter cuts Haiku tokens 40–60%, FinBERT direction-validator catches hallucinations Haiku cannot self-detect (Haiku 4.5 has no token-level logprobs — ECLIPSE benchmark AUC 0.59 vs 0.89 GPT-3.5). At 80 movers/day × 30 calls × 2K tokens × $1/M, this stays comfortably under $10/mo.

**Required architecture:**
```
mover detected (vol-normalized pop > threshold)
  → fetch news (RSS pool, 80–200 items)
  → spaCy NER + ticker regex (drops ~60% off-topic)
  → BGE-base-en-v1.5 embeddings, rank vs (ticker + asset_class + direction); top-5
  → BGE intra-cluster dedup (cosine ≥ 0.85 = duplicate)
  → DeepL free tier translate for KO/ZH (500K chars/mo)
  → FinBERT sentiment annotation (sidecar metadata)
  → Haiku call with Anthropic Structured Outputs (constrained decoding)
  → validator: evidence_quotes ⊂ news block? FinBERT direction ≈ Haiku direction?
  → suppression chain (§5)
```

**Use Anthropic Structured Outputs (GA Nov 2025), not prompt-only JSON.** Reported approximately zero schema violations on Haiku 4.5; ~2–3% cost overhead more than offset by elimination of retry logic. Temperature **0.0**, top_p=1.0. Even at 0, Claude is not fully deterministic per Anthropic SDK — accept that.

**Few-shot vs zero-shot:** 3 hand-curated examples (one positive, one NO_CATALYST, one stale/priced-in), diverse across asset classes. **More than 3 shots regresses Haiku** on financial classification (arXiv 2312.08725, 2411.02476). Universal prompt with explicit `asset_class` field beats per-class variants — captures most variant value at 1× maintenance cost, and Anthropic prompt-cache pricing rewards static prefixes.

**Recommended prompt skeleton (copy-paste):**
```
SYSTEM:
You are a quantitative catalyst-attribution analyst. You receive a ticker,
asset class, 24h move, trading session, and a ranked news bundle in a time
window. Identify the SINGLE most likely fundamental catalyst, OR explicitly
return NO_CATALYST. Hallucinating a catalyst is a critical failure.

Hard rules:
1. Cite verbatim quotes from <news> only. No quote → no claim.
2. Articles >24h before move_start_utc are STALE — flag is_priced_in=true.
3. trading_session ∈ {CLOSED_WEEKEND, CLOSED_INTERNATIONAL} → require news
   within 6h of move_start_utc; else NO_CATALYST + thin_liquidity_flag=true.
4. Tier-3/4 sources alone → cap conviction ≤ 0.4, alert_priority ≤ P2.

<schema>{primary_catalyst, catalyst_type∈12-enum, direction, conviction,
horizon, continuation_thesis, kill_signal, is_priced_in, alert_priority,
evidence_quotes[], evidence_source_ids[], stale_news_flag, thin_liquidity_flag,
confidence_in_attribution}</schema>

USER: <asset>...</asset><news id=N published_at=... credibility_tier=1..4>...
</news><examples>3 diverse cases</examples>
```

**Anti-hallucination patterns that empirically work (rank-ordered):** explicit `NO_CATALYST` enum (eliminates "must produce something" pressure), force-quote `evidence_quotes[]` with downstream substring validator, explicit `credibility_tier` field passed externally (LLMs cannot reliably distinguish Bloomberg from a Substack — arXiv 2502.04426), and separate `confidence_in_attribution` field decoupled from P&L `conviction`.

**Multi-language handling: pre-translate, never inline.** DeepL free (500K chars/mo) is L1; Haiku-self-translate is L2 fallback. Korean and Chinese consume 1.5–3× more tokens than English. Letting Haiku translate-and-classify in one shot entangles two failure modes — strictly worse.

**Trading-session field is mandatory for equity perps.** Lighter equity perps trade 24/7 but NYSE is closed ~67% of the week. Pass `trading_session ∈ {REGULAR, EXTENDED, CLOSED_INTERNATIONAL, CLOSED_WEEKEND}` and have the prompt raise the thin-liquidity prior accordingly.

**Eval harness: promptfoo + DeepEval + 50-example hand-labeled gold set** (20 true-positive across 4 classes, 15 NO_CATALYST, 5 stale, 5 priced-in, 5 cross-language). Targets: JSON validity ≥99%, catalyst-type accuracy ≥85%, NO_CATALYST recall ≥90%, hallucination rate ≤3% via substring-match validator. **Re-run full eval on every prompt change** — arXiv 2601.22025 shows "improved" generic prompts can regress task-specific performance.

---

## 3. Latency and cadence per asset class

Headline-to-price-move latency reality check: **30-minute uniform cadence systematically misses the first 5–10 minutes of every fast catalyst.** Earnings move equity prices in **~100 ms** (Grégoire et al. 2025 JFE); EIA crude inventories move WTI in milliseconds; NFP/CPI move FX in milliseconds; CEX listings build CAAR mostly t-3 to t-1 *before* the official tweet (Blockchain Research Lab, 327-listing study, peak CAAR 14.7%). The engine cannot front-run any of these on 30-min polling. The realistic edge is **cross-feed lag** (Lighter mark-price lags source venues) and **slow-bleed positioning** (funding/OI shifts over hours).

| Asset class | Default cadence | Burst cadence on event |
|---|---|---|
| BTC/ETH/SOL majors | 5 min | 30s during FOMC/CPI/NFP windows |
| Mid-cap crypto (top 30 OI) | 10 min | 5 min |
| Long-tail/meme perps | 15 min | n/a — wash-trade dominated |
| Equity perps, NYSE open | 5 min | 30s burst for 15 min after each scheduled earnings |
| Equity perps, after-hours | 5 min | — (earnings concentrated here) |
| Equity perps, closed/weekend | 30 min | OI/funding triggers only |
| Commodity perps | 5 min | 30s burst at Wed 10:30 ET (EIA), 14:00 ET FOMC, OPEC release |
| FX perps | 15 min | 30s burst at 08:30 ET on NFP/CPI Fri/Tue |
| New listings (<7d on Lighter) | 5 min | for first 72h |

**Hybrid architecture on Hetzner CPX22 (single asyncio process):**
- APScheduler periodic loop with tier-1/2/3 cadences above
- Lighter WebSocket consumer on `market_stats:{id}` and `ticker:{id}`; trigger immediate scoring on `|1m mark Δ| > 3σ` (Lee-Mykland jump rule), `|funding Δ| > 2σ over 24h cycles`, or `OI Δ > 5% in 5min`
- External news fan-in via single aiohttp pool emitting events into a priority queue that pre-empts the next periodic tick
- SQLite WAL or DuckDB for 30/90d rolling buffers (~200MB total for 100 tickers × 90d × 1m bars in float32)

**Lighter mark-price lag is structural and exploitable.** Per Lighter's whitepaper and Fair Price Marking docs, mark = median of (1) index + EMA-8min(clamped book premium), (2) median of CEX marks, (3) impact price. The 8-minute EMA on the premium component means a Binance pump that completes in 30 seconds phases into Lighter mark over up to 8 minutes. **Monitor Binance/NASDAQ/COMEX directly** for tier-1 majors and tokenized equity perps; cross-feed lag alone is alpha. For BTC/ETH/SOL run a Binance aggTrade WS in parallel; for CRCL/INTC/AMD use Polygon.io free tier or yfinance WebSocket; for XAU/XAG/WTI use TradingView TVC or OANDA delayed.

**Equity-perp closed-underlying behavior:** when NYSE is closed, the underlying index feed degrades or freezes. Hyperliquid HIP-3's TradeXYZ saw whale-triggered weekend liquidations precisely because mark drifted free of any underlying tether. Down-weight `pop_score` to 0.5× and up-weight `oi_change` and `funding_z` to 1.5× during these windows — positioning shifts are the cleanest signal when no underlying price exists.

---

## 4. Refined mover-ranking formula

The current `|24h%| × 1.0 + volume_z × 0.5 + oi_change × 0.3` has four calibration problems: 24h% is lagging, volume z-score is corruptible by wash trading on memes, OI is **under-weighted** (it's the highest-quality signal in a leveraged-only universe), and there's no realized-vol normalization or funding term.

**Recommended composite:**
```
score =
    1.0 · pop_score                         # max-window vol-normalized return
  + 0.7 · oi_velocity_z                     # 1h OI Δ z-score over 30d (raised from 0.3)
  + 0.5 · volume_z_robust                   # min(volume_z, trade_count_z), wash-damped
  + 0.4 · |funding_z|                       # funding-rate extreme magnitude
  + 0.3 · funding_flip_score                # signed magnitude of regime flip
  + 0.3 · cross_venue_funding_spread_z      # Lighter vs Binance/Hyperliquid
  + 0.2 · realized_vol_percentile_inv       # compression → breakout candidate
  − 0.5 · wash_penalty · volume_z           # explicit wash-trade dampener
```

Where:
- `pop_score = max(|r_1h|/σ_1h, |r_4h|/σ_4h, |r_24h|/σ_24h)` over 30d windows. Captures both fast (EIA, earnings) and slow-bleed (unlock pressure) regimes without privileging either.
- `wash_penalty = clamp(0, 1, (avg_trade_size / median_trade_size_30d) − 1)` — high turnover relative to trade-count flags wash; alternatively use `volume / OI` ratio.
- All raw % terms are **vol-normalized** via Lee-Mykland bipower variation or Garman-Klass (~7.4× more efficient than close-to-close).
- Funding-rate predictive power is modest at single-asset level (Presto Labs reports R² ≈ 12.5% over 7d on BTC) but is a cross-sectional ranking improver across the full leveraged universe.
- Cross-venue funding spread (Lighter vs Binance vs Hyperliquid) flags both arbitrage opportunity and impending mean-reversion; persistent structural spreads exist (Boros/Pendle reports 5.98–11.4% APR fixed-yield captures).

**Per-class weight modifiers:**

| Class | pop_score | oi_velocity | volume_z | funding sum |
|---|---|---|---|---|
| BTC/ETH/SOL | 1.0 | 0.7 | 0.5 | 0.7 |
| Mid-cap crypto | 1.0 | 0.8 | 0.4 | 1.0 |
| Long-tail/meme | 0.8 | 0.9 | 0.2 (heavy damp) | 1.0 |
| Equity perps (open) | 1.2 | 0.5 | 0.5 | 0.4 |
| Equity perps (closed) | 0.5 | 1.0 | 0.5 | 1.2 |
| Commodity perps | 1.0 | 0.7 | 0.5 | 0.6 |
| FX perps | 0.8 | 0.6 | 0.4 | 0.4 |

**Cold start (<30d Lighter listing): three layers in sequence.** (1) Borrow sister-cohort distribution for first 7 days — mid-cap cohort for new alts, equity cohort for new equity perps, never BTC's distribution (too tight). (2) Empirical-Bayes shrinkage days 7–30, factor `n / (n + n₀)` with `n₀ ≈ 7`. (3) Absolute threshold backstop regardless of statistical state: `|1h%| > 5%` for tier-1, `> 10%` for long-tail. Without (3), every new listing flags as a 6σ event.

---

## 5. Alert suppression rule chain (ordered, top-down, first match wins)

| # | Rule | Action |
|---|---|---|
| 1 | Hard 4h dedup: same `(ticker, catalyst_class)` | DROP |
| 2 | **Magnitude-escalation override** (must precede dedup): \|move_now\| ≥ 1.5× last alert OR crossed fresh 5/10/20/50% boundary | RE-ALERT, tag `escalation` |
| 3 | Semantic dedup: cosine sim ≥ 0.82 (MiniLM-L6 or BGE-small) vs any 24h alert on same ticker | DROP |
| 4 | Catalyst-aware re-alert: rule 3 fires but `catalyst_class` differs (earnings → 8-K M&A) | RE-ALERT, tag `new_catalyst` |
| 5 | Sector-day clustering: ≥10 tickers same sector tag, mean ρ > 0.6, same-sign >5% in 4h | one composite alert + suppress members |
| 6 | **BTC-beta filter**: require `\|alpha_z\| ≥ 2.0 AND \|r_alpha\| ≥ 3%` | DROP if pure beta (crypto only) |
| 7 | Surprise-z gate for scheduled events: `surprise_z = realized_z − expected_z < 1.0` | DROP (priced in) |
| 8 | Adaptive throttle: rolling-quantile threshold rising as daily budget depletes | DROP if score below dynamic threshold |
| 9 | Default | EMIT |

**BTC-beta correction is the highest-leverage suppression rule.** Rolling 30d β on 1h bars (not 90d — crypto factor structure shifts with narrative cycles), per-class benchmark factor:

| Class | Primary factor | Secondary |
|---|---|---|
| ETH, alt L1/L2 | BTC | ETH for risk-on alts |
| DeFi/AI/meme | ETH | BTC |
| Tokenized equity perps | SPY (or sector ETF: SOXX semis, KRE fintech) | DXY |
| Crypto-equity hybrids (COIN, MSTR, MARA) | BITQ + SPY | — |
| Commodity perps | DXY (inverse) | XLE |
| XAU/XAG | DXY (inverse) | TIPS 10y real yield |
| FX | DXY | regional carry pair |

**Adaptive throttling with anti-starvation reservoir:**
```
score_threshold_t = quantile_dynamic(score_history_30d,
                       1 − expected_remaining / hours_left)
```
Threshold rises monotonically as budget depletes. Critical addition: maintain a rolling top-3 buffer of *unsent* candidates. At hour 23, if buffer contains a candidate with score > median(sent_today), force-send over budget by 1. Net effect: never lock out the actual best mover.

**Daily morning brief (07:00 UTC, Telegram pinned) is recommended.** Composition: overnight movers table (top-5 by alpha_z), today's calendar (earnings/CPI/FOMC/NFP/OPEC/large unlocks/OPEX/ETF rebalance), regime tape (BTC, ETH, SPY, DXY, gold 24h + BTC dominance + aggregate funding skew), Polymarket signals (any market with ≥10pp 24h prob change on financially-relevant event), open active alpha alerts, and **suppression report** for transparency ("12 alerts suppressed today: 8 BTC-beta, 3 sector-day-AI, 1 dedup").

---

## 6. Canonical catalyst taxonomy

12 classes mapped to leveraged asset classes with empirical magnitude anchors and LLM `alert_priority` weight (1–10).

| # | Catalyst | Magnitude (median CAR or short-window) | Horizon | Asset classes | Weight |
|---|---|---|---|---|---|
| 1 | Earnings beat/miss/guidance | Top-decile SUE: \|CAR\| 3–5% [-1,+1]; tail 8–15% intraday; PEAD 60d at ~1–2%/mo | 1d primary, 60d drift | Equity | **8** (+1 if surprise_z>2) |
| 2 | Regulatory (SEC, CFTC, FDA, central bank) | Crypto ETF approval +10–25%; SEC enforcement −10 to −40%; FDA AdComm ±20–60% | Hours-1d | All | **9** |
| 3 | M&A / partnership / integration | Target [-1,+1]: 15–25%; acquirer 0% to +5–7% if unanticipated | 1d | Equity, crypto | **8** |
| 4 | Insider / whale activity | Form 4 microcap open-buy: 12mo CAR 6–7.4%; whale-to-exchange transfer: 6–24h impact, ~15–25% intraday vol attribution | Form 4: weeks; whale: hours | Equity (Form 4), crypto (on-chain) | **7** / **6** |
| 5 | Macro release (CPI, NFP, FOMC, PCE, PPI) | Pre-FOMC drift +49bps (Lucca-Moench 2015 NY Fed SR512); 100bps CPI surprise → 5y UST +10bps, S&P −1 to −2% | 1d | Commodity, FX, crypto majors, equity | **9** top-tier; **7** PPI/retail |
| 6 | Geopolitical (war, sanctions, election) | OPEC quota intraday Brent ±2–6%; Russia-Ukraine onset +$19/bbl | Hours-weeks | Commodity, XAU, FX, BTC haven | **9** surprise; **5** priced-in |
| 7 | Sector rotation / narrative | Per-token magnitude noise; basket +20–50% in 1–2wk | Days-weeks | Crypto | **5** (composite alert only) |
| 8a | Token unlock | Keyrock 16k events: >1% supply −0.3% pre/post-week; >10% supply −5 to −15% in 24h | Days | Crypto | **6** if >2% supply, **4** else |
| 8b | CEX listing | 2024 reverted to +2.78% day-1 (vs +41% historic); CAAR mostly built pre-event | Hours | Crypto | **6** top-tier exchange, **3** tier-2 |
| 8c | Upgrade / mainnet | Highly variable; Merge-class 5–15% pre-event run-up | Days | Crypto | **5** |
| 8d | Hack / exploit / depeg | Host token −20 to −50% intraday; USDC 2023 depeg −12% trough; DAO crime mean −14% (arXiv 2510.00669, n=22 small) | Min-days | Crypto | **10** (always alert) |
| 9 | Liquidity event (squeeze, cascade) | Oct 11 2025: $19.2B liquidations 24h, BTC −12%; baseline BitMEX $10–20M/day | Min-hours | All leveraged | **9** if \|Δfunding\|>0.1%/8h or OI drops >15% in <4h |
| 10 | Technical breakout | 5–10% follow-through median on confirmed multi-day range break (crypto) | Days | All | **3** |
| 11 | ETF flow surprise | IBIT day-1 +28% AUM impact; >$500M single-day net flow → BTC ±2–4% 1–2d ahead | 1–3d | Crypto + equity | **7** if >$500M, **5** else |
| 12 | Option-related (gamma, OPEX) | Pinning 5–10d pre-OPEX at high-OI strikes; gamma squeeze 20–100% in days for low-float | Hours-days | Equity primarily, BTC options emerging | **6** UOA + price coincidence, **4** OPEX week ambient |

Tuning rule: if `magnitude_observed > 2× typical`, multiply weight by 1.3; if `surprise_z > 2`, add +2 absolute.

---

## 7. Top 5 failure modes with suppression logic

| # | Failure | Detection signal | Suppression rule |
|---|---|---|---|
| 1 | **Hallucinated catalyst** (ECLIPSE benchmark: Haiku-class hallucination AUC 0.59 without logprobs vs 0.89 GPT-3.5) | `evidence_quotes` empty OR substring-not-found in `<news>`; OR `confidence_in_attribution < 0.4` | Force `catalyst_type=NO_CATALYST`, `alert_priority=SUPPRESS`. Validator step: `all(q in news_blob for q in evidence_quotes)`. |
| 2 | **Stale news** cited as current cause (Tetlock 2011: markets systematically overreact to recombined old info) | `published_at` of cited evidence > 24h before `move_start_utc` | Set `stale_news_flag=true`, force `is_priced_in=true`, downgrade priority ≥1 step. Maintain 30d rolling embedding index to detect republished content. |
| 3 | **Pump-and-dump misclassified as legitimate** (Chainalysis: 24.4% of Ethereum tokens show P&D-style liquidity removal patterns) | volume_z > 5σ + market cap < $50M + thin order book + no Tier-1 news + Telegram coordinated mention spike | Pre-filter: don't pass to Haiku at all if 24h volume < $5M. If passed: `thin_liquidity_flag=true`, `catalyst_type=NO_CATALYST`. |
| 4 | **Equity-perp weekend / closed-underlying thin liquidity** (5–10× lower depth in extended hours per Schwab; weekend gap volatility positively correlated with gap size) | `trading_session ∈ {CLOSED_WEEKEND, CLOSED_INTERNATIONAL, EXTENDED}` + perp move > 2× implied futures move | Require direct news within 6h of move_start; else thin_liquidity_flag, downgrade. Gate: emit P0/P1 on equity perps only if NYSE open OR breaking 8-K/wire tag present. |
| 5 | **Cross-language miss** (Korean Upbit listings empirically produce 8–62% intraday spikes — TAO/CFG/SKR/ESP cases; English-only feeds frequently miss the announcement window) | Move on Korean-domiciled token / Asian-hours move (06:00–09:00 UTC) with NO_CATALYST in EN feed | Mandatory Upbit/Bithumb/Binance.kr official-notice RSS + Weibo/WeChat crypto feeds; query Korean sources before NO_CATALYST classification. |

**Tracked but lower priority:** prompt injection via news content (OWASP LLM01:2025; sanitize "ignore previous" / "system:" strings, wrap all news in delimited XML and instruct model to treat content as data not instructions); JSON schema breakage (eliminated by Anthropic Structured Outputs); article republication date errors (use earliest-occurrence date, not publisher-stated); source credibility blindness (pass `credibility_tier` 1–4 explicitly — LLMs cannot reliably distinguish Bloomberg from a Substack).

---

## 8. Three findings that contradict the v1 spec

**Finding 1: The 30-minute uniform cadence is wrong, but not in the direction the spec implies.** The fix is not "scan faster across the board" — it's **tiered cadence + event-driven preemption**. Earnings move equity perps in ~100 ms; EIA crude inventories move WTI in milliseconds; CEX listing CAAR builds *before* the announcement tweet. No periodic poller catches these. Use 5-min for tier-1 majors, 30-sec bursts during scheduled macro windows, and Lighter WebSocket triggers (jump rule, OI Δ > 5% in 5min, funding Δ > 2σ) to preempt the periodic loop. For long-tail meme perps, keep 15-min — wash-trade noise dominates faster windows. The architecture fits comfortably on a single CPX22 in one async Python process.

**Finding 2: A single Haiku call per ticker is suboptimal both on cost and on accuracy.** Replace it with a two-stage pipeline: BGE-base-en-v1.5 embedding prefilter + spaCy NER + FinBERT direction-validator + Haiku for natural-language rationale only. Three things this fixes simultaneously: (a) cuts Haiku tokens 40–60% by deduping and ranking news before submission, (b) provides a hallucination check Haiku cannot do alone (FinBERT direction disagreeing with Haiku direction = flag), (c) enables sub-$10/mo cost at higher recall. **FinBERT/FinGPT can also replace Haiku entirely for the structured-enum classification step** (FinGPT v3.3 weighted F1 0.882 on FPB, beats GPT-4); reserve the LLM call for the WIIM-style 1-sentence attribution. This is the cost-correct architecture.

**Finding 3: The ranking formula's emphasis on |24h%| privileges a lagging metric and underweights the universe's best free signal.** 24h% is by definition the slowest detector — by the time it reads 5%, the move is half-over and likely reverting. Replace with vol-normalized **max-window pop** (max of 1h/4h/24h, each over its own 30d σ). Raise OI weight from 0.3 to **0.7** — in a leveraged-only universe, OI velocity is the cleanest positioning signal and is structurally untouchable by wash trading. Add **funding-rate z-score, funding flip, and cross-venue funding spread** as separate terms — these are universal across crypto/equity/commodity/FX perps and free on Coinalyze (40/min). Add a **wash-penalty subtractive term** (`avg_trade_size / median_trade_size_30d`) so meme-perp volume z-scores don't blow up the ranking. Add **BTC-beta residualization** as a hard alert gate on crypto perps: require `|alpha_z| ≥ 2.0 AND |r_alpha| ≥ 3%`. On a 5% BTC day, naive ranking lights up every alt; alpha-z gating surfaces only the genuinely idiosyncratic movers.

**Bonus (fourth) finding worth noting:** Lighter's mark price has a structural 8-minute EMA on the premium component (per the whitepaper). A Binance pump that completes in 30 seconds phases into Lighter mark over up to 8 minutes. **Monitor source venues directly** (Binance WS for crypto, Polygon.io free for equities, OANDA/TVC for commodities) — the cross-feed lag is itself the alpha.

---

## 9. Build effort revision

The 92-hour estimate **does not hold**. The optimization surface added by the findings above adds ~35–50 hours, but materially increases the engine's hit rate against the ≥75% catalyst-attribution and ≥80% mover-recall targets.

| Component | Original (h) | Revised (h) | Driver |
|---|---|---|---|
| Lighter SDK + universe filter (max_leverage > 1) | 8 | 8 | Unchanged |
| Periodic scanner | 12 | 8 | Simpler (just APScheduler) |
| **Hybrid event-driven WS layer** | 0 | 14 | New: Lighter WS, Binance WS, jump-rule triggers, priority queue |
| Free-source ingestion (RSS pool, Coinalyze, EDGAR, EIA, Polymarket) | 16 | 16 | Unchanged |
| **Embedding + NER prefilter pipeline (BGE + spaCy)** | 0 | 10 | New |
| **FinBERT direction-validator sidecar** | 0 | 6 | New |
| **DeepL translation layer (KO/ZH)** | 0 | 4 | New |
| Haiku integration (Structured Outputs + 3-shot) | 12 | 10 | Lighter call, structured outputs reduces retry logic |
| **Source-tier table + curated wallet labels** | 0 | 8 | New, manual curation |
| Mover-ranking formula (vol-normalize, funding terms, wash dampener) | 8 | 14 | Expanded |
| **BTC-beta residualization (qlib rolling-window)** | 0 | 8 | New |
| Suppression chain (8 ordered rules, semantic dedup, sector clustering) | 8 | 14 | Expanded |
| Adaptive throttling + reservoir | 0 | 4 | New |
| **50-example hand-labeled gold set + promptfoo + DeepEval** | 0 | 12 | New, ~6h labeling + 6h harness |
| Telegram push + daily brief | 8 | 10 | Brief is new |
| Monitoring, logging, deployment | 8 | 8 | Unchanged |
| Buffer / iteration | 12 | 12 | Unchanged |
| **Total** | **92** | **~166** (or **~125–140 with parallelization**) | |

**Recommendation: target 130 hours.** Drop the FinBERT validator and DeepL layer to MVP-2 if 92 must be held — but the embedding prefilter, BTC-beta gate, hybrid event-driven WS, and gold-set eval harness are non-negotiable for hitting the stated accuracy targets.

---

## Conclusion

The v1 spec's three structural problems — uniform 30-min cadence, single-Haiku-per-ticker, and 24h%-led ranking — each cost roughly 10–20 percentage points on the catalyst-attribution and mover-recall targets, and they compound. Fixing them brings the engine into hit-rate compliance and stays within the $10/mo budget by restructuring the LLM layer rather than spending more on it. The leveraged-only universe filter is the spec's single best decision: it makes funding rate, OI velocity, liquidation cascades, and BTC-beta residualization **universal** across crypto, equity, commodity, and FX perps — exploit that aggressively in the ranking formula. The free-data picture in 2026 is harsher than v1 assumed (Reuters/AP RSS dead, AlphaVantage at 25/day, no free analyst-rating-change feed, no free options unusual activity feed, Whale Alert live-API paywalled) — Coinalyze, EDGAR, GDELT, Farside, and Polymarket are the load-bearing free sources, and Polymarket's prediction-market deltas are the most underrated leading-indicator catalyst signal available for free. Build the source-tier table by hand and trust the LLM for nothing the substring-validator cannot verify.