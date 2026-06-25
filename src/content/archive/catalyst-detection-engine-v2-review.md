---
title: "Catalyst Detection Engine v2: Peer Review & Architecture Spec"
date: 2026-05-25
summary: "An adversarial peer review of my own detection architecture, measured directly against v1: what the first version left on the table, the assumptions the empirical record contradicts, and the v2 spec that fixes them."
category: research
status: shipped
draft: true
tags: ["trading", "ML", "systems architecture", "crypto"]
---

> ↩ Part of the [**Catalyst Radar**](/archive/catalyst-radar-engine) project — see the shipped engine and the v1 optimization brief that preceded this review.

The v1 stack is structurally sound but **leaves 30–60% of available IR on the table** and contains three load-bearing assumptions that the empirical record contradicts. The single highest-ROI architectural change is replacing equal-weight AND/OR rules with a **LightGBM meta-label gate trained on triple-barrier labels**, which lifts precision 5–10pp in published reproductions on both ES futures (Hudson & Thames 0.48→0.54) and BTC (Quang Khải reproduction 0.63 precision, 0.73 recall). The single highest-ROI signal addition is **CryptoBERT news classification** for Pipeline B (~6pp accuracy lift over keyword RSS). **Nitter is dead, X scraping is broken, DefiLlama unlocks API is paywalled, Coinglass liquidation heatmaps are paywalled, CryptoQuant has no free API, and DefiLlama has no per-token CEX flow endpoint** — five free-tier assumptions in v1 that no longer hold in 2026. Realistic precision/recall floors on free data: **55–65% precision and 30–45% recall** at the v1 horizons; the v1 target of ≥65% precision is achievable only on T1 majors with macro-event triggers and on T2 listing/ETF events, not as a universe-wide floor.

The peer review below is organized as the eight required deliverables, with empirical findings overriding theoretical expectations per the brief's empirical-override clause.

---

## 1. Free data source manifest

Reliability ratings: **A** = production-grade native; **B** = stable but degraded (rate limits, scraping required); **C** = works but unofficial/fragile; **F** = dead, paywalled, or unusable on free tier.

### Orderflow (Pipeline A)

| Signal | Best free source | Endpoint | Update | Rate limit | Auth | Reliability | Lighter coverage |
|---|---|---|---|---|---|---|---|
| Volume z-score | Lighter native WS | `wss://mainnet.zklighter.elliot.ai/stream` `trade:{market_id}` | 50ms batch | Not published | None public | **A** | Native primary |
| OI delta | Lighter native + Coinalyze for CEX | Lighter market metadata; `api.coinalyze.net/v1/` (40 req/min, free key) | 5 min | 40/min | Free key | **A** native, **B** aggregated | Native + free CEX aggregator |
| Funding rate | Lighter native + Binance/Bybit/OKX/HL public | `/api/v1/fundings` (Lighter); `/fapi/v1/premiumIndex` (Binance); HL `/info` `metaAndAssetCtxs` | Per-block / 1min | Public weights | None | **A** | Native |
| Cross-exchange basis | Lighter mark + HL `/info` + Binance premiumIndex | WS streams | Real-time | Per-venue | None | **A** | Native — Lighter mark price queryable |
| BB width / ATR / RV | Derived from Lighter candles | `GET /api/v1/candlesticks` | Per-bar | None | None | **A** | Derived |
| CVD | Lighter trade tape WS (taker side flagged) | `trade:{market_id}` | Tick | None | None | **A** | Native |
| Liquidation events | HL `liquidations` WS, Binance `forceOrder` WS | WS | Real-time | Per-venue | None | **B** | Realized only — synthetic heatmap requires building |
| Liquidation heatmap (forward-looking) | **Coinglass paid only** | n/a | n/a | n/a | n/a | **F** | Build synthetic from realized liq events + leverage prior (~12–20hr); accept lower recall |

### Catalyst (Pipeline B)

