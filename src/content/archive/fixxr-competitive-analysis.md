---
title: "Fixxr Competitive Teardown: AI Car Repair in a Startup Graveyard"
date: 2026-06-25
summary: "A venture-grade competitive teardown of Fixxr, an AI car-repair startup I was weighing joining. The due diligence I'd want before betting my time on a team: where the category's graveyard is, what the real differentiated wedge is, and whether the traction holds up."
category: research
status: shipped
tags: ["venture", "competitive analysis", "AI", "automotive"]
---

# Competitive Market Research Memo: Fixxr (fixxr.repair)
*AI-powered car repair app — investor-grade competitive analysis · prepared June 20, 2026*

## TL;DR
- **Fixxr is a pre-seed, effectively solo-founder consumer app (iOS launched July 15, 2025) with negligible traction (5.0★ from 21 App Store ratings; "100+" Google Play downloads as of June 2026) and NO verifiable outside funding** — it is entering one of the most well-documented startup graveyards in consumer tech (Openbay, YourMechanic, Wrench, RepairSmith all struggled or were absorbed), but its specific wedge — AI quote-fairness grading + AI video diagnostic owning the lowest-trust consumer moment — is genuinely under-occupied by incumbents.
- **The market's center of gravity has shifted to shop-side SaaS (Tekmetric, Shopmonkey, AutoLeap) and fleet/insurance repair management (ServiceUp raised $55M Series B on July 9, 2025), not consumer marketplaces** — the consumer side has consolidated into Yelp (which bought RepairPal for ~$80M, completed Nov 26, 2024) and CarAdvise (~27,000 shops, bootstrapped, ~$4.1M revenue).
- **Verdict: Fixxr is differentiated on its AI wedge but structurally exposed on the two-sided marketplace it bolts that wedge onto.** Worth joining only as a high-risk pre-seed bet on the founder/wedge; the investor story requires retention and shop-monetization evidence that does not yet exist publicly; product should be built where consumer trust is lowest (the quote/estimate moment) and where no incumbent has a defensible product.

---

## Key Findings

1. **Fixxr is real, live, and extremely early.** The iOS app "Fixxr: Car Repair & Diagnostic" (developer Colton McComas / Fixxr Technologies, Inc.) shows a 5.0 rating from 21 ratings on the US App Store (June 2026); Google Play shows "100+" downloads. Some App Store variants display Apple's note: "This app has not received enough ratings or reviews to display an overview." These are launch-stage numbers, not validated traction.

2. **No verifiable outside funding exists for McComas's Fixxr.** Crunchbase / PitchBook / CB Insights "Fixxr" entries refer to an **unrelated South African mobile-mechanic company** (founded 2018 by Curtis Young, ~$300K from IBM). McComas's company is Charlotte, NC–based and appears only in NC startup-showcase press (GrepBeat; NC TECH "TechFest North Carolina," May 15, 2026; Grep-a-Palooza pitch competition, May–June 2026). Funding, team size, and incorporation state/date: **NOT FOUND.**

3. **The founder's "mechanical engineer" claim is self-asserted only.** His LinkedIn headline reads "Entrepreneur | Mechanical Engineer," but no independent source (university, degree, year) confirms an ME degree. Prior companies / work history: **NOT FOUND.** This credential should be verified directly before any reliance.

4. **The consumer auto-repair marketplace category is a graveyard.** Openbay (founded 2011/2012, ~$16.4M raised incl. GV, a16z seed, Shell) never scaled and pivoted to SaaS chat; YourMechanic (~$40–50M raised) was absorbed by Wrench (June 2022); Wrench itself shows a ~96% YoY headcount collapse to ~1 employee per Tracxn (mid-2024); RepairSmith was bought by AutoNation for $190M (completed Jan 2023) and folded into AutoNation Mobile Service. RepairPal (founded 2007) survived only by becoming a certified-network/lead-gen business and sold to Yelp.

