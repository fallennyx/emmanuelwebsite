---
title: "Unsolved Problems for an Autonomous Remote AI Agent: Consumer Devices & Automotive"
date: 2026-06-04
summary: "Exploring where an autonomous AI agent could plug into the consumer-device and automotive world — the control gaps locked behind apps and proprietary billing, and which of them are real, unsolved, and worth building."
category: research
status: shipped
tags: ["AI agents", "UI automation", "problem-finding", "consumer"]
---


**The single highest-value opportunity is a cross-device subscription auditor that can actually *execute* cancellations trapped behind Apple/Google/Roku in-app billing walls — a closed loop that today's detection-only tools (Rocket Money, banking apps) structurally cannot complete, and one that an autonomous UI-automation agent is uniquely built to solve.**

**Methodology note:** Live web search was unavailable during this research session — both the primary search tool and the delegated research subagent's tools failed to execute. The analysis below is a strategic synthesis from domain knowledge. A targeted enrichment pass did recover several verified primary-source figures (cited inline as confirmed); all remaining quantitative claims are flagged "[verify]" and must be confirmed against the named source before any decision is made. This is decision-support framing, not freshly-sourced reporting.

## TL;DR
- The three highest-pain, most-underserved, build-it-today problems are: (1) a **cross-device subscription & billing controller** that finds, audits, and *cancels* streaming/app subscriptions trapped behind in-app billing; (2) a **unified connected-car agent** that wraps fragmented, paywalled manufacturer apps (FordPass, BlueLink, OnStar, Tesla) into one control and automation layer; and (3) a **multi-network EV charging optimizer** that orchestrates accounts, sessions, and price/reliability routing across ChargePoint, EVgo, Electrify America, and Tesla.
- All three share one structural root cause — vendors deliberately silo data and control behind apps and proprietary billing, leaving no unified API — which is precisely the gap a UI-automation-plus-unofficial-API agent fills *without vendor cooperation*. That is the architectural moat.
- Willingness to pay is clearest and most proven for the subscription auditor (consumers already pay Rocket Money a cut of savings); the connected-car agent has strong daily pain plus a defensible reason to exist (automakers are actively closing official APIs); the EV charging optimizer has real pain but the thinnest direct consumer monetization and is best shipped as a feature of the car agent.

## Key Findings

1. **The "universal remote" category is functionally dead.** Logitech announced the discontinuation of the Harmony line — the category leader — on **April 16, 2021**, ceasing manufacturing while pledging to "continue to support and update the Harmony software and app" and to "support our Harmony community and new Harmony customers" (The Verge, April 16, 2021). No equivalent cloud-backed, broadly-compatible replacement has emerged; SofaBaton, SwitchBot, and Broadlink are weaker substitutes, and Home Assistant demands real technical skill. This is a durable category vacuum.

2. **Subscription fragmentation is the highest-frequency consumer money-leak.** Deloitte's **Digital Media Trends 2024** found US consumers pay for an average of **four paid streaming video services**, and that **48% of subscribers added or cancelled at least one service in the prior six months** — quantifying both fragmentation and churn. Separately, **C+R Research's 2022 Subscription Service Statistics** survey found consumers underestimate their monthly subscription spend by **$133** ($86 estimated vs. $219 actual) and that **"42% of consumers have forgotten about a subscription they are still paying for."** In-app billing lock-in (Apple App Store, Google Play, Roku) makes cancellation deliberately hard — a UI-automation agent is uniquely suited to navigate these per-platform cancellation flows, and the FTC "click-to-cancel" rule is a regulatory tailwind [verify current legal status].

3. **Smart-home interoperability remains broken despite Matter/Thread.** The Connectivity Standards Alliance released **Matter 1.0 on October 4, 2022**, but the standard and Thread have been widely criticized through 2024–2026 for buggy commissioning and fragmented border routers running separately across the Apple, Google, and Amazon ecosystems [verify with recent coverage]. The promised "everything just works together" outcome has not materialized.

4. **Parental controls have no cross-device layer.** Parents must separately configure Apple Screen Time, Google Family Link, Microsoft Family Safety (Xbox), PlayStation, Nintendo Switch Parental Controls, Roku, and YouTube — none of which sync. This is a real, underserved pain with clear willingness to pay among parents.