| Signal | Best free source | Method | Reliability | 2026 status |
|---|---|---|---|---|
| News RSS aggregation | CoinDesk + CoinTelegraph + Decrypt + The Block + Crypto Briefing + BeInCrypto + Bitcoin Magazine | `feedparser` fan-in every 1–5 min | **A** | All live; combine with CryptoBERT classification |
| Token unlocks | DefiLlama dashboard scrape + open-source `DefiLlama/emissions-adapters` repo fork | HTML scrape + local cron | **A−** | **DefiLlama `/api/emissions` is Pro-only ($300/mo)** — v1 assumption wrong; workaround is free fork |
| Binance listings | `bapi/composite/v1/public/cms/article/catalog/list/query?catalogId=48` | JSON poll | **B** | Cloudflare-protected, 403s under load; backup: HTML scrape `binance.com/en/support/announcement/c-48` |
| Coinbase listings | Diff-poll `api.exchange.coinbase.com/products` for new symbols | REST | **A** | **Per-listing blog discontinued; @CoinbaseAssets X is the official channel** — product-list diff is the only clean free path, with minutes of latency |
| Upbit listings | `api-manager.upbit.com/api/v1/announcements` | JSON | **A−** | Korean parsing required; produces documented "listing pump" + Kimchi premium |
| OKX listings | `okx.com/api/v5/support/announcements?annType=announcements-new-listings` | JSON | **A−** | Officially documented |
| Bybit listings | `api.bybit.com/v5/announcements/index?type=new_crypto` | JSON | **A−** | 600/5s |
| GitHub commit velocity | `api.github.com/repos/{owner}/{repo}/commits` + `/stats/commit_activity` | REST | **A** | 5,000/hr authenticated |
| Reddit mention velocity | `oauth.reddit.com` Data API | OAuth | **B** | 100 QPM free non-commercial; **Pushshift dead** |
| Telegram public channels | Telethon (MTProto) or `t.me/s/{channel}` HTML | API client | **B+** | Critical for CEX listing leaks; arXiv 2204.12929 documents +9.5% return at x=60h pre-pump |
| X/Twitter mention velocity | **No clean free path** | Nitter dead, X v2 free read killed, twscrape requires burner accounts + proxies (TOS violation, account churn) | **F** | **Largest free-tier gap in 2026.** Substitute basket: Bluesky Jetstream + Farcaster Neynar + Reddit + Telegram |
| Bluesky firehose | `wss://jetstream2.us-east.bsky.network/subscribe` | WS | **A** for tech / **C** for crypto signal density | Free, real-time, unlimited; small crypto-trader population |
| Farcaster mentions | Neynar `api.neynar.com/v2/farcaster/cast/search` | REST | **B** | Crypto-native users; free tier viable for ~100 tickers hourly |
| Macro calendar (FOMC) | `federalreserve.gov/monetarypolicy/fomccalendars.htm` | HTML scrape | **A** | Authoritative |
| CPI / NFP | BLS RSS + Treasury direct | RSS | **A** | Free |
| ETF decisions | SEC EDGAR `cgi-bin/browse-edgar?action=getcurrent&type=19b-4` | RSS | **A** | Free, official |
| CoinMarketCal events | `developers.coinmarketcal.com` | OAuth REST | **B** | Free tier exists; quality variable |

### On-chain / flow (Pipeline C)

| Signal | Best free source | Reliability | Notes |
|---|---|---|---|
| Stablecoin (USDT) net inflow to CEX | Etherscan v2 + Tronscan + custom CEX wallet list | **A** | **Only on-chain signal with peer-reviewed 1–2h predictive power on BTC/ETH** (Chi/Chu/Hao 2024) |
| Per-token CEX exchange netflow | Etherscan v2 + Routescan + Solscan + custom CEX list | **B** | **DefiLlama does NOT expose per-token CEX flows on free tier** — v1 assumption wrong |
| ETH net inflow → ETH | Same | **A** | Negative predictor 1–6h (Chi et al. 2024) |
| BTC net inflow → BTC | Same | **F** as predictor | **No significant intraday predictive power** (Chi et al. null result) — drop |
| Bridge volume per chain | DefiLlama `bridges.llama.fi` | **A** | Multi-day narrative; not intraday |
| DEX vs CEX volume | DefiLlama + CoinGecko Demo (30/min, 10k/mo) | **A** | Days timescale (Makarov-Schoar) — regime filter only |
| Whale wallet tracking | Cielo free (250 wallets, no API analytics) + Whale Alert Twitter + custom Etherscan v2 watchlists | **B** | True smart-money labels remain paid (Nansen $150/mo) |
| Hyperliquid public state | `api.hyperliquid.xyz/info` + WS | **A** | Best-in-class free perp-DEX feed; primary cross-DEX whale tracker |
| Lighter L1 USDC deposits | Etherscan v2 on `0x3B4D794a66304F130a4Db8F2551B0070dfCf5ca7` | **A** | Under-researched niche; pre-listing leak detector |
| Token holder concentration | Etherscan v2 (top-holder API moved to Pro) + custom tokenTx aggregation | **C** | Multi-day signal — drop for intraday |
| CryptoQuant netflow | Website charts only — **no free API** | **F** | v1 assumption wrong; use as daily regime context only |

**Five v1 free-source assumptions that no longer hold in 2026:** Nitter (dead), DefiLlama unlocks API (paywalled), DefiLlama per-token CEX flow (does not exist), Coinglass liquidation heatmap API (paywalled), CryptoQuant API (paid only).

---

## 2. Signal performance table — standalone baselines

Honest framing: precision = P(≥2% move within horizon | signal fires), recall = P(signal fires | move occurred). Most cited literature uses different metrics (IC, Sharpe, R², F1); the numbers below translate or extrapolate cautiously and are flagged ⚠️ when extrapolated. Base rate of ≥2% move in arbitrary 4-hour window for a typical perp ≈ 8–12%.

### Top single signals ranked by composite score (precision × recall × 1/latency × free-tier reliability)

