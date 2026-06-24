---
title: "Polymarket Bot Spec Stress-Test: What the v1 Gets Wrong"
date: 2026-04-10
summary: "Three structural blockers before writing a single line — US legal exposure on international Polymarket, the V2 migration wiping open orders mid-build, and the real Claude API cost."
category: research
status: shipped
tags: ["prediction markets", "Polymarket", "trading", "systems"]
---

# Polymarket bot spec stress-test: the solo US operator's reality check

**Bottom line up front: the v1.0 spec as written is not viable.** Three structural findings override everything else. First, the operator is **US-based and the international Polymarket is ToS-prohibited and IP-geoblocked**; the regulated Polymarket US (QCEX rail, launched Dec 3 2025) is invite-only KYC-gated with FCM funding — your Polygon+USDC stack doesn't fit the legal path. Second, the **CTF Exchange V2 + pUSD migration** announced April 6, 2026 is rolling out *inside your 4-week window*; all open orders cancel, contracts change, client libs must upgrade. Third, **Claude Max does not cover programmatic API use** (explicit Anthropic policy, reinforced April 4, 2026 cutoff of third-party subscription auth) — the cascade as spec'd costs **~$1,330/mo at list, ~$640/mo optimized**, not $0. Everything else in this report assumes you either resolve the legal question (Polymarket US waitlist, or pivot to Kalshi with same code), defer 4-6 weeks past V2 stabilization, and budget $150-300/mo for LLM. If you do, there is a real, ~15-40% annualized edge accessible from a tail-end+rulebook-hunting hybrid — but not from the strategies you picked.

---

## Section A — Strategy reverse-engineering

**TL;DR: 14 documented strategies catalogued. Five "hidden gem" candidates for solo+LLM stack; eight saturated or infrastructure-gated; one dead. Biggest surprise: the Petersen "UMA oracle 55-second lag" writeup your spec names is actually a *Chainlink* feed-vs-CLOB lag on 15-min crypto markets — not a UMA exploit at all, and Polymarket's January 7 2026 dynamic taker fee (~3.15% at 50/50 odds) specifically targeted and largely killed it.** Confidence: High on strategy existence; Medium on claimed P&L (most "$50k/week" figures are content-marketing, not verified on-chain).

**Strategy catalog (ranked by fit for your stack):**