5. **Connected-car manufacturer apps are near-universally complained about** for reliability and especially for paywalling basic features like remote start (Toyota Remote Connect backlash; OnStar, BlueLink, and FordPass subscription tiers) [verify current pricing]. No solution serves multi-brand households.

6. **Tesla's Fleet API is closing the most "open" car platform.** Tesla's Fleet API (developer.tesla.com) now bills Discovery, Vehicle Commands, and Vehicle Data on monthly tiers with free allotments and overage charges, and requires third-party apps to migrate to OAuth-based access. This disrupted hobbyist/self-hosted tools (TeslaMate, TeslaFi) and proves that even the most developer-friendly platform is locking down — raising the value of an agent that can operate at the UI layer instead of depending on official APIs [verify exact pricing/deadlines].

7. **EV charging requires multiple apps/accounts and fails often.** J.D. Power's **2023 U.S. Electric Vehicle Experience (EVX) Public Charging Study** found roughly **1 in 5 charging visits (about 20.8%) ended without charging**, with J.D. Power noting "more than 20% of respondents… ended up not charging their vehicle… due to station outages or malfunctions." Combined with unpredictable pricing (per-kWh vs. per-minute, idle fees, membership tiers) and the messy NACS transition, "charging anxiety" is a documented and growing pain.

8. **The automaker→insurer data-sharing scandal signals consumer money loss from opaque telematics.** Kashmir Hill's New York Times report, **"Automakers Are Sharing Consumers' Driving Behavior With Insurance Companies" (March 11, 2024)**, documented GM sharing OnStar Smart Driver data with LexisNexis and Verisk, raising drivers' insurance premiums without clear consent. This is a strong signal for a *consumer-controlled*, privacy-respecting telematics agent.

9. **Small fleets (<10 vehicles) are underserved** by Samsara, Verizon Connect, and Geotab, which target enterprise buyers with per-vehicle fees, hardware costs, and multi-year contracts [verify pricing]. An agent-based, low-hardware approach could undercut them.

## Details

### Consumer space

**Subscription & billing control (strongest consumer opportunity).** The core pain is twofold: consumers cannot see every recurring charge in one place, and — more importantly — they often cannot cancel where they signed up, because Apple, Google, and Roku route billing through their own platforms and bury the cancellation path. The Deloitte and C+R data above quantify the scale: four services per household on average, 48% churning within six months, $133/month of underestimated spend, and 42% paying for something they've forgotten. Existing tools (Rocket Money/formerly Truebill, Bobby, banking app trackers) detect charges from bank statements but **cannot execute cancellations inside in-app billing flows** — they email you or, at best, negotiate. An AI agent that logs into each platform and drives the cancellation UI (including surviving the provider's retention dark-patterns) closes the loop incumbents structurally cannot. Monetization is already proven: Rocket Money takes a cut of realized savings. This is the cleanest fit of pain × willingness-to-pay × "UI automation is the literal differentiator."

**Universal remote / home-theater orchestration.** With Harmony gone (see Finding 1), no mass-market product lets you say "watch a movie" and have inputs, devices, and apps coordinate. Many TVs expose local or unofficial control surfaces — Roku ECP, LG webOS, Samsung Tizen, Android TV via ADB — that an agent could drive to rebuild Harmony's "activities" without a hardware hub. The pain is real but the buyer skews toward home-theater enthusiasts, so this is a smaller, more niche market.

**Parental controls cross-device.** The unsolved problem is a single dashboard to set and enforce screen-time and content rules across every device a child touches. No vendor will build this because each wants ecosystem lock-in. An agent that logs into each parental-control backend (Screen Time, Family Link, Microsoft Family Safety, PlayStation, Nintendo, Roku, YouTube) and applies one consistent policy is a natural fit, and parental willingness to pay for child-safety tools is historically high.

### Automotive space

**Unified connected-car agent.** Every automaker ships its own app with its own gaps: unreliable connectivity, features paywalled after a trial (remote start being the most-hated), and zero cross-brand support for multi-car households. An agent that wraps these apps/APIs into one interface — and automates routines like preconditioning the cabin, checking charge state, or locating the car — solves a daily annoyance. The defensibility argument is strong precisely because automakers are *closing* official APIs (Finding 6): a UI-automation approach that does not depend on sanctioned API access is more durable than a thin official-API wrapper that a vendor can revoke or meter.