| Rank | Signal | Best horizon | Precision | Recall | Latency | Effort | Source | Confidence |
|---|---|---|---|---|---|---|---|---|
| 1 | **Cross-exchange basis spread (Lighter–HL or Lighter–Binance >1.5σ)** | 1–2h | 0.45–0.60 | 0.25–0.40 | <5s | 8–12h | Alexander et al. 2024; He et al. arXiv:2212.06888 | High |
| 2 | **Tier-1 CEX listing announcement (Binance/Coinbase/Upbit)** | 1–2h | 0.65–0.75 ⚠️ | event-bound | seconds | 16–24h | Ren & Heinrich; Messari Coinbase Effect; CryptoNinjas/Storible | Medium-High; T2/T3 only |
| 3 | **USDT net inflow to CEX → BTC/ETH** | 1–2h | ~0.52–0.55 | low (top-decile only) | ~10 min | 20–30h | Chi/Chu/Hao 2024 arXiv:2411.06327 | Medium-High |
| 4 | **OFI (Cont/Kukanov/Stoikov) on Lighter** | <30 min | 0.40–0.55 | 0.20–0.35 | <1 min | 6–10h | Cont et al. arXiv:1011.6402; Springer Digital Finance crypto replication | High |
| 5 | **Funding rate extreme (>95th or <5th pct, 30d) into binary catalyst** | 6–24h | 0.45–0.55 | 0.20–0.35 | 60s | 3–5h | Presto Research; He et al. 2022; empirically 7/8 FOMC pre-positioning hit | Medium |
| 6 | **Volume z-score >3 (5min)** | 1–2h | 0.30–0.45 majors / 0.20–0.30 memes | 0.50–0.65 | <1 min | 6–10h | arXiv 2412.18848 pump detection 55.81% top-5 hit-rate | Medium; ⚠️ wash-trade-corrupted on T3 |
| 7 | **Token unlock (>5% supply, team category)** | 6–24h | 0.55–0.65 DOWN | 0.40–0.55 | scheduled | 8–16h | Keyrock 16k unlocks | Medium; ⚠️ much weaker than v1 assumes for monthly cliffs |
| 8 | **OI delta + flat price (>2σ, |Δprice|<0.3%)** | 6–24h | 0.40–0.55 | 0.25–0.40 | 1–5 min | 4–8h | Mudrex pedagogical; empirically inverted in 2026 (see counterintuitive findings) | Medium |
| 9 | **VPIN >0.7 (volume-bucketed toxicity)** | 1–2h | regime indicator | n/a | <1 min | 8–12h | Kitvanitphasu et al. 2025 ScienceDirect; Easley/López de Prado/O'Hara | Medium; use as risk filter, not alpha |
| 10 | **CVD divergence** | 1h | 0.30–0.45 | 0.15–0.25 | <1 min | 6–10h | Cont et al.; Sirignano-Cont 2019 | High at <1h, decays |
| 11 | **CryptoBERT news sentiment + entity-link** | 2–6h | 0.55–0.62 ⚠️ | low for ≥2% | 1–5 min | 24–40h | ACSA 2023 (CryptoBERT XL F1 0.59); MDPI 2024 | Medium |
| 12 | **Telegram pump-channel monitoring** | 1–2h | 0.50–0.60 ⚠️ | low | seconds | 16–32h | arXiv 2204.12929 (+9.5% at x=60h) | Medium for risk avoidance |
| 13 | **BB width compression (<5th pct)** | 6–24h | 0.40–0.55 (direction-agnostic) | 0.55–0.70 | <1 min | 2–4h | Quantified Strategies | Medium; needs direction confirmation |
| 14 | **Reddit mention velocity** | 2–6h | 0.53–0.58 ⚠️ BTC/ETH only | low for long tail | minutes | 16–24h | arXiv 1907.00558 | Medium for majors, low for tail |
| 15 | **GitHub commit velocity** | 6–24h | 0.52–0.55 ⚠️ direct; better as filter | low | hourly | 8–16h | Phillips & Gorse 2018 | Low-Medium |
| 16 | **CryptoQuant BTC exchange netflow** | 1–7 day | n/a intraday | n/a | 24h+ | — | Glassnode Insights 2025 | **Horizon mismatch — drop for sub-24h** |
| 17 | **Holder concentration / new whale detection** | weeks | n/a intraday | n/a | hours | 40h+ | IntoTheBlock | **Horizon mismatch — drop** |
| 18 | **Bridge inflow per chain** | 1–7 day | regime | n/a | hourly | 4h | DefiLlama dashboards | **Horizon mismatch — narrative filter only** |
| 19 | **Stablecoin aggregate supply growth** | days-weeks | macro | n/a | daily | 3h | CoinMetrics SOTN | **Horizon mismatch — daily regime only** |
| 20 | **Liquidation cluster proximity (synthetic free)** | 1–2h | 0.30–0.50 | 0.10–0.20 (low recall on free proxy) | <1s | 12–20h | Gate market signals; coinglass methodology paywalled | Low — structurally weaker than paid |

**Signals to drop from v1:** BTC exchange netflow (Chi et al. null result intraday), holder concentration (multi-week), bridge volume per chain (multi-day), CryptoMarketCal events as standalone (community-voted noise), generic "cross-exchange spread" without DEX-CEX framing.