| # | Strategy | Edge evidence | Complexity | Saturation | 2026 viability | Steal-ability |
|---|---|---|---|---|---|---|
| 1 | **Resolution ambiguity / rulebook hunting** (dispute winners take proposer's bond + correct resolution) | Polymarket docs: "most disputed proposals resolved in favor of disputer"; $750 bond | 6/10 | **LOW** | **High** | 2-week read of past disputes |
| 2 | **Weather ensemble vs bucket prices** (GFS/ECMWF/NOAA → normal CDF → compare to Polymarket temperature buckets) | WeatherBot.finance 3-8% edge claims; 570+ active weather markets | 6/10 | LOW-MED | High | 1 week |
| 3 | **Tail-end sweep** (buy 0.93-0.95 on functionally-certain YES within hours of resolution) | 97.0% Polymarket accuracy at T-4h (official); "Fish" trader: 90% of $10k+ orders fill >0.95 | 2/10 | HIGH on flagship; MED on long-tail | High structurally | Trivial |
| 4 | **Long-dated tail fade / risk-free-rate arb** (sell "aliens invade" >4%, "X by 2030" markets above Polymarket's implicit floor) | Domer ChinaTalk interview — documented trades | 3/10 | **LOW** | High | <1 week |
| 5 | **Combinatorial/logical arb** (correlated markets violating probability constraints: "Trump wins" vs state margins) | IMDEA paper (arXiv 2508.03474): $29M realized 2024-2025 | 8/10 | MED | MED (election-cycle) | 2-3 weeks — LLM semantic edge |
| 6 | **Earnings beat/miss divergence** (Polymarket earnings vs Wall St consensus >20% gap) | Wolfe Research / Bloomberg April 16 2026: Polymarket miss signal 44% vs 18% baseline | 3/10 | Emerging | High short-term | 1 week |
| 7 | **Count/word markets** (Elon tweet counts, Trump speech words) | Prexpect wallet: $118,754 verified on-chain Nov 2024–Oct 2025 | 3/10 | MED (post-exposure) | High | Trivial |
| 8 | **Whale basket copy-trading** (5-10 specialist wallets/category, win-rate + profit-factor filters) | HyperBuildX claim: biggest single improvement in years of iteration | 4-7/10 | HIGH | MED | <1 week |
| 9 | **Sportsbook directional edge** (Pinnacle fair value vs Polymarket) | Anonymous MM: $60-65k/month on $300k NFL risk | 5/10 | MED-HIGH | High w/ book access | Low without books |
| 10 | **Binary YES+NO arb** (dutch-book sum<$1) | IMDEA: $10.6M realized | 3/10 | **EXTREME** — 73% to sub-100ms bots, 2.7s windows | Low solo | High code / low profit |
| 11 | **Market making / LP rewards** | warproxxx + Terry Lee + Liu all report **unprofitable** in 2025-26; wanguolin ~10% APY realistic | 7/10 | EXTREME | LOW solo | Med code / low profit |
| 12 | **Chainlink→CLOB lag (the "Petersen" strategy)** | 61.4% win rate backtest; Liu live test **-49.5%** after fees/slippage | 5/10 | HIGH & rising | **MED-DEAD** post Jan 2026 fees | 1 week |
| 13 | **LLM news synthesis as standalone alpha** | Liu paper: 522× paper → -49.5% live on 5-min BTC; Arbigab: "raw LLM is commodity" | 6/10 | Rising hype | **LOW standalone, HIGH as filter** | High build / low profit |
| 14 | **Calendar spread / term structure** (sell front-dated YES, buy longer-dated on same event) | Substack threadingontheedge — unverified $200/day | 6/10 | LOW | MED | Medium |

**Critical meta-lessons from post-mortems:**
- **Paper→live gap is brutal.** Jung-Hua Liu's 522× paper backtest produced a **49.5% live loss** on 5-min BTC markets. Assume 2-4¢ slippage and model fees explicitly before trusting any backtest.
- **Market-making is the most decayed public strategy.** Two independent 2025-26 practitioners (warproxxx, Terry Lee) published post-mortems declaring it unprofitable for solos.
- **The "$115k/week OpenClaw Claude bot" number** repeated across content-marketing sites is an **unverified flypix.ai marketing claim** with no wallet or screenshots. Treat as grift.
- **Domer, the all-time #1 Polymarket trader, loses roughly half his bets** and trades fully manual — the game is *sizing + selection*, not automation.
- **Security:** StepSecurity 2026 documented 20+ typosquat Polymarket bot repos under hijacked `dev-protocol` GitHub org exfiltrating wallet keys (660+ fork-bombed post-Feb 2026). Only fork named-author repos with history: **Polymarket/agents, warproxxx/poly-maker, JonathanPetersonn/oracle-lag-sniper, guberm/polymarket-bot, Drakkar-Software/OctoBot-Prediction-Market.**

---

## Section B — LLM routing economics

**TL;DR: Spec'd cascade costs ~$1,330/month at Anthropic list pricing, ~$640/month with aggressive caching+batching. Claude Max ($100-200/mo) does NOT offset any of this — Anthropic support explicitly states Max covers chat/Code only, and the April 4, 2026 cutoff revoked third-party tools' ability to auth against subscription quotas. The Claude Agent SDK requires API keys.** To hit your <$50 LLM ambition you must either cut scan frequency from 24/day → 6-8/day or route Layer 1 to Gemini 2.5 Flash-Lite / GPT-5 Nano. Confidence: High on pricing; Medium on real token counts (log and verify).

**Verified April 2026 Anthropic pricing** ($/MTok input / output / cache-read / cache-write-5min): Haiku 4.5: 1.00 / 5.00 / 0.10 / 1.25. Sonnet 4.6: 3.00 / 15.00 / 0.30 / 3.75. Opus 4.7: 5.00 / 25.00 / 0.50 / 6.25. Batch API 50% off; cache-read ~90% off. Web search tool: **$10/1,000 calls** on top of tokens. Opus 4.7's new tokenizer produces **~35% more tokens per identical text** — budget 1.2-1.35× nominal.

**Baseline spec cost, 30 days:** L1 Haiku 12,000 calls × (500 in / 100 out) = $360. L2 Sonnet 1,200 × (2,000 / 500) = $486. L3 Opus 120 × (8,000 / 1,500) with 35% tokenizer inflation = $377. Web search 10,800 calls = $108. **Total ~$1,331/mo.** Key confidence caveat: Opus L3 prompts in production typically balloon to 12-15k input once you include news context and rubric — budget headroom.

**With aggressive 1-hour TTL caching on system prompts (~75-80% of input cacheable) + Batch API on L1/L2:** L1 drops to ~$115, L2 ~$170, L3 stays ~$353 (can't batch because web_search is sync). **Total ~$640/mo.** Confidence: Medium-High; Batch has up-to-24h latency so this only works if L1 runs on hourly batch windows rather than real-time.

**Routing alternatives ranked by $/accuracy:** (A) **Hybrid with Gemini 2.5 Flash-Lite L1 ($0.10/$0.40), Sonnet L2, Opus L3, all cached** — **$570-725/mo.** Best $/accuracy; Flash-Lite is well-benchmarked for high-volume classification. (B) **Haiku-only cascade with extended thinking at L3, fully cached** — **~$400/mo** but sacrifices real alpha on L3 nuance (Haiku scores 73% SWE-Bench vs Opus 87%). (C) **Sonnet-only skipping Haiku** — $1,940/mo, worst option. Reject. (D) **Recommended compact config**: Flash-Lite L1 + Haiku L2 extended-thinking + Opus L3 cached, scan 8×/day instead of 24, Brave Search ($3-5/1k) instead of Anthropic web_search → **~$120-200/mo total**, realistic floor given your economics. Confidence: Medium-High.

**Haiku 4.5 for triage**: adequate for binary "is this market interesting" on metadata. Known failure mode is verbosity/over-engineering on loose specs and middling nuance on ambiguous resolution-criteria text — systematic false-negative risk on markets a human would flag. Upgrading L1 to Sonnet costs +$470/mo and is not worth it; instead constrain Haiku output to strict JSON schema and periodically sample Haiku-rejected markets through Sonnet for offline drift detection.

**Web search optimization (material savings):** Anthropic's $10/1k is 2-3× Brave Search's $3-5/1k and 10× Serper's ~$1/1k. Switching to Brave + pre-cached RSS context drops search line item ~$70-100/mo. Cap Opus L3 to 1-2 searches per analysis (use extended thinking to force query consolidation); deduplicate by batching same-domain queries.

---

## Section C — Near-resolution arbitrage parameters

**TL;DR: The flagship strategy is real but your 93¢ entry threshold is too loose after the January 2026 dynamic taker fees. Minimum recommended taker entry = 95¢ standard / 93¢ in Crypto (1.80% fee peak) / 90¢ in Mentions. Maker (limit) orders save the entire taker fee and are the single biggest lever — use them exclusively where possible.** Confidence: High on framework; Medium on specific thresholds pending your own CLOB data.

**Polymarket-published accuracy (Dune by Alex McCullough, official):** T-4h = **97.0%**, T-12h = 96.6%, T-1d = 96.1%, T-1w = 94.4%, T-1m = 91.2%. Overall Brier score **0.0834** — extreme probabilities are well-calibrated at the aggregate. Implied disaster rate on markets reading ≥95% YES at T-4h: **~1-2%**, but heavily category-dependent.

**Category cleanliness ranking (cleanest → dirtiest):** (1) Crypto price with Chainlink threshold ~99.5%+, (2) Sports game outcomes ~99%+, (3) US economic data ~99%, (4) Political outcomes with AP/Fox/NBC rules ~97-98%, (5) Appointments ~96%, (6) Entertainment ~95%, (7) Sports props ~93%, (8) Foreign elections with authoritarian sources ~85-90%, (9) Mention markets ~85%, (10) "Did X event happen" interpretation markets ~80%. **v1.0 whitelist: categories 1-4 only. Hard blacklist: 7-10.**

**Break-even math for $100 taker buy at 95¢ (non-Crypto 1.0-1.25% fee tier):** Gross edge 5.0¢ − taker fee ~0.25¢ − slippage 0.5¢ − tail-risk EV at 1.5% disaster rate 1.4¢ = **~2.8¢ net** (just clears your 3¢ minimum). At 97¢ entry: **0.9¢ net, below threshold — reject.** Polygon gas is effectively $0 via meta-tx; UMA bond risk is zero (you're not proposing).

**Historical horror stories that teach the rules:** (1) **Venezuela 2024** — "primary = official Venezuelan sources" rule; Maduro declared winner 75¢ → UMA applied "spirit over letter" and resolved to González ($0). (2) **Barron Trump/$DJT $1.1M** — UMA voted NO; Polymarket overrode and refunded. (3) **ETH ETF by May 31 2024** — 19b-4 vs S-1 semantic gap, YES holders won against ordinary-language interpretation. (4) **OceanGate Titan** — explicit rule carve-out ("finding debris shouldn't count") overruled by UMA. (5) **Cardi B Super Bowl LX (Feb 2026)** — $47M disputed on Kalshi, $10M+ on Polymarket over "performed" semantics. (6) **Maduro capture Jan 2026** — geopolitical "certain NO" at 6% flipped overnight on insider information; tail-sweepers of NO got crushed. **Lesson: any market where rule text can conflict with "spirit," UMA whale votes swing outcomes, or primary sources are informal → untradeable.**

**Kelly sizing table** (buy at 0.93 assuming true prob p):

| True p | Full Kelly | Quarter Kelly (recommended) |
|---|---|---|
| 0.99 | 86% | **21%** |
| 0.98 | 71% | 18% |
| 0.97 | 57% | 14% |
| 0.95 | 29% | **7%** |
| 0.93 | 0% | 0% |

**Use Quarter Kelly, cap single-market exposure at 5-10% of bankroll.** Full Kelly is wildly over-aggressive because disaster losses are the full 93¢ (non-Gaussian tail), UMA governance-capture losses correlate across markets, and your *p* estimate has parameter risk. At $100 cap + 5% per market: **$2,000 minimum bankroll**; for 10 concurrent positions at 2% each: **$5,000**.

---

## Section D — LLM news-synthesis edge (partial — combined from other sections)

**TL;DR: Verdict — real alpha as a *filter layer* on mechanical signals; hopium as a *standalone directional agent*. Every public live-trade LLM study on Polymarket has lost money.** Confidence: Medium-High.

**Verified practitioner evidence:**
- **Jung-Hua Liu's LLM-augmented arbitrage bot** (Medium, Mar 2026) on 5-min BTC markets: 522× paper-traded returns → **-49.5% live capital loss.** Live win rate 25-27%. LLM filter improved capital preservation 7× over naive strategy but still lost money. Direct quote: *"Signal quality dominates LLM quality."*
- **Domer (#1 Polymarket trader, ChinaTalk interview):** *"At least two people have tried [AI agents]. It hasn't been successful yet that I know of."*
- **Arbigab author** (deeper critique, 2026): *"A raw LLM call is a commodity. Everyone has the same models. Zero edge."*
- **Halawi et al. 2024 "Approaching Human-Level Forecasting"** established LLMs can reach near-aggregate-crowd Brier scores on Metaculus — but this is near-*crowd*, not near-*market*; Polymarket prices are often sharper than Metaculus forecasts on liquid markets.

**Where LLM text synthesis does provide edge:** (a) **rulebook parsing** during 2-hour UMA challenge windows — ideal for Opus reading proposal + recent news + market rules; (b) **semantic market-mapping** for combinatorial arbitrage (identifying correlated markets that violate probability constraints); (c) **narrative/catalyst filtering** on mechanical signals from #3 tail-end or #6 earnings; (d) **count/word markets** (#7) where Claude can model intraday pace against bucket prices.

**Where LLMs add no edge:** major sports (Vegas is sharper), liquid crypto price markets (coinbase flow is faster), liquid elections (institutional flow), Fed/CPI releases (numeric data, rates market leads).

**Recommended Pydantic scoring schema** for L2/L3 output:
```python
class MarketScore(BaseModel):
    market_id: str
    condition_id: str
    yes_prob_estimate: float  # 0-1
    market_yes_price: float
    edge_bps: int  # (estimate - price) × 10000
    confidence: Literal["low", "med", "high", "very_high"]
    resolves_within_hours: float
    category: Literal["crypto_price", "sports_game", "political_called",
                     "econ_data", "entertainment", "prop", "foreign_election",
                     "mention", "interpretation"]
    rulebook_ambiguity_flags: list[str]
    key_uncertainties: list[str]
    recommended_action: Literal["skip", "alert_only", "semi_auto_buy"]
    position_size_usd: float  # capped at $100
    rationale: str  # <200 words
```

**Edge decay:** No published benchmark, but consistent with Illumination's Medium analysis that arbitrage opportunity windows compressed **12.3s (2024) → 2.7s (Q1 2026)** and 73% of arb is now sub-100ms bots. Assume any strategy that becomes publicly documented decays 50% within 3 months and is mostly gone within 12.

---

## Section E — Oracle lag arb: status check

**TL;DR: The UMA oracle lag arb (event-market variant) is DEAD. The Chainlink-feed-vs-CLOB lag arb (Petersen's actual strategy on 15-min crypto markets) is MARGINAL and trending dead post Polymarket's January 7, 2026 dynamic taker fee rollout specifically designed to kill it.** Confidence: Medium-High.

**Critical clarification the spec missed:** Petersen's dev.to writeup and `JonathanPetersonn/oracle-lag-sniper` repo (Mar 2026) do **not** exploit UMA Optimistic Oracle. They exploit **Chainlink Data Streams** (sub-second feed) vs CLOB repricing (~55s) on 15-minute BTC/ETH/SOL/XRP UP/DOWN markets — markets that never touch UMA. The "2024 writeup" in your spec is actually a 2026 article with Feb 2026 backtest data.

**UMA mechanics April 2026:** 2-hour liveness/dispute window; $750 USDC.e proposer bond; first dispute auto-resets (not DVM); second dispute → token-holder vote. **UMIP-189 / MOOV2 (Aug 2025) whitelisted proposers to ~37 addresses** (>20 proposals in rolling 3-month window, ≥95% accuracy) — this closed the permissionless-proposer angle entirely. UMIP-185 added slow-proposer penalty. Event markets no longer have an exploitable price-vs-proposal window; the CLOB converges well before proposal happens.

**Petersen strategy viability:** Backtest 5,017 trades Feb 2026 showed 61.4% win rate, 11.8% avg return/trade. But: Polymarket's **dynamic taker fee (Jan 7 2026)** scales with distance from edges — at 50/50 odds where signals fire most, fee reaches **~3.15%**, specifically cited by Polymarket as designed to make "the strategy unprofitable at scale." Arb opportunity duration compressed 12.3s → 2.7s; sub-100ms bots capture 73%. Petersen's repo has 4 stars — not obscure, decayed.

**Verdict:** Not recommended for solo operator on Hetzner CPX22 (home-region latency ~100-150ms; Polymarket CLOB infra is Dublin/London). The transferable lesson is the asyncio architecture pattern (deque circular buffers + 7 concurrent tasks via `asyncio.gather` + WS heartbeat detection) — **clone as a skeleton for rulebook-hunting bot, not for this strategy.**

---

## Section F — Zero-information-gap coverage

**TL;DR: A ~30-feed RSS stack + GDELT DOC API + NWS ATOM + HN Firebase SSE + Reddit .rss + Telegram MTProto mirrors gets you sub-60-second awareness on ~85% of Polymarket categories at $0/month. The remaining 15% (X-native scoops, paywalled bodies, non-indexed foreign breaking) is why you budget X pay-per-use ($30-100/mo) as your first paid upgrade.**

**Core RSS set — highest-leverage feeds:** BBC World, Al Jazeera, Politico (main + Playbook + White House), NYT Politics, WaPo Politics, The Hill, **CoinDesk** (publishes instantly per their docs), The Block, Decrypt, Cointelegraph, CNBC, MarketWatch, WSJ (headlines-only), ESPN top + NFL + NBA, **NWS national alerts ATOM** (weather — real-time, best free gov feed), SPC severe weather, NHC tropical, Variety, Deadline, Hollywood Reporter, **Hacker News (SSE push via Firebase** `/v0/updates.json`**)**, TechCrunch, The Verge, Nature, Foreign Policy, whitehouse.gov, SEC press releases, Federal Register, gov.uk, FEC, r/worldnews .rss, r/politics/hot .rss, r/CryptoCurrency .rss.

**Reuters/AP workaround:** both killed native RSS in 2020. Use Google News RSS proxy `news.google.com/rss/search?q=when:24h+allinurl:reuters.com` — ~15 min latency, fragile but free. Fallback scraper recommended.

**Free API layer (supplementing RSS):** **GDELT DOC 2.0** (65+ languages, 15-min cadence, no auth, fair-use rate limit) — fills the non-English breaking gap Claude web_search misses. **NWS API** (best-in-class real-time gov alerts, sub-minute). **HN Firebase** (no formal rate limit; SSE push). **Guardian Open Platform** (12 req/sec, **5,000/day**, full article bodies — rare). **FRED** (unlimited free econ data). **SEC EDGAR** (10 req/sec). **CryptoPanic** (100-1000/day aggregated crypto news). **Wikipedia pageviews** (100 req/sec — underrated virality signal). **The Odds API** free tier (500 credits/month — sports cross-reference only). Skip: NewsAPI.org free (24h delay, localhost only) and paid ($449/mo jump).

**Claude web_search coverage gaps:** paywalled bodies (snippets only); sub-5-min recency (use RSS/SSE for detection); non-English sources (use GDELT); social-media primary content (use Telegram MTProto mirrors of major X accounts — `@disclosetv`, `@SpectatorIndex`, `@WhaleAlerts`, `@FirstSquawk`-style channels via Telethon, no rate-limit concerns at solo volume). Use Claude web_search for **verification and disambiguation**, not primary detection.

**Paid source ranking by marginal edge for future scaling:** (1) **X pay-per-use** ($0.005/read, target ~$30-100/mo) — highest marginal edge because Polymarket markets move on X posts constantly; (2) Tavily ($30/mo / 4k credits); (3) AP or Reuters wire ($thousands/mo — only at scale); (4) Perplexity Sonar ($5/1k searches); (5) Exa ($49/mo); skip NewsAPI paid, Bloomberg Terminal (un-API-able for solo), X Pro ($5k/mo).

**Remaining gaps even with best free stack:** X-native scoops not mirrored to Telegram, WSJ/Bloomberg/FT investigative bodies, in-play sports data, private Discord/Signal leaks, real-time video/TV, satellite/shipping/flight tracking, Polymarket-competitor line movement (Kalshi, Manifold — their APIs exist but need custom polling).

---

## Section G — Technical infrastructure

**TL;DR: py-clob-client is healthy (v0.34.5 Jan 13 2026, 75 open issues, active); Gamma API is well-documented and REST-only with CLOB WS for real-time. The killer is the April 6 2026 V2 migration (CTF Exchange V2, pUSD replacing USDC.e, EIP-1271, new order struct) — rolling out through late April, inside your build window.**

**py-clob-client state:** MIT, Python 3.9+, 13 contributors incl. Polymarket staff. Known 2026 bugs to monitor: #292 WSS silent freezes, #287/#290 "not enough balance/allowance" errors when approvals missing on neg-risk adapter, #288 signature errors with EOA. **No built-in rate limiter** — implement token-bucket matching documented limits (POST /order: 3,500/10s burst, 60/s sustained). Auth flow: L0 public reads, L1 EIP-712 wallet signing to derive API creds, L2 HMAC for orders. **signature_type**: 0=EOA, 1=Magic/email proxy, 2=Gnosis Safe proxy. **Watch py-clob-client-v2** (staged for V2 migration).

**Gamma API** (`gamma-api.polymarket.com`, public, no auth, REST-only): endpoints for `/markets`, `/events`, `/tags`, `/search`. Filter by `active`, `closed`, `liquidity_num_min/max`, `volume_num_min/max`, `end_date_min/max`, `order=volume24hr`. Pagination offset/limit, max ~500. Rate limits: `/markets` 300/10s (tightest). **Real-time via CLOB WS** `wss://ws-subscriptions-clob.polymarket.com/ws/market` (book) + `/ws/user` (auth fills); PING every 10s; WS does not count against REST limits. **RTDS** `wss://ws-live-data.polymarket.com` streams Chainlink/Binance prices; PING every 5s.

**USDC status — actively migrating:** Pre-Feb 2026 was USDC.e (bridged, `0x2791...4174`). Feb 5 2026 Polymarket+Circle announced native USDC migration. **April 6 2026 announcement: Polymarket USD (pUSD) as new wrapper token, 1:1 backed by native USDC, issued by Polymarket.** Rollout "2-3 weeks" from April 6 — you are mid-cutover. **Implications:** don't hardcode USDC.e address; call Collateral Onramp's `wrap()` to convert; re-approve V2 Exchange contracts when addresses publish; all pending orders cancel during maintenance; pUSD decimals presumed 6.

**Gasless mechanics:** Safe proxy wallet model — signer EOA signs but funder (proxy) owns USDC and CTF ERC-1155 positions; you must pass `funder=<proxy_address>` alongside `key=<PK>`. Known gotchas: (1) Must approve all 3 exchange contracts for both USDC and CTF (main, neg-risk, neg-risk adapter — partial approval = silent sell failures per #287/#290); (2) Send USDC to FUNDER (proxy), not signer EOA; (3) Builder Relayer Client for truly gasless is **TypeScript-only** — Python operators typically use EOA directly and pay ~$0.002/tx Polygon gas; (4) Clock drift >30s breaks HMAC auth — run NTP on Hetzner; (5) Do one UI trade first to seed Safe-side approvals (per warproxxx).

**Top 5 OSS bots to fork or read:** (1) **Polymarket/agents** (~1.3k stars, MIT, Python) — official reference; fork `gamma.py` and `polymarket.py`. (2) **warproxxx/poly-maker** — market-maker reference with poly_merger util; **author says not profitable, read don't run**. (3) **guberm/polymarket-bot** — cleanest small-footprint architecture, Kelly sizing, cooldowns, ghost-position detection, dry-run mode — **best fork candidate**. (4) **Drakkar-Software/OctoBot-Prediction-Market** — dashboarded, self-custodial, heavier but full-featured. (5) **GiordanoSouza/polymarket-copy-trading-bot** — copy-trading template. **Avoid**: any repo with 15× keyword-spam titles, the hijacked `dev-protocol` org family, and all `Bolymarket/*`, `Poly-Tutor/*`, `Gabagool2-2/*` SEO-spam forks.

---

## Section H — Risk and regulatory

**TL;DR: Overall YELLOW for a <$100/trade US operator, leaning green on federal regulation, red on oracle risk for ambiguous markets.** Confidence: High on federal status; Medium on Third Circuit ruling details.

**Regulatory timeline:** Jan 2022 CFTC $1.4M settlement → Nov 2024 FBI raid on Coplan → **July 2025 DOJ and CFTC close investigations, no charges filed** → July 2025 Polymarket acquires QCX/QC Clearing for $112M → Sept 3 2025 CFTC DMO no-action letter → Oct 2025 ICE $2B investment at $8B pre-money → **Nov 25 2025 CFTC Amended Order of Designation** (intermediated DCM via FCMs) → Dec 3 2025 Polymarket US launches invite-only KYC+SSN waitlist → Jan 2026 NV Gaming Control Board + TN shutdown orders + Portugal + Hungary bans → Mar 2026 Point72/Balyasny ban personal Kalshi/Polymarket trading → **Apr 6 2026 Third Circuit ruling** reportedly exempts sports prediction contracts as swaps from state laws (single-source, verify directly) → Apr 15 2026 CFTC signals it "will no longer remain passive" against state challenges.

**For the US solo operator:** International Polymarket is IP-geoblocked and ToS-prohibited; VPN circumvention is ToS violation and arguably breaches the 2022 consent order. **Polymarket US is the only legal path** — invite-only waitlist (Q3-Q4 2026 estimated public), KYC + SSN + gov ID + proof of residency, funded via FCM (not wallet). **Kalshi is the cleaner regulatory story** (CFTC-regulated DCM since inception, fully open US, $22B valuation March 2026) and runs on essentially identical contract semantics — your code is >80% portable. State risk is concentrated in sports contracts in NV, TN, MA, NJ, NY, MD, CT. **No documented enforcement against retail users or individual bots** — all action has been against the platform/operators.

**Bot blowup patterns (inferred from disputed markets, few true individual post-mortems exist):** (1) **BornTooLate.eth governance capture** on Ukraine-Trump mineral deal (March 2025): accumulated ~1.3M UMA (~$2M) to force premature "Yes" — biggest single loser ~$73k; Polymarket said "not a market failure," no refunds. (2) **Zelenskyy suit market** ($237M volume): 40+ outlets said suit, UMA ruled "No" on lack-of-credible-consensus. (3) **Sports MM fast-click losses** (anonymous Polymarket Oracle interview): ~$100k lost in 10 days on hockey from stale orders post injury reports. (4) **Sterling Crispin's "Nothing Ever Happens" bot** (April 2026) — naive buy-No at $0.65 ceiling; losing money because markets already price in the 73.3% base rate. (5) **IMDEA academic study**: ~$40M extracted by arb bots over 12 months from 86M bets — the counter-party is retail mispricing.

**USDC depeg history:** Mar 10-13 2023 SVB event, lowest ~$0.87, contagion to DAI/USDP/GUSD/TUSD, recovered in ~48h post FDIC backstop. No documented Polymarket-specific response. **USDC.e carries additional bridge and non-redeemability risk** — Circle does not directly redeem bridged tokens — but this is moot post pUSD migration. Mitigation: keep only working capital on-platform, sweep weekly, monitor Circle attestations, trigger withdrawal on >1% depeg for >10min.

**Disputed/contentious market catalog** (use as blacklist heuristic): Ukraine-Trump mineral deal, Zelenskyy suit, Barron Trump/$DJT, OceanGate Titan "found," Venezuela 2024 election, TikTok ban, ETH ETF approval, Elon DOGE exit, Ghislaine Maxwell testimony, Venezuela invasion (Jan 2026 — $87M+ unresolved + $400k insider-trading scandal), Super Bowl halftime (17/20 insider wallet), Upbit vs Coinbase FDV, Iran missile strikes (user harassment ban). **UMA governance capture economics**: UMA circulating mcap ~$44M Feb 2026, Polymarket TVL ~$330M → **15:1 payoff-to-capture ratio**. Capture is economically rational; stay out of markets where market TVL / UMA mcap > 0.1.

**Rate limits and sybil:** Official limits (3,500 orders/10s burst, 60/s sustained, 15k REST/10s) are >1,000× what your bot needs — not a concern. Enforcement is Cloudflare throttling (queued, not rejected). 5 concurrent WS connections per IP. Multi-account policy: prohibited in ToS, not strictly enforced on international, rigidly enforced on US (SSN-tied). **No documented case of Polymarket banning a user for being "too good" or "too fast"** — opposite of sportsbooks. Bans have been for (a) VPN/geo-evasion, (b) sanctioned jurisdictions, (c) harassment linked to market outcomes.

---

## Final deliverables

### (A) Top 10 changes to the spec, ranked by expected $ impact

1. **Pivot to Kalshi or wait for Polymarket US** ($$$$ impact). The international ToS blocks US operators; the US rail doesn't support Polygon/USDC. Kalshi runs >80% of the same code and has no legal ambiguity.
2. **Defer launch 4-6 weeks past April 27, 2026** until V2/pUSD migration completes. Building on USDC.e during the cutover wastes 1-2 weeks of work.
3. **Drop the 93¢ universal entry threshold**; implement category-specific: 95¢ standard (maker), 93¢ taker, 93¢ Crypto taker, 90¢ Mentions, never enter blacklisted categories (7-10 above).
4. **Reroute Layer 1 to Gemini Flash-Lite or GPT-5 Nano**, scan 8×/day not 24×/day, use Brave Search not Anthropic web_search. Saves ~$500/mo vs spec, trades 3-hour staleness for budget.
5. **Add rulebook-hunting as Strategy #1**, not near-res arb. Lowest saturation, best LLM-edge alignment, LLM-reading-intensive by nature, structurally non-HFT. You have a structural edge here that quant shops don't.
6. **Switch to maker (limit) orders wherever possible** — eliminates the taker fee (up to 1.80% peak) and earns 0.20% rebate on US venue. Single biggest lever on edge per trade.
7. **Implement Quarter Kelly with 5-10% per-market cap**, not full Kelly. Disaster losses are non-Gaussian and UMA governance-capture losses correlate.
8. **Blacklist markets where TVL/UMA_mcap > 0.1** (>$4.4M markets as of Feb 2026). Governance-capture becomes economically rational above this.
9. **Use GDELT DOC + NWS ATOM + HN Firebase SSE as detection layer**, Claude web_search only for verification. Gets sub-60-sec latency on 85% of categories.
10. **Fork guberm/polymarket-bot for architecture**, strip its LLM ensemble, copy MrFadiAi's 4-layer risk halt (5%/15%/25%/40% daily/monthly/drawdown/total). Don't write from scratch.

### (B) Go/no-go verdict on strategies in v1.0 roster

| Strategy | Verdict | Rationale |
|---|---|---|
| Near-resolution arbitrage | **GO** (with tightened thresholds) | Real edge exists but your entry thresholds are too loose post-2026 fees |
| UMA oracle lag arb | **NO-GO** | Spec confused this with Chainlink lag; both are dead/marginal |
| Cross-market statistical arb | **CONDITIONAL GO** | Requires LLM semantic matching; good fit but election-cycle dependent |
| Sports vs sportsbook | **NO-GO** for v1.0 | Requires book accounts + sub-second injury data you don't have |
| Crypto front-running | **NO-GO** | Latency-bound; you lose from Hetzner |
| LLM news synthesis standalone | **NO-GO** | Every documented attempt has lost money |
| Market making | **NO-GO** | Two 2025-26 post-mortems declare unprofitable for solos |
| Liquidity rebates | **SOFT GO** as passive overlay | ~10% APY realistic + airdrop optionality, not primary alpha |
| Rulebook hunting / dispute-arb | **STRONG GO** | **Highest-EV, lowest-saturation strategy in the research** |
| Whale copy-trading | **CONDITIONAL GO** | Basket + Claude filter only; solo copies get front-run |
| Funding/IV divergence | **NO-GO** | Out-of-scope and no strong evidence base |
| Meme/narrative momentum | **SOFT GO** as filter on other signals | Not standalone |

### (C) Top 5 strategies to ADD to the library immediately

1. **Resolution-rulebook hunting / dispute EV** — Claude Sonnet scans every newly-proposed resolution during the 2-hour UMA challenge window against market rules + live news; Opus makes dispute calls; $750 bond risk per dispute; most disputes resolve in disputer's favor per Polymarket docs. Lowest saturation, perfect LLM fit.
2. **Weather ensemble vs bucket prices** — Python + free Open-Meteo (GFS/ECMWF/UKMO) + NWS alerts + normal CDF → compare to Polymarket temperature buckets; WeatherBot.finance claims 3-8% edge on mispriced buckets; 570+ active markets; Claude parses market text to extract city/date/range correctly. 1-week build.
3. **Long-dated tail fade (risk-free rate arb)** — screen all long-dated binary markets trading above Polymarket's implicit "aliens invade"-style floor (~4%); patient capital with Claude providing fair-value reasoning; low saturation, Domer-documented.
4. **Count/word markets** (Elon tweets, Trump speech words) — trivial Python scrape of xtracker.polymarket.com + intraday pace Poisson model; Prexpect's $118k verified 11-month P&L.
5. **Earnings beat/miss divergence** — scrape Polymarket earnings markets, compare to Wall St consensus, trade direction on >20% gap; Wolfe/Bloomberg April 16 2026 identified the signal is real (44% miss hit rate vs 18% baseline).

### (D) Final LLM routing recommendation

**Recommended configuration — monthly cost ~$120-200:**

- L1 triage: **Gemini 2.5 Flash-Lite** ($0.10/$0.40), 8×/day on ~500 markets via Batch → ~$15/mo
- L2 scoring: **Haiku 4.5 extended-thinking**, aggressively cached system prompts (1-hour TTL), 8×/day on ~50 markets → ~$30/mo
- L3 deep analysis: **Opus 4.7 with 1-hour-TTL cache** on rubric + few-shot examples, 8×/day on ~5 markets → ~$50-80/mo
- Web search: **Brave Search API** ($3-5/1k), cap 1 query per Opus analysis, deduplicate by domain → ~$15/mo
- Prompt-cache Layer 1 and Layer 2 system prompts aggressively (pays back after 1 read at 23 reads/day)

**Max plan fit assessment:** Claude Max does NOT absorb this cost. Keep Max ($100/mo) only if you personally use Claude Code for development/research — it does not offset API bills. If you want an Anthropic-only cascade (Haiku→Sonnet→Opus as spec'd), budget **$640/mo at minimum** with caching+batching or **$1,330/mo without**. The $50/mo budget from the spec is infeasible for any full-fidelity cascade at 24×/day.

### (E) Single highest-confidence, lowest-complexity, least-saturated hidden gem

**Resolution-rulebook hunting / UMA challenge-window dispute arbitrage.** It has the best structural alignment with your stack: LLM text-reading is the core skill; the 2-hour UMA challenge window is too slow for HFT bots and too tedious for humans at scale; Polymarket's own docs state most disputes resolve in the disputer's favor; the $750 bond size filters out noise while staying accessible to your capital. Saturation is low because most quant bots ignore it (no latency advantage to exploit) and most manual traders ignore it (requires reading every proposal). Your Opus 4.7 at Layer 3, fed the market rules + the proposal + recent news via RSS and Brave Search, is exactly the tool this strategy needs. Expected realistic ROI: 2-5 high-confidence disputes per month × ~$500-2000 average payoff (disputer gets bond back + half proposer's bond + correct resolution of positions) minus occasional losing disputes. Defensive bonus: the same pipeline *prevents* you from holding positions through ambiguous resolutions, which is the #1 killer of near-res arb strategies. Build it first.

---

## Open questions requiring further investigation

1. **Polymarket US API parity with international** — can bots run programmatically on QCEX, or only UI? Docs not yet public for US rail.
2. **Exact pUSD contract addresses and V2 Exchange addresses** — announcement-only as of April 16, 2026; watch `@PolymarketDevs`.
3. **Real token counts in production** — 500/100 input/output for Haiku triage is a planning estimate; log real prompts on your actual data and refine cost model.
4. **Third Circuit April 6 ruling text** — single-source in trade press; verify in court record before relying for state-risk mitigation in sports markets.
5. **Exact UMA dispute success rate for rulebook-hunting** — Polymarket says "most disputed proposals resolve in favor of disputer" but no hard number is published. Build a backtest from past UMA proposals via their subgraph before sizing capital.
6. **Kalshi code portability** — 80%+ estimate; confirm with their Python SDK docs and a prototype before committing pivot.

---

## Conclusion: the reframe that actually works

The spec you presented is a well-engineered answer to the wrong question. It optimizes a 4-layer Claude cascade for a strategy library (near-res arb + LLM news synthesis) that is either saturated, fee-killed, or documented as unprofitable. The right question is: given your stack (Python + Claude + Hetzner + free data), **where does LLM text-reading have structural advantage that quant shops don't bother with and retail can't scale?** The answer is rulebook-hunting, weather-ensemble text parsing, long-dated tail fade, and count/word markets — plus near-res arb as a simple defensive floor with tightened thresholds. The research repeatedly returns the same meta-lesson: **signal quality dominates LLM quality**, paper-trading backtests lie by 90%+, and the most-documented strategies (market-making, YES+NO arb, Chainlink lag) are exactly the ones that are dead for solos in 2026. The operator who survives isn't the one with the cleverest cascade; it's the one who picks the structurally-correct strategy, ships defensively past the V2 migration window, and resolves the US legal path before ever placing a real order. Start with Kalshi while waiting for Polymarket US, fork `guberm/polymarket-bot` for architecture, implement rulebook-hunting first, and absorb the $150-250/month LLM cost as the real floor — not $50.