5. **Where the money is now: shop SaaS and fleet/insurance repair management, not consumer apps.** Shopmonkey raised $110M total (founded 2016); AutoLeap raised ~$54M (Series B $30M, April 2023); Tekmetric is backed by Susquehanna Growth Equity and serves ~3,000 shops; ServiceUp raised $55M Series B (July 9, 2025; ~$70M total).

6. **The "data moat" thesis is dangerous.** Connected-vehicle data companies Wejo (SPAC, ~$800M peak valuation; just $8.4M net revenue in 2022 against a $159.3M net loss; entered UK administration 2023) and Otonomo (acquired by Urgent.ly Feb 2023 for ~$270M, down from a ~$1.4B 2021 valuation) both collapsed because nobody would pay enough for vehicle data. Smartcar survives as a developer API (~$36M+ raised) but is infrastructure, not a repair business.

7. **Consumer trust is structurally low — Fixxr's core opportunity.** In a ConsumerAffairs survey of 1,000 US drivers (August 2023, Pollfish, ±4 pts), "Over 3 in 4 (78%) drivers… said they don't always trust their mechanics" and only 17% felt they're always charged fairly. Jerry's survey of 1,431 US vehicle owners (May 2023) found "nearly 9 of 10 say they've been overcharged or may have been overcharged at one time, and more than half say they've probably paid for a service they didn't need." AAA (Dec. 1, 2016) found two of three drivers distrust shops, with "one-third of U.S. drivers — 75 million motorists in total — [having] yet to find a trusted repair facility." No incumbent owns the "is this quote fair?" moment well.

---

## Details

### SECTION 1: FIXXR DEEP PROFILE

**Corporate / founding.** Legal entity: **Fixxr Technologies, Inc.**, Charlotte, NC (confirmed as seller/developer on Apple App Store and Google Play). iOS launch **July 15, 2025** (App Store version history shows v1.0 on 07/15/2025; current build 2.0.6 as of mid-June 2026). Android live (com.fixeranalyzer.fixxer). Founder: **Colton McComas** (also developer of record). Team size: **NOT FOUND.** Incorporation state/date: **NOT FOUND.** Funding: **NOT FOUND** (no verifiable round; database entries are a different company).

**Founder background.** Colton McComas; LinkedIn headline "Entrepreneur | Mechanical Engineer." Independent verification of a mechanical engineering degree: **NOT FOUND.** Prior companies / work history: **NOT FOUND.** Press is limited to NC startup showcases (GrepBeat; NC TECH, May 2026), where Fixxr was described as "offering AI-driven automotive repair solutions specifically aimed at restoring trust between drivers and shops." NC TECH's profile: "Fixxr is an AI-powered mobile app that helps car owners navigate repairs with confidence… most drivers don't know if they're being overcharged or what they're actually paying for at a repair shop."

**Feature set (verified from fixxr.repair and app stores).**
- **AI Quote Scanner** — scans a repair quote, reads parts/labor/fees, compares to "industry standards" / "local averages," flags inflated pricing, and gives a fairness rating with "negotiation recommendations."
- **AI Video Diagnostic** — user records a short video / describes symptoms; ML "detects and matches patterns of common mechanical issues."
- **Recall checker** — manufacturer recall alerts.
- **Maintenance reminders / scheduling.**
- **Two-sided marketplace** — driver submits a repair request; nearby shops respond with estimates; driver chooses. Fixxr is **NOT in the payment flow** ("Customers pay your shop directly—Fixxr is not involved in the transaction").
- **Shop-side web portal** (marketplace.fixxr.repair) — lead-gen dashboard. Per the site, **NO POS/DVI integration yet** ("Not yet, but integrations are on our roadmap").

**Pricing (verified).**
- **Consumer** (App Store in-app purchases): Monthly Plan **$4.99**; Yearly / "1-Year Access to Premium Tools" **$24.99**; Fixxr Credits Pack (2) $1.99, (5) $3.99. Quote analysis + sending to shops is free for drivers.
- **Shop side:** "Early Access" **$99/mo**, struck through from **$199/mo**. "No contracts. Cancel anytime." The shop FAQ separately says "Pricing coming soon," indicating shop monetization is **not finalized**.