**EV charging optimizer.** Drivers maintain accounts on multiple networks, face unpredictable pricing, and hit a ~20% session-failure rate (Finding 7). An agent that manages accounts, starts/stops sessions, routes to the cheapest reliable charger, and schedules home charging to off-peak rates targets concrete money and time loss. Consumer monetization is the weak link, so this is best built as a feature of the connected-car agent or aimed at a fleet/B2B buyer.

**Small-fleet management.** Businesses running a handful of delivery, service, or rideshare vehicles are simultaneously over-served and priced out by enterprise telematics (Finding 9). An agent-based, low-hardware solution — phone telematics plus data pulled from existing manufacturer apps — could undercut incumbents and reach a segment they ignore.

**Insurance telematics / used-car intelligence (adjacent).** The 2024 automaker-insurer scandal (Finding 8) points to a consumer-controlled telematics agent that audits or optimizes usage-based-insurance scores while keeping data under the driver's control. A used-car data aggregator (VIN history, pricing signals across Carfax/AutoCheck/KBB/CarGurus) is a second adjacency. Both have real pain but face more competition and greater data-access/regulatory risk, so they rank below the top three.

## Recommendations

**Rank #1 — Cross-device subscription auditor & autonomous canceller.** Build first. Largest addressable market, the most proven willingness to pay, and UI automation is the literal differentiator (incumbents detect but cannot cancel). Start with the top 10 streaming services and the three in-app billing platforms (Apple, Google, Roku). *Proceed-threshold:* confirm in-app cancellation flows are reliably automatable and that doing so is permissible under each platform's terms and applicable law. *Kill/pivot signal:* if platforms technically block automation or legal exposure is unacceptable, pivot to a detect-and-guide model with one-tap deep links plus negotiated cancellations.

**Rank #2 — Unified connected-car control agent.** Build second. Strong, recurring daily pain; multi-car households are wholly unserved; and the approach is defensible because automakers are closing official APIs. Start by wrapping the 3–4 highest-volume brands. *Pivot-threshold:* if UI automation against manufacturer apps proves too brittle or legally exposed, narrow to Tesla plus one other brand and pursue a power-user/enthusiast wedge (the audience already burned by the Fleet API changes).

**Rank #3 — EV charging session & price orchestrator.** Build third, or fold it into #2 as a feature rather than shipping standalone. Real pain, weak standalone monetization. *Elevate-threshold:* validate a fleet/B2B buyer willing to pay per vehicle, or strong attach to the car agent.

**Sequencing logic:** Ship #1 to build and harden the shared infrastructure all three require — secure credential vaulting, resilient UI automation, retention-flow handling, and a policy/scheduling engine — then reuse that infrastructure for #2 and #3. This converts the hardest engineering problem (robust, secure, multi-target automation) into a reusable platform.

**Fit to an AI/LLM engineer with product instincts:** All three center on (a) LLM-driven navigation of unstructured, changing UIs, (b) credential and session management, and (c) turning messy multi-vendor state into a clean unified model — squarely the skill set described, with the subscription auditor being the fastest path to a shippable, monetizable v1.

## Caveats
- **No live sources were retrieved this session.** The enrichment pass independently confirmed seven figures (cited inline: Harmony 2021 discontinuation, Deloitte 4 services / 48% churn, C+R $133 underestimate / 42% forgotten, Matter 1.0 launch date, J.D. Power ~20.8% failed charging visits, Tesla Fleet API tiered billing, and the March 2024 NYT GM/OnStar story). All remaining "[verify]" claims — current connected-car subscription pricing, Harmony cloud-service shutdown status, FTC click-to-cancel legal standing, Tesla Fleet API exact tiers/deadlines, and current Matter/Thread coverage — must be confirmed against named primary sources before acting.
- **Legal/ToS risk is the central threat to all three ideas.** Credential handling, automated cancellation, and UI scraping may violate platform terms or laws (CFAA-type exposure in the US). Diligence this per target before committing engineering; it is the most likely reason any of these could fail.
- **Brittleness cuts both ways.** UI automation breaks when vendors change interfaces, creating ongoing maintenance cost — but that same difficulty is a moat against casual competitors. Budget for continuous maintenance as a core operating cost, not an afterthought.
- **Market timing:** vendor lock-down (Tesla Fleet API, in-app billing) is intensifying, which simultaneously increases the pain (good for demand) and the adversarial risk (bad for stability). Build with the assumption that targets will actively resist automation over time.