**Signals to add that v1 is missing:** OFI (Cont/Kukanov/Stoikov), VPIN, CryptoBERT sentiment, Telegram pump-channel scrape, Hyperliquid whale-fill cross-reference, ETF flow direction (substitute for stablecoin inflow at T1).

---

## 3. Top three stacks per pipeline

Stacks are ranked by composite score = precision × recall × (1/latency_min) × free_reliability. Each stack has a plain-English explainer plus exact thresholds.

### Pipeline A — Orderflow (1–2h, scan every 2–3 min)

**Stack A1 (highest conviction): Basis dislocation + OFI confirm + funding regime.** *What it does in plain English:* fires when Lighter's perp price diverges from Hyperliquid/Binance by more than 1.5 standard deviations of recent spread, the Lighter L2 order-flow imbalance confirms direction, and funding sits at a non-extreme percentile so the move isn't already crowded. This catches venue-leading informed flow.
- Lighter–HL basis z > 1.5σ (rolling 24h)
- OFI sign matches basis direction, OFI 5-min EMA |z| > 1.5
- Funding rate between 30th and 70th percentile (avoids crowded carry trades)
- Estimated precision 0.55–0.65, recall 0.20–0.30

**Stack A2: Volume + OI delta + funding extreme reversal.** *What it does:* identifies leverage build-up that's about to flush — high volume z, OI ramping with flat price, extreme funding percentile signaling crowded positioning. This is the classic "squeeze setup" but with a CVD confirmation requirement to avoid v1's empirically inverted assumption (see counterintuitive finding #2).
- Volume z > 3 (5-min vs 30d)
- OI delta > 5% in 1h with |price Δ| < 0.3%
- Funding > 95th or < 5th percentile (30d)
- **Required filter: spot OBV z > 0.5 in matching direction** (kills basis-trade FP)
- Estimated precision 0.45–0.55, recall 0.20–0.30

**Stack A3: VPIN + liquidation proximity + BB squeeze release.** *What it does:* detects toxic order flow regime preceded by volatility compression and a liquidation cluster nearby — the classic "vol-crush before vol-expansion" pattern, gated by VPIN >0.7 to filter out pure mechanical compression.
- VPIN > 0.7 (volume-bucketed)
- BB width < 10th percentile (20-period, 30d distribution)
- Within 1% of synthetic liquidation cluster
- Estimated precision 0.40–0.50, recall 0.30–0.45

### Pipeline B — Catalyst (2–6h, scan every 60 min + event-driven push)

**Stack B1 (highest conviction): T1 CEX listing announcement + spot CVD confirmation.** *What it does:* listing announcements on Binance/Coinbase/Upbit produce documented +29% to +73% pumps, but pre-pump basis arb FPs are common. Requiring spot CVD confirmation within ±6h kills the listing-arb false positive (FP-7) that makes OI ramp without directional intent.
- Binance/Coinbase/Upbit listing detected via API or RSS within 30 min
- Spot CVD z > 1.0 in same direction within 30 min of announcement
- Estimated precision 0.65–0.75, recall ~event-bound

**Stack B2: CryptoBERT-classified bullish news + funding regime + ticker velocity.** *What it does:* pre-trained CryptoBERT XL classifies news as bullish/bearish (58.5% accuracy on crypto vs FinBERT 52.7%); combined with non-crowded funding and a Reddit/Telegram mention spike for the named ticker. The mention spike confirms the news is being absorbed by the market in real-time.
- CryptoBERT score > 0.7 bullish or < 0.3 bearish
- Reddit + Telegram mention z > 2.5 (24h baseline) for ticker
- Funding 30th–70th percentile
- Hours-to-FOMC > 4 (kill macro-event interference)
- Estimated precision 0.55–0.65, recall 0.20–0.35

**Stack B3: Token unlock + recipient = team/investor + pre-drift.** *What it does:* targets the subset of unlocks that empirically dump (>5% supply, team/VC recipient, with pre-event drift not already negative). Per Keyrock's 16k-event study, ecosystem unlocks average +1.18% — they must be excluded.
- Unlock event T-2 days
- Unlock size > 5% circulating supply
- Recipient = team or VC (not ecosystem/community)
- 14-day pre-drift not already < −5% (already priced in)
- Direction = SHORT
- Estimated precision 0.55–0.65, recall ~event-bound

### Pipeline C — Whale + Narrative (6–24h, keep 4h cadence)

**Stack C1 (highest conviction): Hyperliquid whale fills + Lighter mirror + funding regime.** *What it does:* the top-PnL wallets on Hyperliquid (free public API) leading large positions in tokens also listed on Lighter is the cheapest cross-perp-DEX whale tracker available in 2026. Mirroring direction-agnostic flows misses; require the same direction to hit Lighter within 1–4h.
- Top-100 HL trader takes new position > $1M in matching ticker
- Lighter sees same-direction OI delta within 1–4h
- Funding not at extreme that would imply crowded
- Estimated precision 0.55–0.65, recall ~position-event-bound

**Stack C2: USDT exchange inflow + ETH/BTC pair + ruptures change-point.** *What it does:* aggregates USDT net inflow to top CEXs (the only on-chain signal with peer-reviewed 1–2h predictive power on BTC/ETH per Chi et al. 2024), confirmed by a structural break in OI series detected by `ruptures` PELT. This is regime-shift detection rather than threshold detection.
- Aggregated 1h USDT inflow to top-5 CEXs > 95th percentile (30d)
- `ruptures` change-point detected on log-OI series in last 4h
- For ETH: signal = inflow positive → SHORT (per Chi et al. negative predictor for ETH 1–6h)
- For BTC: signal = inflow positive → LONG
- Estimated precision 0.50–0.60, recall 0.15–0.30

**Stack C3: Sector rotation + ETF flow + isolation forest cross-section.** *What it does:* identifies the sector currently winning capital rotation (AI / RWA / DePIN / L2) via ETF flow and price-momentum, then runs an isolation forest on the cross-section of ~100 perps to flag tokens with anomalous volume/OI/funding combos within that hot sector. Replaces v1's "sector pulse" hand-coded indices with an actually-implementable cross-sectional anomaly score.
- Sector ETF flow > 75th percentile (T1 only)
- Isolation forest contamination=0.05 anomaly score on (vol z, OI z, funding pct, basis z) features
- Token belongs to leading sector
- Estimated precision 0.45–0.55, recall 0.30–0.45

---

## 4. Per-tier optimization matrix

The optimal stack differs materially by tier because market structure differs materially. Weights below are recommended *priors* for the meta-label LightGBM training set; final weights should be learned empirically on rolling 60-day windows.

| Tier | Pipeline A weight | Pipeline B weight | Pipeline C weight | Justification |
|---|---|---|---|---|
| **T1 Majors (BTC/ETH/SOL/BNB/XRP)** | **0.45** | **0.35** | **0.20** | Macro-event-driven 2–6h moves dominate per empirical reverse-engineering (FOMC ×3, CPI ×2, geopolitical ×6 of 24 documented moves). Funding extremes pre-event reliably forecast post-event direction. Whale flow is slower; stablecoin inflow has peer-reviewed 1–2h predictive power for BTC/ETH but recall is low. **ETF net flow last 24h substitutes for "stablecoin inflow"** — empirically much more observable in 2026 macro regime. |
| **T2 Mid-caps (LDO/ARB/OP/INJ/HYPE/etc)** | **0.25** | **0.50** | **0.25** | Listing announcements + ETF filings + protocol revenue narratives drive 5–20% moves (HYPE +108% from low; AIGENSYN +250% on Binance Alpha + Coinbase listing). Catalyst weight is highest here. Whale concentration matters for pre-listing leak detection (Telegram). Orderflow is cleaner than T3 but noisier than T1. |
| **T3 Memes (WIF/PEPE/BONK/FARTCOIN/MOG)** | **0.20** (wash-corrupted) | **0.30** | **0.50** | Whale wallet concentration is both the entry signal and the exit warning (FARTCOIN $145M TWAP build → +250% pump → −50% liquidation; RaveDAO +3,765% → −95% on ZachXBT exposure). Volume z-scores are corrupted by wash trading (Cong et al. ≥70% of unregulated CEX volume is wash). **Hard gate: T3 alerts require Benford χ² < 15.5, round-clustering < 0.35, and >100 unique trader addresses in 24h.** Social-source-quality filter (require credible KOL/onchain-detective post, not just mention count). |

**Cross-tier filters that override tier weights:**
- Macro event ±30 min (FOMC/CPI/NFP) → suppress all non-T1 alerts
- Cross-venue heartbeat lag >30s OR price dispersion >2% → global 60-min freeze (avoids Oct-2025-style outage FPs)
- Within 24h of monthly/quarterly Deribit expiry AND |spot − max-pain|/max-pain < 2% → suppress momentum alerts on BTC/ETH

---

## 5. Cross-pipeline conviction multipliers

Empirical anchor: combining alpha streams in published research lifts IR by **1.38× to 1.7×** (RavenPack: 4.35→6.0; multiple multi-factor crypto studies). Theoretical Bayesian upper bound assuming conditional independence with each pipeline at precision 0.20–0.30 and FP rate 0.07: 3-pipeline confluence reaches ~0.75 posterior, but real-world correlation (ρ ≈ 0.2–0.4) deflates to ~0.55–0.65.

| Active pipelines | Conviction multiplier vs single-pipeline baseline | Source / Rationale |
|---|---|---|
| A only (orderflow) | 1.0× | OFI predictive but decays in <30 min (Cont et al.) |
| B only (catalyst) | 0.9× | News absorbs in ~45 min; high FP without confirmation (SJFA 2025) |
| C only (whale/onchain) | 1.1× | Slower; higher base precision when fired |
| **A + B** | **1.7×** | Independent timescales; orderflow confirms catalyst absorption |
| **A + C** | **1.8×** | Smart money + tape; historically strongest combo (Apr 2026 BTC rally pattern) |
| B + C | 1.5× | Both slow; better for swing setups than entry timing |
| **A + B + C** | **2.5–3.0×** | Rare; per Grinold √3 with ρ≈0.3 implies ~1.6× IC, ~2.5× edge after Bayes |

**Operational rule:** treat these as priors for the meta-label LightGBM `confluence` feature, not hard score multipliers. The model should learn the actual uplift from labeled history; the priors above seed the cold-start period.

---

## 6. False-positive filter rules

Twelve documented patterns with detection logic. The first six are hard gates (suppress regardless of composite score); the rest are soft penalties applied to the score before meta-label evaluation.

| # | Pattern | Detection condition | Action | Tier sensitivity |
|---|---|---|---|---|
| 1 | **Basis-trade OI ramp** (Ethena/cash-and-carry style) | OI z > 2 ∧ \|spot OBV z\| < 0.5 ∧ funding > 0.0001 | **Hard suppress long-momentum** | T1 ≫ T2 |
| 2 | **Funding flip mechanical** | sign-flip ∧ \|spot ret 1h\| < 0.3% ∧ vol z < 1 | **Hard suppress reversal** | T1, T2 |
| 3 | **MM block / inventory rebalance** | vol z > 2.5 ∧ trade-count z < 1 ∧ markout-5min ≈ 0 | **Hard relabel as block; kill momentum** | T2 ≫ T3 ≈ T1 |
| 4 | **Cross-venue outage** | venue HB lag > 30s OR cross-venue px disp > 2% | **Hard global 60-min freeze** | All |
| 5 | **CEX listing arb spillover** | within ±6h Tier-1 listing ∧ OI z > 2 ∧ basis ≈ 0 ∧ no spot CVD confirm | **Hard require spot CVD confirmation** | T2 ≫ T3 |
| 6 | **Wash trading T3** | Benford χ² > 15.5 OR round-cluster > 0.35 OR Pareto α ∉ [1,2] OR <100 unique traders/24h | **Hard suppress entirely** | T3 only |
| 7 | **Pre-priced news / sell-the-news** | 14-day pre-drift > 10% ∧ within ±2h known calendar event | Soft −40% | All, especially T1 |
| 8 | **Stop-hunt / liquidity sweep** | wick/range > 0.6 ∧ candle closes back inside prior range | Hard invalidate breakout, allow fade T+1 | All |
| 9 | **Liquidation hunt one-sided** | liq z > 3 ∧ one-side > 85% | Soft −50% for 15 min in same direction | T1 ≫ T2 |
| 10 | **Token unlock priced-in** | unlock < 1% circ OR recipient = ecosystem OR pre-drift < −5% | Hard suppress short alerts | T2 ≫ T3 |
| 11 | **Stablecoin mint not deployed** | exchange-inflow / mint < 50% in 24h | Soft −30% on risk-on signals | T1 |
| 12 | **TWAP / max-pain pin** | trade-size CV < 0.3 ∧ interval CV < 0.3 OR \|spot − max-pain\|/max-pain < 2% within 24h of expiry | Soft −40% / hard pre-expiry suppress | T1 (BTC/ETH) |

These twelve rules go in the Python prefilter stage *before* meta-label evaluation. The meta-label model then trains on the residual events (post-filter), so the LightGBM doesn't waste capacity learning patterns the deterministic filters already handle.

---

## 7. Final v2 architectural spec

### What survives from v1
- Three-pipeline parallel architecture — empirically validated by horizon-specific signal half-lives (OFI <30min, news ~45min, whale flow 6–24h+)
- 4h Pipeline C cadence — correct given signal timescales
- Three-tier universe segmentation — empirically validated by distinct pre-move signatures per tier
- Score-band gating (>70 high-conviction, 50–69 watchlist, <50 suppress) — kept as transparent fallback when meta-label model is being retrained or its OOS AUC drops below 0.55

### What gets cut
- **Equal-weight 0.33 layer combination** → replaced by LightGBM meta-label gate
- **5-minute Pipeline A cadence** → tightened to 2–3 min where infra allows; OFI dies at 15–30 min
- **DefiLlama unlock calendar** assumption → fork open-source `emissions-adapters` or scrape dashboard
- **Nitter-based X/Twitter scraping** → dead; replaced by Bluesky + Farcaster + Reddit + Telegram basket
- **Coinglass free-tier liquidation heatmaps** → build synthetic from realized liq events
- **DefiLlama per-token CEX flows** → does not exist on free; build via Etherscan v2 + custom CEX wallet list
- **CryptoQuant netflow API** → no free tier; use website chart scraping for daily regime context only
- **Holder concentration** as intraday signal → drop (multi-week timescale)
- **Bridge volume per chain** as intraday signal → drop (multi-day timescale)
- **BTC exchange netflow** as intraday predictor → drop (Chi et al. null result)
- **CoinMarketCal events** as standalone → demote to lead-generator only

### What gets added
- **LightGBM meta-label gate** trained on triple-barrier labels (TP=2%, SL=1%, vertical=horizon), retrained walk-forward weekly with isotonic calibration. Single highest-ROI architectural addition; +5–10pp precision in published reproductions.
- **Cont/Kukanov/Stoikov OFI** computed on Lighter L2 stream — interpretable, ~30 LOC, peer-reviewed
- **VPIN** (volume-bucketed toxicity) — risk filter for liquidation-cascade regimes; ~50 LOC
- **CryptoBERT** (kk08/CryptoBERT or ElKulako/cryptobert) for news classification — F1 0.59 on crypto vs FinBERT 0.53; runs free on CPU
- **Hyperliquid whale-fill cross-reference** — best free cross-perp-DEX whale tracker
- **Lighter L1 USDC deposit anomaly detector** — under-researched niche signal; cheap to build
- **Telegram pump-channel monitoring** — best free leading indicator for CEX-listing leaks per arXiv 2204.12929
- **Isolation Forest** as cross-sectional pre-filter — sklearn one-liner; flags interesting tokens
- **`ruptures` change-point detection** on Pipeline C OI series — regime-shift feature, not entry trigger
- **3-bucket realized-vol regime context** (instead of HMM, which is overhyped at sub-daily) — captures 80% of regime benefit at 1% of the cost
- **Triple-barrier labeling** via `mlfinlab.labeling` — eliminates fixed-horizon heteroscedasticity bug

### What gets explicitly skipped
- **HMM regime detection** (Hidden Markov Models) — overhyped at sub-daily horizons; simple vol-quantile bucket suffices
- **LSTM / Transformer sequence models** — do not beat LightGBM on tabular short-horizon classification (arXiv 2309.11400)
- **Hawkes processes** — real edge but heavy implementation; marginal lift over OFI for binary classification; defer to v3
- **River online learning** — weekly LightGBM retrain captures 90% of drift-adaptation benefit with much better stability
- **Bayesian model averaging** — operationally noisy with N=3 signals and short crypto histories; logistic regression with isotonic calibration delivers 95% of benefit at 5% of cost

### Final cadence per pipeline
| Pipeline | v1 cadence | v2 cadence | Rationale |
|---|---|---|---|
| A (orderflow) | 5 min | **2–3 min where infra allows; 5 min with exponential recency-weight (τ=10min) otherwise** | OFI dies at 15–30 min |
| B (catalyst) | 60 min | **60 min polling + event-driven push on listings/unlocks/macro** | News absorbed in ~45 min; listing pumps complete in 24–72h |
| C (whale/narrative) | 4 hr | **Keep 4 hr** | Signal half-life 6–24h; faster polling adds noise |

### Realistic precision/recall floors on free data
- **Universe-wide:** 55–65% precision, 30–45% recall — the v1 ≥65% precision target is **not achievable as a universe floor** on free data
- **T1 majors with macro-event triggers (Pipeline B):** 65–75% precision attainable
- **T2 listing/ETF events (Pipeline B):** 65–75% precision attainable
- **T3 memes (any pipeline):** 45–55% precision realistic ceiling due to wash trading, oracle thinness, rug-pull risk

---

## 8. Build effort estimate

| Component | Hours | Notes |
|---|---|---|
| Lighter native WS ingestion (trades, OI, funding, mark, candles) | 16 | Async websocket client + rolling state |
| Cross-venue mark/funding ingestion (Binance, Bybit, OKX, HL via ccxt) | 12 | ccxt covers all four; Lighter not in ccxt registry — separate client |
| Coinalyze free aggregator integration | 6 | OI/funding/long-short ratio cross-CEX |
| Pipeline A signal engine (vol z, OI z, funding pct, basis, BBW, ATR, CVD, OFI, VPIN) | 60 | Most are <30 LOC each; OFI and VPIN are the largest |
| Synthetic liquidation heatmap (realized liq events + leverage prior) | 16 | Aggregate HL/Binance/Bybit/OKX liq WS |
| News RSS fan-in + entity linking (spaCy + ticker gazetteer) | 16 | feedparser + custom disambiguation |
| CryptoBERT inference pipeline | 8 | HuggingFace `transformers` on CPU |
| Token unlock dashboard scrape + emissions-adapters fork | 12 | Local cron of forked DefiLlama repo |
| Listing announcement pollers (Binance, Coinbase product diff, Upbit, OKX, Bybit) | 16 | Multi-source with retry/backoff |
| GitHub commit velocity per protocol | 8 | Mapping repos via DefiLlama metadata |
| Reddit OAuth + mention-velocity z-scores | 12 | 100 QPM budget across ~100 tickers |
| Telegram channel scraping (Telethon) | 16 | FloodWait handling + channel curation |
| Bluesky Jetstream + Farcaster Neynar mention pipelines | 16 | WS + REST |
| Macro calendar (FOMC/CPI/NFP/ETF EDGAR) ingestion | 8 | RSS + scheduled polling |
| Stablecoin CEX inflow pipeline (Etherscan v2 + Tronscan + custom CEX wallet list) | 24 | Wallet list curation is the bulk |
| Hyperliquid whale-fill tracker (top-100 PnL leaderboard scrape + position diff) | 20 | HL public API + state diffing |
| Lighter L1 USDC deposit anomaly detector | 12 | Etherscan v2 on deposit contract |
| Bridge / DEX vs CEX / sector flow pipelines (DefiLlama) | 12 | Multiple endpoints, simple aggregation |
| Isolation Forest cross-sectional pre-filter | 4 | sklearn |
| `ruptures` change-point on OI | 4 | Library call |
| Triple-barrier labeling pipeline | 12 | `mlfinlab.labeling` integration |
| LightGBM meta-label model + walk-forward retrain harness | 24 | Weekly scheduled retrain + isotonic calibration |
| Twelve hard-gate / soft-penalty filter rules | 24 | Each is small, but needs unit tests |
| Wash-trading filter (Benford + rounding + Pareto + uniqueness) | 12 | Weekly recompute per T3 token |
| Score combiner + alert payload generator | 8 | Final orchestration layer |
| Backtesting harness (synced historical data + replay) | 32 | Required for meta-label training and v2 validation |
| Monitoring, logging, alert dispatch | 16 | Required for production |
| **Total to live alerts** | **~404 hours** | ~10 weeks at 40hr/wk; ~6 weeks at 70hr/wk with LLM-assisted dev |

Single VPS (~$5–10/mo) acceptable as compute infrastructure under "free data" constraint. Total external API spend: **$0/mo**.

---

## 9. Three most counterintuitive findings

**1. OI ramp with flat price is bearish, not bullish, in 2026's regime.** v1 treats this as a "squeeze setup" likely to resolve directionally upward. Empirical 2026 evidence inverts this: CryptoQuant's May 2026 piece documents that BTC's 12.7% April gain was "perpetual-futures-driven; spot demand contracted" and each prior instance preceded a fade. The Apr 17 BTC rally, the Apr 14 SOL rally, and HYPE's spot-CVD-divergence-during-rally pattern all confirm this. **Implication:** v1's OI-ramp signal must be paired with a hard spot-OBV-confirmation gate; without spot confirmation, treat OI ramps as basis-trade FPs (FP-1) not directional setups. This is the single largest empirical contradiction to v1 in the dataset.

**2. Token unlocks are not reliable bearish catalysts at the cadences v1 assumes.** v1 weights unlocks as a high-conviction Pipeline B signal. Keyrock's 16,000-event study and Tokenomist data both show: pre-event drift starts 30 days early, the actual unlock day has minimal price impact, ecosystem/community unlocks average **+1.18%** (positive), and monthly cliff schedules (e.g., ARB) get absorbed after the first 2–3 events. Only large team/VC unlocks with non-already-negative pre-drift are reliably bearish. **Implication:** unlock signal needs recipient classification, size threshold, and pre-drift gate — without these, it's a 50-50 noise signal that v1 weights as high-conviction.

**3. Headline classification is the missing necessary condition v1 doesn't have.** No single technical signal in v1's spec hit ≥80% frequency across the 24 documented Q1–Q2 2026 moves. The closest thing to a necessary condition was "**News headline OR extreme funding**" at 92% frequency. Geopolitical headlines alone (Iran ceasefire, Strait of Hormuz, Trump-Iran address) produced ≥3% moves with 100% directional accuracy in the dataset. v1's "RSS aggregation" treats headlines as triggers but not as classified directional signals — **a CryptoBERT classifier on headline corpus is the missing necessary condition**, not a nice-to-have. Combined with the Nitter-is-dead reality, this means Pipeline B in v2 is fundamentally a news-classification pipeline with social-velocity confirmation, not a social-velocity pipeline with news flavoring.

**Bonus finding: Lighter is a follower, not a leader.** Lighter's $1B 24h volume vs Hyperliquid's $180B/30d means Lighter prices follow Hyperliquid flow with measurable lag. v1 treats Lighter as the primary venue for signal generation. The empirical record suggests v2 should use **Hyperliquid orderflow as the leading indicator and Lighter as a confirmer/divergence check**. This inverts the v1 mental model and changes which API is primary in Pipeline A.

---

## Conclusion

The v2 spec keeps v1's three-pipeline / three-tier topology but rebuilds the combiner around a LightGBM meta-label gate, replaces five paywalled or dead free-data assumptions with working alternatives, adds the four signals v1 was missing (OFI, VPIN, CryptoBERT, Hyperliquid whale tracking), and inverts two load-bearing v1 assumptions (OI-ramp directionality, unlock bearishness) that contradict the 2026 empirical record. Realistic precision floors on free infrastructure are 55–65% universe-wide, with 65–75% achievable on T1 macro events and T2 listing events specifically. Total build effort to live alerts: ~400 hours. Total external API spend: $0/month.

The biggest remaining gap is X/Twitter — Nitter is dead, X v2 free read is killed, and the Bluesky+Farcaster+Reddit+Telegram substitute basket is structurally weaker than what was possible in 2023. If this gap proves binding in production, the cheapest paid escape hatch is Apify Twitter actors at $30–50/mo metered, which is a strict violation of the zero-paid-API constraint but worth flagging as the single highest-leverage paid upgrade if the basket underperforms.