**Business model today.** Two thin revenue lines: (1) consumer freemium subscription/credits; (2) shop SaaS/lead-gen subscription (~$99/mo early access). No payment take-rate (off-platform payments). No data-monetization revenue evident. Revenue figures: **NOT FOUND.**

**App store sentiment (paraphrased from visible US App Store reviews — all 5-star, March–June 2025).** Praise centers on: cross-referencing quotes to avoid overpaying ("cross referencing my quote for me so I don't have to drive all around town"); the AI diagnostic helping non-experts ("the AI diagnostic has helped me make the correct fixes again and again while saving money"); avoiding scams ("I can't stand getting scammed and now I don't anymore"); and quote analysis with "a pricing assessment, and negotiation recommendations." **No substantive negative reviews are visible** — consistent with a tiny, early, possibly friends-and-family review base rather than validated market sentiment. Complaints: NOT FOUND (none visible), which is itself a signal of immaturity, not quality.

### SECTION 2: COMPETITIVE MAP

**Consumer-facing & marketplace**

- **RepairPal** — Founded 2007. Acquired by Yelp; per Yelp's Q3 2024 8-K (Nov. 7, 2024), the agreement was to "acquire RepairPal, an auto services platform, for approximately $80 million in cash"; completed Nov. 26, 2024 ($81.2M per MarketScreener). RepairPal "generated approximately $30 million in revenue and was approximately breakeven" over the twelve months ended Aug. 31, 2024. Model: certified-shop network + fair-price estimator + lead gen; partners include CarMax, USAA, Endurance. Trajectory: absorbed into Yelp's auto-services advertising vertical (~$90M annualized at acquisition). **This is the single most direct strategic threat to Fixxr's "fair price" positioning — now backed by Yelp's traffic.**

- **CarAdvise** — Founded 2016, Chicago. Bootstrapped; ~$200K seed (IU Angel Network / IU Ventures, 2020). ~27,000 shops integrated; ~$4.1M revenue (2024, GetLatka); ~36 employees. CEO Keagan Russo. Model: marketplace with in-app booking, approval, and payment + fleet discounts; partners with USAA, Uber, Shell, DoorDash. Trajectory: growing slowly, fleet-focused. **Has the booking-and-pay flow Fixxr lacks.**

- **Openbay** — Founded 2011/2012, Cambridge MA. ~$16.4M raised (GV, a16z seed, Shell Ventures, Stage 1); revenue ~$3.8M; ~19–26 employees. Pivoted from consumer marketplace to "Openbay Otis" AI chat SaaS + Openbay+ insurance partnerships (MAPFRE). Trajectory: flat/low activity. A cautionary tale of marketplace failure.

- **YourMechanic** — Founded 2012, Mountain View. ~$40–50M raised (a16z, SoftBank, YC). Acquired by Wrench June 2022. Mobile-mechanic model.

- **Wrench** — Founded 2015, Seattle. ~$77–125M raised (Bridgestone, Parkway, Marubeni). Acquired YourMechanic (2022) and Lemon Squad (2020). Tracxn lists ~1 employee as of mid-2024 (a 96% YoY headcount decline) — signals severe contraction. Mobile mechanic + fleet.

- **ServiceUp** — Founded 2021, Los Gatos. **$55M Series B led by PeakSpan Capital, announced July 9, 2025; ~$70M total** (Tiger Global led $14.5M Series A 2022; Hearst Ventures, Trestle, Capital Midwest, Litquidity). 180% YoY revenue growth (2024); 63 employees; >50 customers (Zipcar, Clearcover, Kyte). Reduces repair cycle times >30%. Pivoted from consumer to B2B fleet/insurer repair management. CEO Brett Carlson: "We're not here to slightly improve vehicle repair management. We're rebuilding it from the ground up." **This is the category's current momentum leader.**

- **RepairSmith / AutoNation Mobile Service** — RepairSmith founded LA; acquired by AutoNation for **$190M** (announced Dec 2022, completed Jan 26, 2023), rebranded AutoNation Mobile Service. Mobile repair.

- **Roadside-adjacent:** Urgent.ly (acquired Otonomo Feb 2023, ~$270M, via reverse merger), HONK (AI roadside/accident management), Curbside SOS — roadside/towing, tangential to repair.

**AI quote-analysis / AI-diagnostic apps (Fixxr's core wedge — the real competitive set)**

- **MECH AI** (MECH.AI LLC) — closest direct competitor. AI mechanic chat + guided OBD2 diagnostics, vehicle health score, parts finder (Amazon/eBay/RockAuto), TSBs/recalls, wiring diagrams. Pricing: Free tier (5 messages/day); DIY $7.99/mo; Mechanic/Shop Pro tiers. Multi-language. Consumer + pro. **NO quote-fairness scanner and NO two-sided shop marketplace** — the key gap Fixxr fills relative to MECH AI.
- **OBDAI ("ARIA")** — AI OBD2 scanner app; autonomous diagnostics, persistent vehicle memory, branded PDF reports + estimate builder for pros. Requires OBD hardware/data. No quote-fairness or marketplace.
- **DriveVerse** — "AI Car Diagnostics," diagnoses car sounds with AI (listed by Apple as a Fixxr "you might also like" peer). Early.
- **Sparq** — AI automotive-diagnostics startup (covered by Supercar Blondie, 2025/2026); founders Codrin Cobzaru & Daniel Nieh. Diagnostics + predictive.
- **Mastertech.ai** — shop-facing AI estimate/diagnostic tool using OEM service data.
- **None of these combine AI quote-fairness grading + AI video diagnostic + a two-sided shop marketplace.** Fixxr's specific *combination* is, as of mid-2026, not replicated by a named, funded competitor. But the individual components are increasingly commoditized (any LLM wrapper can grade a quote).

**Shop-side SMS / CRM**

- **Tekmetric** — Founded 2015, Houston. Backed by Susquehanna Growth Equity (Mar 2022). ~3,000 shops; ~$15M revenue (2024, GetLatka). Acquired ShopGenie (Oct 2024). Integrated payments; ~30 integration partners (RepairLink, Affirm, Carfax). Pricing ~$179/mo entry. API: yes (integration partner network). Strong multi-location product.
- **Shopmonkey** — Founded 2016. **$110M total** (Series C $75M, ICONIQ, 2021; Bessemer, Index). ~5,000–6,000 shops (~2% of ~230,000 US shops). ARR ~$45M (2023, Sacra est.). Pricing $179–$400+/mo + 2.5–2.9% payment processing. Affirm BNPL partnership (2025). All-in-one cloud; API/integrations available.
- **AutoLeap** — Founded 2019, Toronto. ~$54M total (Series B **$30M**, April 2023, Advance Venture Partners; Bain Capital Ventures, Threshold). ~199 employees; ~$27M revenue (reported). Pricing ~$199/mo. Marketing + fleet tools + AI receptionist ("AIR"); parts integrations (AutoZone, Parts Authority).
- **Shop-Ware** — Founded 2013. ~$15M (Insight Partners). Multi-location/B2B; notably **NO integrated payments**.
- **Mitchell 1** — Incumbent (origins 1918), part of Total Shop Solutions. Manager SE + ProDemand repair data. Legacy.
- **NAPA TRACS** — NAPA-ecosystem SMS; parts-ordering integration; lacks all-in-one comms/DVI without integrations.
- **Identifix / Shop Manager** — repair-data + shop management (Solera-owned); integrates with Mitchell1 ProDemand.
- **R.O. Writer, Protractor, RepairShopr/Workshop** — legacy/SMB SMS tools.
- **Recent M&A/funding momentum:** ServiceUp $55M (2025); Tekmetric–ShopGenie (2024); Fullbay raised (July 2024); consolidation accelerating. The broader auto repair software market is projected at ~$4.5B (2024) → ~$8B by 2032 (HTF, 10% CAGR — **projected**).

**Automotive data / telematics (data-moat comps)**

- **Wejo** — Founded 2013/2014. SPAC Nov 2021 at ~$800M; GM largest shareholder. Per its 2022 10-K, just **$8.4M net revenue** (up 227% YoY) against a **$159.3M net loss**; shares peaked at $11.38 on Nov. 19, 2021; entered UK administration May 2023; delisted; valuation <$10M. Cautionary.
- **Otonomo** — Acquired by Urgent.ly Feb 2023 for ~$270M (down from ~$1.4B 2021 valuation). Combined Otonomo+Wejo 2022 revenue: ~$15M against >$250M opex.
- **Smartcar** — Founded 2014/2015. ~$36M+ raised (Series B $24M, 2022, Energize Ventures, a16z, NEA). Developer API across 40+ automakers; **infrastructure, not a repair business.** Survives.
- **CerebrumX, Caruso, High Mobility** — connected-vehicle data/API players; smaller, B2B infrastructure.
- **Who buys repair/vehicle-health data:** insurers (UBI), fleets, EV-charging/utilities, road-usage-charge programs, parts marketers. Price points are opaque and, per the Wejo/Otonomo collapses, far lower than the "$750B by 2030" McKinsey projection implied. The data-monetization market is real but has repeatedly failed to pay startups enough to survive.

### SECTION 3: MARKET SHARE & WHO'S WINNING

**Consumer apps by real traction:** CarAdvise (~27,000 shops, real booking/pay, fleet partners) and RepairPal/Yelp (now traffic-advantaged) are the only consumer-side players with genuine scale. Wrench/YourMechanic contracted; Openbay flat. AI-diagnostic apps (MECH AI, OBDAI) are growing off small bases. Fixxr is sub-scale (tens of ratings). Precise MAU/download rankings: NOT FOUND (app-intelligence data behind paywalls), but the order of magnitude is clear.

**Shop SMS by share:** Shopmonkey (~5,000–6,000 shops) and Tekmetric (~3,000) lead the modern-cloud cohort; AutoLeap is growing fast; all against a ~230,000–300,000 US shop TAM, so penetration is still low single digits — the shop side remains contestable.

**Genuinely "popping" (2025–2026):** ServiceUp ($55M, fleet/insurer repair mgmt) is the clearest momentum story; AutoLeap and Tekmetric continue strong shop-SaaS growth; AI diagnostic apps are a rising sub-category. **The consumer marketplace is NOT popping.**

**TAM/SAM/SOM (reported vs. projected — flagged):**
- **US auto repair/service market (ACTUAL/base):** Mordor Intelligence estimates US automotive service at ~$199.4B (2025) → ~$211.1B (2026 est.). A narrower "general automotive repair" figure is ~$59.8B (2025, projected). The US had ~239,100 repair establishments (2021, Statista-cited) employing ~590,000+ technicians. Two-thirds of Americans don't trust repair shops; average repair spend ~$548 (KBB-cited).
- **US auto service (PROJECTED):** Mordor projects ~$281B by 2031 (5.9% CAGR); Technavio projects +$91.27B growth 2025–2030 (9.3% CAGR). Global auto repair: ~$890.82B (2024, Astute Analytica) → ~$1,666B by 2033 (PROJECTED).
- **Auto repair software (PROJECTED):** ~$4.5B (2024) → ~$8B by 2032 (HTF, 10% CAGR).
- **Automotive data monetization (PROJECTED, historically unreliable):** McKinsey's oft-cited ~$450–750B by 2030 figure is a projection that the Wejo/Otonomo failures directly contradict in practice.

### SECTION 4: WHITE SPACE ANALYSIS

**Does any product combine all six layers (AI quote analysis + AI diagnostic + two-sided marketplace + shop CRM + on-platform payment + data layer)?** No. The map:
- **AI quote analysis:** Fixxr, MECH AI (partial), nascent LLM tools.
- **AI diagnostic:** MECH AI, OBDAI, Sparq, DriveVerse, Fixxr.
- **Two-sided marketplace:** CarAdvise, RepairPal/Yelp (dead/contracted: Openbay, Wrench).
- **Shop CRM/SMS:** Tekmetric, Shopmonkey, AutoLeap, Shop-Ware, Mitchell 1, NAPA TRACS.
- **On-platform payment:** Shopmonkey, Tekmetric, CarAdvise (consumer). Fixxr does NOT take payment.
- **Data layer:** Smartcar (infra); failed Wejo/Otonomo.

**No single player owns the full stack.** That is the theoretical white space — but it is empty largely because each layer is hard and the unit economics of stitching them together for consumers have repeatedly failed.

**Where consumer trust is lowest / who owns that moment:** The lowest-trust moment is receiving a repair estimate and not knowing if it's fair (Jerry: 65% frustrated by lack of pricing transparency; only ~28% research online). **No incumbent owns this well:** RepairPal's estimator is generic and now buried in Yelp; shop SMS tools serve the shop, not the skeptical consumer. **This is precisely Fixxr's wedge — and the most defensible thing about the company.**

**What structurally kills entrants here:**
1. **Two-sided cold-start / liquidity.** Marketplaces need shops AND drivers in the same city simultaneously; Openbay, Wrench, and YourMechanic all burned capital failing to reach local liquidity.
2. **Low frequency / no retention.** Repairs happen 1–2x/year; consumer apps can't build habit, so CAC is never amortized. This killed consumer marketplaces and is Fixxr's single biggest product risk.
3. **Shops resist disintermediation and lead fees.** Shops with full bays don't want to bid; lead-gen fatigue is real (RepairPal succeeded only by becoming a trusted certification, not a bidding war).
4. **Off-platform payment = no take rate = weak economics.** Fixxr has this problem today.
5. **Trust is hard to manufacture;** incumbents (AAA, dealerships) already hold it.
6. **Data monetization doesn't pay** (Wejo/Otonomo).

**3–5 most defensible wedges available now:**
1. **Own the "is this quote fair?" moment** as a consumer trust utility (Fixxr's wedge) — but monetize via shop conversion, not subscription.
2. **AI diagnostic accuracy as a moat** — proprietary symptom→diagnosis→outcome data (MECH AI is racing here).
3. **Shop-side AI that ingests the consumer's pre-diagnosed, pre-priced job** — become the demand-gen layer feeding Tekmetric/Shopmonkey rather than competing with them.
4. **Insurance/warranty channel** (RepairPal/USAA, Openbay/MAPFRE model) — B2B2C distribution solves the cold-start.
5. **Fleet** — where ServiceUp is winning; repair management has real, recurring, monetizable demand.

### SECTION 5: VERDICT

**Differentiated or graveyard?** Both. Fixxr's *wedge* (AI quote-fairness + AI video diagnostic owning the lowest-trust consumer moment) is genuinely under-served by incumbents. But the *vehicle* it has chosen — a two-sided consumer marketplace with off-platform payments and no shop-software integration — is the exact model that has bankrupted or stranded Openbay, Wrench, and YourMechanic. The company is pre-traction, effectively unfunded, and solo-led, with a self-asserted (unverified) engineering credential.

**What would have to be true for a $200M+ outcome:**
1. The AI quote/diagnostic tools must produce *measurable* consumer savings and a retention/word-of-mouth loop that beats the 1–2x/year frequency problem (become the default "check before you pay" utility).
2. Monetization must shift from a $4.99/mo consumer subscription to a high-margin shop-conversion take-rate or a B2B2C insurance/warranty/fleet channel that solves cold-start.
3. Fixxr must either integrate with (not compete against) Tekmetric/Shopmonkey, or capture on-platform payment to earn a take rate.
4. A proprietary data asset (real quote + outcome data at scale) must accrue that LLM-wrapper competitors can't replicate.
5. Capital: it must raise a real seed round; today there is no public evidence of funding.

**Single biggest risk to the thesis:** **Low purchase frequency + commoditization of the AI wedge.** Repairs are infrequent, so consumer retention/CAC math is brutal; and "grade this quote with AI" is a feature any incumbent (or a weekend LLM build) can copy — RepairPal/Yelp, MECH AI, or a Shopmonkey could bolt it on with vastly more distribution. Without a data or distribution moat, Fixxr's wedge is a feature, not a company.

## Recommendations

**For the JOIN decision:**
- Treat this as a **high-risk pre-seed/founder bet, not a de-risked opportunity.** Join only if (a) you can verify the founder's execution ability and the "mechanical engineer" credential directly, (b) you get founder-level equity commensurate with stage risk, and (c) you have genuine conviction in the AI-trust wedge.
- **Benchmark that would flip this to "yes":** evidence of >20% month-2 retention, a paying-shop cohort renewing at the $99/mo tier, or a signed insurance/fleet channel partner.

**For the RAISE decision:**
- The investor-grade story is **NOT "another repair marketplace"** (that pattern-matches to dead companies). It is **"the consumer trust/AI layer that monetizes through shops and channels."**
- Before raising, generate: (1) cohort retention data, (2) shop conversion/take-rate evidence, (3) a defensible data-accrual narrative, (4) clear disambiguation from the South African "Fixxr" in all diligence materials.
- **Threshold:** do not raise a priced round until there is marketplace liquidity in at least 2–3 metro markets and a non-subscription revenue line.

**For the PRODUCT decision (where to win):**
1. **Double down on the quote-fairness + diagnostic utility;** make it the best "check before you pay" tool in the US.
2. **Add on-platform payment** to earn a take rate, OR pivot the shop side to an *integration/demand-gen layer* feeding incumbents' SaaS.
3. **Pursue a B2B2C channel** (insurer/warranty/fleet) to solve cold-start, copying the RepairPal–USAA and Openbay–MAPFRE playbooks.
4. **Instrument outcome data** (was the quote actually inflated? did the diagnosis match the repair?) to build the one moat LLM wrappers can't copy.
5. **De-prioritize the pure bidding marketplace** until liquidity and retention are proven.

## Caveats
- Fixxr's traction, funding, team, and incorporation data are largely **NOT FOUND** in independent sources; the company is too early to have a public record, and major databases (Crunchbase, PitchBook, CB Insights) **conflate it with an unrelated South African company of the same name** — those funding/accelerator figures must not be attributed to McComas's Fixxr. All Fixxr review sentiment is from a tiny (≈21-rating) all-positive base and should not be read as validated market sentiment. Fixxr's own site shows internally inconsistent self-reported figures ("100+ Downloads" / "4.8 Stars" on one page vs. "1k+ Drivers" / "5 Stars" elsewhere).
- The founder's "mechanical engineer" credential is self-asserted on LinkedIn and **NOT independently verified.** The July 15, 2025 iOS launch date is taken from App Store version history; broader launch claims are not independently corroborated.
- Market-size figures vary widely by source and methodology; "US auto repair" ranges from ~$60B (narrow "general repair") to ~$199–211B (broad "automotive service") to ~$890B+ (global). All CAGRs and 2030+ figures are **projections**, explicitly flagged, and should not be treated as reported fact.
- Automotive data-monetization TAM figures (McKinsey ~$750B) are projections directly contradicted by the real-world collapse of Wejo and Otonomo.
- Many competitor funding/shop-count/revenue figures come from third-party aggregators (Tracxn, GetLatka, Sacra, PitchBook/CB Insights previews) and may be estimates rather than audited; for private companies these are best-available, not confirmed. Private-company employee counts (e.g., Wrench "~1 employee") come from Tracxn and may lag reality.