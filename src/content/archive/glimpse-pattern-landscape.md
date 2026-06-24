---
title: "The Glimpse-Pattern Landscape: Contingency Recovery as a Venture Template"
date: 2026-04-01
summary: "A ranked survey of 25+ domains where AI can recover money on contingency — the playbook validated by Glimpse's $35M a16z Series A and what's still genuinely open."
category: research
status: shipped
tags: ["venture", "AI", "market analysis", "SaaS"]
---

# The Glimpse-pattern landscape, ranked for a solo technical founder

The Glimpse-pattern thesis — software that recovers money on contingency, replacing 25-40% specialty consulting fees with AI-native automation — is now a proven venture template, validated by Glimpse's $35M a16z-led Series A in March 2026 (TechCrunch, 3/25/26) and reinforced by SS&C's $670M acquisition of Battea Class Action Services (September 2024), CCC's ~$730M acquisition of EvolutionIQ (December 2024), and SPS Commerce's $210M acquisition of Carbon6 (February 2025). But the playbook's success has already foreclosed several lanes — healthcare RCM, sales tax compliance, e-commerce chargebacks, FBA reimbursements, residential property tax, SaaS expense optimization — while leaving five domains genuinely open for a solo technical founder: **workers' comp premium recovery, commercial lease/CAM audit, bank fee audit, telecom invoice audit (mid-market), and B2B unclaimed property**. Three additional contrarian picks — institutional securities class-action recovery, auto F&I chargeback recovery, and 340B contingency recovery — round out the top opportunities. The full landscape, ranked, follows.

## Section 1 — Executive landscape map

The table below covers all 25 named domains plus discovered additions. Leak figures are author-synthesized from cited primary sources; "feasibility" weights solo-buildability, license burden, and need for in-person sales; "composite score" combines feasibility with whitespace and exit-envelope.

| # | Domain | Annual US leak ($B) | Recovery rate | Key AI-native incumbents | Competitive state | Solo feasibility (1–10) | Composite (1–10) |
|---|---|---|---|---|---|---|---|
| 1 | Workers' comp premium audit | 2–7 | 5–15% of premium | None funded | **Open whitespace** | 9 | **9.5** |
| 2 | Commercial lease/CAM audit | 10–20 | 1–5% of OpEx | TrueLease, CAMAudit (sub-seed) | **Open whitespace** | 9 | **9.3** |
| 3 | Bank fee audit | 1–2 | 5–10% of fees | None funded | **Open whitespace** | 9 | **9.0** |
| 4 | B2B unclaimed property | 5–15 (B2B share of $70B held) | 50–95% of identified | None funded | **Open whitespace** | 9 | **8.8** |
| 5 | Telecom invoice audit (mid-market) | 10–16 | 3–8% of telecom spend | Lightyear ($79.6M, enterprise) | Single dominant + flank | 8 | **8.6** |
| 6 | Institutional class-action recovery | 1–2 unclaimed | 15–30% contingency | None (Battea→SS&C $670M) | **Open whitespace** | 8 | **8.5** |
| 7 | Utility audit (SMB/multi-loc) | 15–30 | 2–10% of utility spend | TrueMeter (early); Arcadia (enterprise) | Open below enterprise | 7 | **8.3** |
| 8 | Auto F&I chargeback recovery | 1–3 | 10–15% of F&I PVR | United Dealer Solutions only | **Open whitespace** | 8 | **8.2** |
| 9 | 340B covered-entity recovery | 5–10 (within $66B program) | 5–15% margin uplift | None | **Open whitespace** | 6 | **8.0** |
| 10 | Customs duty drawback | 50 unclaimed | 1–3% of duties | Caspian ($5.4M seed) | Open with regulatory moat | 6 | **7.8** |
| 11 | Demurrage & detention recovery | 1–4 of $12.9B | 15–30% contingency | Windward, GetNorthbound (early) | **Open whitespace** | 6 | **7.5** |
| 12 | Manufacturer rebate audit (employer-side) | 3–5 | 5–10% of rebate flow | None | Open | 6 | **7.4** |
| 13 | Workers' comp medical bill review | 1–3 | 50–60% off billed | None (Enlyte stagnant) | Open with TPA channel | 5 | **7.2** |
| 14 | Programmatic media reconciliation | 5–18 | 3% of media budget | None (Ebiquity human) | Open but buyer-locked | 5 | **7.0** |
| 15 | Trucking fuel-tax refund (off-road/PTO) | 0.3–0.8 | $2–5K/truck/year | None on contingency | **Open whitespace** | 9 | **6.9** (small TAM) |
| 16 | PBM contract audit (self-funded employer) | 5–15 | 5–15% of Rx spend | None | Open with channel friction | 5 | **6.8** |
| 17 | Apparel/electronics retail deductions | 3–8 | 5–15% recovery | None (Glimpse owns CPG) | Open adjacency | 7 | **6.7** |
| 18 | §174 retroactive R&E (post-OBBBA) | 5–10 one-time | 100% of credit | None | Time-limited window | 7 | **6.5** |
| 19 | Royalty audit (music) | 1–3 | 5–15% underpayment | Claimy (~$1.75M) | Open, narrow TAM | 7 | **6.0** |
| 20 | Govcon REA / equitable adjustment | 5–10 | 10–25% contingency | None pure-play | Open via law-firm channel | 4 | **5.8** |
| 21 | Commercial property tax (single vertical: hotels, multifamily, self-storage) | 10–30 | 10–45% reduction | Ownwell pivoting commercial | Single dominant + flank | 6 | **5.7** |
| 22 | Freight billing audit | 5–15 | 1–8% of invoice | Loop ($160M+), Augment ($110M) | Crowded | 4 | **5.0** |
| 23 | Hospital underpayments / RCM denials | 25–43 | 10–30% recovery | SmarterDx, Adonis, Akasa, Cohere, Anterior, Alaffia, Tennr (12+ funded) | **Saturated** | 2 | **4.0** |
| 24 | Sales tax compliance | 10–30 | 1–5% of remitted tax | Anrok, Numeral, Kintsugi, Avalara, Vertex | **Saturated** | 2 | **3.8** |
| 25 | Residential property tax | 5–10 | $774 avg/customer | Ownwell ($74M) dominant | **Saturated** | 3 | **3.5** |
| 26 | Cloud cost optimization | 20–60 | 15–30% recoverable | PointFive, Antimetal, Cast.AI, Sedai | **Saturated** | 3 | **3.5** |
| 27 | E-commerce chargebacks | 33–42 | 70% disputable | Chargeflow ($49M), Justt ($100M) | **Saturated** | 2 | **3.3** |
| 28 | FBA / marketplace reimbursements | 1–3 | 1–3% inv. value | GETIDA, Carbon6/SPS ($210M) | **Saturated US**, open intl | 4 | **3.2** |
| 29 | SaaS expense optimization | 40–60 | 20–30% overspend | Vendr ($156M, distress), Tropic ($67M) | **Saturated/contracting** | 2 | **3.0** |
| 30 | Construction change orders / liens | 50+ | 5–10% disputed | Clearstory ($35M), Trunk Tools ($40M+), Document Crunch (→Trimble) | **Saturated** | 2 | **2.8** |
| 31 | Parcel late-delivery refunds | 1–2 | 5–15% refund eligible | Refund Retriever, 71lbs, Reveel (legacy) | **Commoditized** | 5 | **2.5** |
| 32 | Subrogation (auto/property/WC) | 15 | 12–25% recovery | EvolutionIQ→CCC $730M | **Closed (insurer-locked)** | 1 | **2.0** |
| 33 | Ad fraud detection | 37–84 | <10% recoverable | HUMAN, DV, IAS, CHEQ | **Closed oligopoly** | 1 | **1.8** |
| 34 | ERC residual / R&D credits broad | n/a | n/a | MainStreet failed, alliantgroup raided | **Graveyard** | 1 | **1.0** |

The bottom of this table is as important as the top. **Healthcare RCM, sales tax, residential property tax, cloud cost, chargebacks, FBA, SaaS optimization, and construction recovery are demonstrably closed lanes** for a solo founder in 2026; collectively those categories absorbed over $2B of venture funding through 2024–2026 with multiple dominant winners already established.

## Section 2 — Top 10 opportunities, deep-profiled

### 1. Workers' comp premium audit recovery (composite 9.5)

**The leak.** US workers' comp net written premium was **$41.6B private + $4.7B state funds = $46.3B in 2024** per NCCI's 2025 State of the Line. Specialty premium-recovery firms (Premium Recovery Services, Colony West, AIM/cutcomp.com) cite "3 of 4 employers overcharged 5–15%" — implying **$2–7B annual recoverable overcharges**. Lookback windows are 3–10 years depending on state. AIM cumulatively claims "$30M+" in client refunds across decades. Per-customer ACV: $5K–$150K one-time recovery with recurring x-mod savings; standard contingency 25–50%.

**The current human-services industry.** **Advanced Insurance Management LLC (cutcomp.com, founded 1987)**, **Apex Services** (10-year lookback), Premium Recovery Services, Colony West, Cost Recovery Consultants Inc — all small contingency-only specialty firms running $1–10M/yr. Brokers (Marsh, Lockton, Aon, Gallagher) are structurally conflicted because carriers pay their commissions; Verisk-owned PAAS serves carriers, not employers.

**AI-native incumbents.** **Effectively none at meaningful scale.** This is the single largest open whitespace in the report. Insurance broker-tech (Newfront, Embroker, Foxquilt) doesn't focus on premium recovery; Gradient AI works carrier-side underwriting. Zero VC-funded startups attack employer-side WC premium recovery.

**Technical tractability.** **High.** NCCI x-mod calculation is deterministic; class codes are public (700+ codes); inputs are policy declarations + payroll register + loss runs — small, mostly structured data. **No license required** in most states. A solo founder can build v1 in 90 days: ingest dec page + payroll → flag misclassification + experience-mod errors → generate dispute letter to carrier. Vision-language models handle the unstructured payroll docs comfortably.

**Competitive state.** **Open whitespace.** Lifestyle-business incumbents with no tech investment.

**Defensibility.** Initial work is one-time recovery; recurring SaaS layer for ongoing audit-defense, x-mod monitoring, and policy-renewal optimization. Data moat compounds across class-code/state/industry pairs.

**Exit path.** Verisk (parent of PAAS), broker rollups (Hub International, Newfront), Origami Risk, Riskonnect. Comp set is thin but a beachhead into broader insurance-overcharge recovery (commercial property, GL, cyber) is the venture story.

**ICPs and pilot.** Three primary ICPs: (a) construction subcontractors with $5M+ payroll (highest x-mod sensitivity), (b) staffing agencies (highest classification complexity), (c) trucking/logistics (high premium volume + classification ambiguity). Reach via state contractor associations, Vistage groups, and IRMI-listed risk managers. **30-day falsification test**: pull 20 employer dec pages from public bid disclosures, run audit pipeline, demonstrate **>70% identification rate of recoverable error >$5K** — if rate is <40%, thesis fails.

**Capital to $1M ARR.** $300–500K. Commission-aligned pricing means cash conversion follows recovery (typically 6–9 months from carrier filing).

### 2. Commercial lease/CAM audit (composite 9.3)

**The leak.** US tenant CAM/OpEx overpayment estimated **$10–20B annually**. Tango Analytics and BOMA-cited figures put 40% of CAM reconciliations at materially erroneous; BDO/Deloitte historical estimates put errors at 8–15%. Contingency firms (Occupancy Cost Audit Group, KBA Lease Services, National Lease Advisors, Laurus, RE BackOffice) charge **25–40% of recovered amounts**.

**Human-services industry.** KBA Lease Services (1981), National Lease Advisors, Occupancy Cost Audit Group, Laurus, RE BackOffice — plus lease-admin practices at JLL, CBRE, Cushman, Newmark. **Crucially, software incumbents (Visual Lease, Trullion, LeaseAccelerator [acquired by insightsoftware July 2024], Occupier, Nakisa, Accruent) sell ASC 842 compliance, NOT contingency recovery.** This bifurcation is the wedge.

**AI-native incumbents.** **No funded Series A pure-play tenant-side CAM-audit startup exists as of May 2026.** The only entrants are TrueLease (beta, founder-led), CAMAudit.io (Angel Campa, $79 flat-fee, 14 deterministic detection rules), V7 Labs CAM agent demos, and RE BackOffice's blog-stage tooling. The "missing winner" signal here is unusually strong.

**Tractability.** Extremely high. Inputs are a 60-page lease PDF + 12-tab reconciliation Excel — within easy reach of Claude/GPT-4o long-context VLMs. The core 14 detection rules (gross-up applied to fixed expenses, denominator omitting vacant space, capital improvements miscategorized as repairs, management-fee base errors, base-year escalation gaming) are codifiable. Many leases prohibit contingency-based audits — TrueLease's "Data Leverage" framing (provide data to the tenant; tenant disputes themselves) is the legal workaround.

**Competitive state.** **Wide-open at the AI-native contingency tier.** Distribution moat: tenants don't realize they're overcharged; lookback windows close annually (typically 30–90-day dispute deadlines).

**Defensibility.** Multi-location tenants (national retail, restaurant chains, dental groups, healthcare clinics) are a recurring annual workflow. Data moat compounds: each lease teaches the model new clause patterns; landlord behavior patterns become predictable.

**Exit path.** JLL, CBRE, Cushman, Newmark, MRI Software, insightsoftware (parent of LeaseAccelerator), Yardi, Trimble. Visual Lease and Trullion are likely acqui-hires.

**ICPs and pilot.** (a) Multi-unit restaurant operators (50+ locations), (b) dental service organizations (DSOs) and medical groups, (c) regional retail chains. Reach via SIOR, ICSC (now Innovating Commerce Serving Communities), and ChainLinks Retail Advisors. **30-day pilot**: ingest 25 lease/reconciliation pairs from existing operator contacts; demonstrate **>$10K average recovery per location**. If average is <$3K, ROI math doesn't justify the contingency model.

**Capital to $1M ARR.** $200–400K. Lease audit work has long sales cycles (CRE buyer is conservative) but each tenant lock-in produces 5–10 leases of recurring annual reconciliation work.

### 3. Bank fee audit (composite 9.0)

**The leak.** US treasury management generates ~$20B+ in commercial bank fees; 5–10% errors = **$1–2B leak**. Redbridge claims "at least one error in one of every two invoices we audit" (HawkeyeBSB collateral).

**Human-services industry.** **Redbridge Debt & Treasury Advisory** (founded 1999, Houston/Paris, ~149 employees, **annual revenue ~$22.5M in 2025** per RocketReach). Operates HawkeyeBSB (bank fee analysis) and HawkeyeBAM (account management) on contingency + SaaS. Smaller players: NoZebra, Chatham Financial (rate/derivatives), Treasury Strategies (now Curinos).

**AI-native incumbents.** **None located.** No 2024–2026 funded startup is purpose-built for AI-native commercial bank fee audit. AI accounting startups (Numeric, DualEntry, Fieldguide, Trintech) automate close/reconciliation but do not target the contingency-fee recovery model. Redbridge itself is bolting AI onto HawkeyeBAM but remains consultant-led.

**Tractability.** **Very high.** Inputs are AFP-standard 822/EDI 820 bank account analysis statements (standardized PDFs/text) plus published bank pricing schedules. LLM extraction → rule engine → variance flagging is a clean structured-data + VLM task. **No regulatory gating.** Solo founder 90-day pilot is straightforward.

**Competitive state.** Single boutique incumbent at modest scale ($22.5M revenue), running on consultant labor. No AI-native challenger in sight.

**Defensibility.** Recurring monthly fee analysis = pure SaaS NDR shape. Each bank's pricing schedule digestion compounds; each customer adds variance patterns.

**Exit path.** **FIS, Fiserv, Jack Henry, Bottomline, Kyriba, GTreasury, Coupa.** Treasury management software vendors are natural acquirers; the Kyriba precedent (Bridgepoint, $1.2B+ valuation) is suggestive.

**ICPs and pilot.** (a) Mid-market companies with $50M–$500M revenue running multi-bank cash management, (b) PE portfolio CFOs (immediate ROI buy-in), (c) treasury-management consultancies looking for software leverage. Reach via AFP (Association for Financial Professionals) chapters and CFO peer groups (CFO Leadership Council). **30-day pilot**: ingest 6 months of analysis statements from 5 mid-market CFOs; demonstrate **>$25K identified annual recovery per company**. Below $10K, contingency math fails.

**Capital to $1M ARR.** $300–500K. Sales cycle is moderate (60–120 days), but the recurring-monthly statement cadence compresses time-to-renewal-revenue.

### 4. B2B unclaimed property recovery (composite 8.8)

**The leak.** **~$70B held by US states** (NAUPA via CNBC 2/1/23). Only ~5% of outstanding property is claimed each year. California holds ~$15B; Texas $10.5B. State returns total ~$4–4.5B annually. **The B2B sliver — corporate vendors, banks, trustees, M&A-acquired entities whose subsidiaries lost track of escheated assets — is uncontested by AI-natives.** "Heir finder" services charge up to 50% contingency though state laws often cap fees at 10–15%.

**Human-services industry.** **Keane** (founded 1949; acquired by **Sovos in 2020** alongside ETM 2019 and Booke 2020). MarketSphere. Audit Services US (claimant-side). Faegre Drinker Biddle (Delaware VDA program). Ryan LLC's Abandoned and Unclaimed Property practice. Big-4 PwC and EY. **Sovos has rolled up the holder-compliance side; B2B claimant-side recovery remains fragmented.**

**AI-native incumbents.** **None.** Some consumer-side tools (Beagle for 401(k) rollovers, MissingMoney.com aggregator) exist but no B2B pure-play.

**Tractability.** **Very high.** State unclaimed-property databases are public; MissingMoney.com is a national clearinghouse. Matching corporate subsidiaries / DBAs / historical M&A names across 50 states is fuzzy-match + entity-resolution at scale — exactly what modern embeddings + LLMs solve. **No license required.** Solo founder 90-day pilot path is strong: scan client's subsidiary list + historical DBAs across 50 state databases + federal sources (PBGC, SEC, IRS, FDIC) → file claims with auto-generated documentation.

**Competitive state.** **Open whitespace on B2B claimant side.** Crowded only on holder-compliance (Sovos dominates).

**Defensibility.** Recovery is one-time per asset, but ongoing M&A and post-merger entity reconciliation creates a recurring annual scan. Fund admin clients (PE firms with 50+ portcos) are highest LTV.

**Exit path.** Sovos (Hg-owned, $300–500M+ rev), Wolters Kluwer, Avalara/Vista, Ryan LLC, PwC.

**ICPs and pilot.** (a) PE firms with 30+ portfolio companies (multiplied subsidiary surface area), (b) Fortune 1000 finance teams post-acquisition, (c) law firms doing M&A due diligence. **30-day pilot**: scan 5 PE portfolios for unclaimed assets; identify **>$50K of recoverable property per portfolio**. Below $20K average, distribution math falters.

**Capital to $1M ARR.** $250–400K.

### 5. Telecom invoice audit — mid-market under Lightyear (composite 8.6)

**The leak.** AOTMP estimates 12–20% of enterprise telecom invoices contain billing errors; with US enterprise telecom spend at ~$80B, the leak is **$10–16B/year**. Top-tier auditors recover 3–8% of total telecom spend (BCM One). Cass processes 50M invoices/year.

**Human-services industry.** **Tangoe, Calero-MDSL, Sakon, Cass Information Systems (NASDAQ:CASS, $207M FY2025 revenue), Mindglobal, Tellennium, brightfin, Upland Cimpl** — platforms "concocted in the early days of the internet" (Lightyear's framing) running on managed services + OCR.

**AI-native incumbents.** **Lightyear (NYC)** is the planted flag: $31M Series B Nov 2024 led by Altos Ventures (Ridge, Amplo, Zigg, Susa); $79.6M total raised; 35 people; 300+ customers including Palo Alto Networks, Five Guys, Pandora, Teladoc. December 2025 launched what it calls "the first AI-native automation for telecom billing and payments across all carriers and service types." But Lightyear targets enterprise — **mid-market under Lightyear is open**.

**Tractability.** PDFs/EDI of carrier bills are highly tractable for VLMs. The hard part is the data lake of contract terms, MACDs (moves/adds/changes/disconnects), and tariff databases. Carrier integration (1,200+ providers) is the moat — but a vertical mid-market focus (e.g., multi-location restaurants, dental groups, healthcare clinics with 50–500 locations) reduces integration breadth required.

**Competitive state.** **Single dominant + flank.** Lightyear owns enterprise; legacy Tangoe/Calero are vulnerable but have entrenched relationships; mid-market is the soft underbelly.

**Defensibility.** Recurring monthly invoice audit = SaaS NDR. Carrier-tariff data accumulates.

**Exit path.** Tangoe (Marlin Equity), Calero-MDSL (Riverside), Cass, ServiceNow extending AIOps. Lightyear's success creates acqui-hire pressure on slower competitors.

**ICPs and pilot.** (a) Multi-location restaurant operators (Lightyear sweet spot, but mid-tier under 100 locations is under-served), (b) regional healthcare systems, (c) dental service organizations. **30-day pilot**: ingest 6 months of telecom invoices from 5 mid-market customers; demonstrate **>5% recoverable error rate**.

**Capital to $1M ARR.** $400–600K (more than the lighter wedges because of carrier integration breadth required).

### 6. Institutional securities class-action recovery (composite 8.5)

**The leak.** Global securities class action settlements totaled **$5.2B across 136 settlements in 2024** (Broadridge 7th Global Class Action Annual Report, Feb 2026). Stanford/Cornerstone counts $3.7B in 88 US settlements 2024. Top 2024 cases: Apple ($490M), Under Armour ($434M), Alphabet ($350M), Twitter ($809M paid). **FRT estimates $1–2B/year unclaimed by institutional non-participants.** Antitrust adjacencies: Visa/MC interchange ($5.6B, May 2024 deadline), FX/LIBOR rigging ($2.3B+ historic), Stock Loan Antitrust ($580M March 2024).

**Human-services industry.** **Battea Class Action Services** (founded 2001, Stamford) — **acquired by SS&C Technologies for ~$670M, closed Sept 30, 2024** (Sidley/PRNewswire). **Goal Group** (London 1989, ~$18.5M revenue per RocketReach). **Financial Recovery Technologies (FRT)** — owned by Cross Country Group (Wolk family). **ISS Securities Class Action Services**, **Broadridge Global Class Action Services** (NYSE:BR), Chicago Clearing Corporation, Olshan Frome Wolosky.

**AI-native incumbents.** **None.** This is a striking gap given the $670M Battea exit print. Battea built proprietary "DART" (Digital Asset Recovery Tech) for crypto class actions but pre-acquisition. No funded startup has emerged 2022–2026 specifically targeting this workflow.

**Tractability.** Mechanically: ingest custodian transaction files → match holdings to class period & cusip → compute recognized loss per court formula → file claim form → collect distribution. All structured/semi-structured data. The moat is research coverage (monitoring 100+ jurisdictions including the fast-growing European collective redress regime — over 100 active claims in 2025) and trust with custodians, not ML sophistication.

**Competitive state.** Three-firm oligopoly post-Battea consolidation; **the AI-native challenger lane is empty**. Broadridge's 2026 report flags "broker-dealers offering end-to-end claim-filing" as an emerging unbundling trend.

**Defensibility.** Recurring annual workflow — every settled case generates new claims. Custodian integrations compound. Foreign opt-in regime expertise (where incumbent firms throw headcount) is a clean LLM differentiator: long-context reasoning over multi-jurisdictional procedural rules.

**Exit path.** **Validated decisively at $670M (SS&C/Battea, ~13–15× est. revenue).** Strategic acquirers: SS&C, Broadridge, FactSet, ISS-STOXX, Apex Group, FTI, Computershare, Equiniti.

**ICPs and pilot.** (a) RIAs and family offices managing $100M–$1B AUM (under-served — incumbents focus on $5B+ institutions), (b) hedge fund administrators, (c) retirement plan trustees. **30-day pilot**: ingest 5 RIAs' historical custodian files (2018–2023), back-test against settled cases, demonstrate **>$50K average recovery per RIA**.

**Capital to $1M ARR.** $400–700K. Custodian integrations (Schwab, Fidelity, Pershing, BNY) are slow but not technically hard.

### 7. Utility audit — SMB / multi-location below Arcadia tier (composite 8.3)

**The leak.** US commercial utility spend $300B+; 2–5% bill error rate per ParsePoint; rate misclassification can add 10–20% (manufacturing on commercial vs industrial rates costs $15K/yr per real-world account at TrueMeter). Demand charges run $8–25/kW/month with **ratchet clauses** that lock in multi-year minimums most customers never realize.

**Human-services and the April 2026 consolidation.** **Arcadia acquired ENGIE Impact April 29, 2026** (Arcadia press release; Axios). Combined entity now serves 1,500+ enterprise customers (~25% of Fortune 500), manages 4.5M meters globally, processes >$30B in annual utility payments and ~$100B in utility spend / 580M MWh — Arcadia's claim of ~20% of US C&I electricity spend. ENGIE Impact's model is hybrid SaaS + service, not pure contingency. Smaller contingency firms: APTIM, Utility Cost Consultants, Utiliscape, Cost Recovery Services Inc, APPI Energy, World Energy, Ryan LLC's utility practice.

**AI-native incumbents.** **TrueMeter** is the most credible: AI energy agent that "continuously pays, audits and claims savings"; uses LLMs for tariff JSON normalization, deterministic Python for cost math, claims 99.5% bill-validation accuracy. Parsepoint, EnergyStackHub, PowerAuditor.ai, ARDEM are early-stage. **None have raised meaningful Series A on a contingency-recovery thesis.**

**Tractability.** **The LLM-tariff unlock is real.** TrueMeter's published architecture proves the working pattern: utility tariffs are hundreds of pages of legalistic text + complex tables; GPT-3.5/early-2023 LLMs hallucinated on rate tables, long-context was unreliable, structured output was brittle. GPT-4o, Claude 3.5/4, Gemini 2.0+ unlocked all three. **Utility audit is suddenly tractable in a way it wasn't in 2022.** Hard parts: 200+ utility portal integrations (the unsexy bill-PDF download problem) and per-utility deterministic calculators validated against actual bills.

**Competitive state.** Enterprise top closed (Arcadia/ENGIE Impact); SMB and mid-market multi-location (5–500 locations: restaurants, retail, dental, self-storage) is under-served. Self-serve AI-native player with low-touch sales motion can win.

**Defensibility.** Tariff-database compounding. Multi-meter customers stick (audit becomes expense management ops layer).

**Exit path.** Arcadia (now consolidator), Schneider Electric, Honeywell, Siemens, Itron, EnergyCAP/insightsoftware, Ryan LLC.

**ICPs and pilot.** Same multi-location ICPs as lease audit — natural cross-sell. **30-day pilot**: ingest 12 months of utility bills from 5 multi-location operators; **>3% identified savings rate** is the threshold.

**Capital to $1M ARR.** $500–800K (utility integration breadth pushes capital need higher).

### 8. Auto F&I chargeback recovery (composite 8.2)

**The leak.** US dealer F&I (finance & insurance) back-end profit was up 3% in 2024 but F&I cancellations cut materially into PVR (per-vehicle retail; Auto Finance News, January 2025). **JM&A says ~10–15% of GAP profit is pulled back in chargebacks**. Total addressable: $1–3B/year across ~16,800 franchised dealers.

**Human-services industry.** **United Dealer Solutions** ("Dealer Chargeback Recovery System," 2018-launched; identifies errors in ~70% of certain chargeback types reviewed); **Dealertrack Express Recoveries** (Cox Automotive); **Ikon Technologies** (non-cancellable structure plays). **Armatus Dealer Uplift** (Hunt Valley MD; 7,500+ dealers; 21,000+ approved submissions; 28 state-association endorsements; 54-person team) dominates the adjacent retail-warranty-rate uplift space but explicitly criticizes "AI-driven shortcuts" — implying emerging entrants without funding.

**AI-native incumbents.** **WarrCloud (St. Louis)** raised **$20M Series B Oct 2024 led by Centana Growth Partners** (after $6.5M Series A Nov 2023; $41.3M total per PitchBook). 500+ dealerships; PACE Awards 2025 finalist; FordDirect/MADA/AIADA partnerships. **But WarrCloud is OEM-warranty-claim processing — not F&I chargeback recovery.** That niche has no AI-native pure-play.

**Tractability.** F&I chargeback recovery is a **state-law-compiled (46 states), DMS-data + ledger + contract-date matching exercise** — exactly the kind of work an LLM agent on Auto/Mate/CDK/Reynolds DMS data could do. State-law expertise (refund mandates, cancellation rights) and dealer-association endorsements are the soft moats.

**Competitive state.** **Open whitespace** for F&I chargeback recovery and used-car warranty audit serving tier-2/tier-3 dealers under Armatus's enterprise focus.

**Defensibility.** Recurring monthly chargeback flow + DMS integration lock-in + state-law engine compounds.

**Exit path.** CDK Global (Brookfield-owned), Solera, Reynolds & Reynolds, Cox Automotive (Dealertrack), or financial buyers like Centana (already in WarrCloud). WarrCloud's $20M Series B in a "down market" demonstrates VC appetite.

**ICPs and pilot.** (a) 5–25-rooftop dealer groups (under-served by Armatus enterprise focus), (b) 20-group independent dealers, (c) used-vehicle-heavy operators. Reach via state dealer associations and 20-group meetings. **30-day pilot**: pull 6 months of F&I chargebacks from 3 dealer groups; demonstrate **>$30K monthly recoverable per rooftop**.

**Capital to $1M ARR.** $400–600K. DMS integrations are the bottleneck.

### 9. 340B covered-entity contingency recovery (composite 8.0)

**The leak.** **$66.3B in 340B drug purchases in 2023** (HRSA; +23.4% YoY); list-to-340B gap = $57.8B representing covered entity margin (Drug Channels, Oct 2024). Hospitals = 87% of purchases. **63% of audited covered entities had adverse findings in FY2023** (ADVI/HRSA), most common sanction = manufacturer repayment. Common leakage: missed referral capture (10–30% of eligible scripts uncaptured), Medicaid duplicate-discount false positives, mixed-use eligibility errors. Per-entity: a large DSH hospital might have **$5–25M/year unrecovered eligible 340B spread**.

**Human-services and incumbent software.** **Apexus** (HRSA Prime Vendor, Vizient-owned), **Sentry Data Systems** (acquired by Craneware, now Sentinel/Sentrex; KLAS reports declining customer satisfaction post-Craneware as under-investment), **Verity Solutions** (KLAS Best in Class 7×, founded 2015), **Macro Helix** (McKesson), **Wellpartner** (CVS). **Pricing is mostly flat-fee + per-script, not contingency.** Most legacy vendors are wholesaler-conflicted (Vizient/McKesson/CVS).

**AI-native incumbents.** **Essentially none of meaningful scale.** No Series A+ pure-play 340B AI company exists as of May 2026. Drug Channels has flagged data complexity (11-digit NDC matching, mixed-use accumulator logic, contract-pharmacy reconciliation) as a barrier — textbook LLM/structured-extraction problems.

**Tractability.** Requires (i) 340B OPAIS daily sync, (ii) wholesaler 852/856/810 EDI, (iii) pharmacy dispense file (NCPDP), (iv) referral capture from EHR. Doable by solo technical founder — data is mostly structured, rules are public (HRSA), market hasn't been re-platformed since the 2010s. **HIPAA exposure is moderate** because much of the work is at the NDC/financial level; HITRUST is required for hospital sales (Verity is HITRUST-certified) but not for FQHC/Ryan White/STD-clinic sales.

**Competitive state.** **Genuine whitespace.** Wholesaler-conflicted incumbents leave the independent contingency-recovery lane open. Headwind: HRSA→CMS oversight transfer proposed FY2026; manufacturer contract pharmacy restrictions (Sanofi/Novo/AstraZeneca litigation post-3rd Circuit 2023) creating regulatory volatility — but those create **buyer urgency** on audit-defense and transparency tools.

**Defensibility.** Daily/weekly script-recapture scan = recurring SaaS. State 340B transparency laws (Colorado, Ohio, Indiana, Vermont, Rhode Island 2025–26) force buyer urgency on reporting.

**Exit path.** Craneware (LSE, ~$300–400M mcap), McKesson, Cardinal, CVS, Optum Rx.

**ICPs and pilot.** (a) FQHCs and Ryan White grantees (smaller, under-served by enterprise vendors), (b) rural/critical access hospitals, (c) family planning and STD clinics. **30-day pilot**: shadow one FQHC's referral capture for 30 days; identify **>5% missed eligible scripts**.

**Capital to $1M ARR.** $500–750K. Higher because HITRUST plus pharmacy-dispense integration adds compliance load.

### 10. Customs duty drawback / Demurrage & detention recovery (composite 7.8 / 7.5)

**Drawback leak.** CBP refunds only $2–3B/year; **$50B+ eligible but unclaimed annually** (only 1–4% capture per Alteryx/Camtom). Section 301 tariffs are drawback-eligible; 2025 tariff escalations are a tailwind. CBP allows 5-year retroactive claims (19 USC 1313). **D&D leak.** FMC: shipping carriers amassed ~$12.9B in D&D charges April 2020–March 2023 (Factspan). Recoverable/disputable pool: **$1–4B/yr**.

**Human-services industry.** Drawback: Charter Brokerage, Sandler Travis & Rosenberg, J.M. Rodgers, Comstock & Holt, Tradewin (Expeditors), Livingston International. **Licensed customs brokers required for ABI/ACE filings.** D&D: Container xChange, Project44, FourKites, Shippeo offer visibility; brokers and law firms handle disputes manually.

**AI-native incumbents.** **Caspian** (San Francisco, founded 2024 by Justin Sherlock & Matt Ebeweber; **$5.4M seed July 2025 Primary Venture Partners**) — acquired its own US customs broker license + ABI drawback certification, a regulatory moat. **Pax AI** (15% higher refund claim, ABI-certified). For D&D: **Windward (NASDAQ:WNWD)** launched D&D Automation, claimed $90/container revenue uplift; **GetNorthbound.ai** stealth. **Both drawback and D&D are under-funded relative to leak size.**

**Tractability.** Drawback requires (a) customs broker license OR partnership, (b) ACE/ABI integration, (c) BOM/import-export matching across ERP. Caspian's broker-license-as-moat is the right play — **regulatory complexity is a feature for a determined founder, not a bug**. D&D requires tariff extraction (PDF-locked, customer-specific contracts) — Gen AI tariff extraction is 2024–25 vintage capability.

**Competitive state.** Drawback: open whitespace with regulatory moat. D&D: open, no clear winner.

**Exit path.** Descartes (NASDAQ:DSGX), Thomson Reuters ONESOURCE, SAP GTS, Flexport, Livingston, E2open (parent of Charter Brokerage). For D&D: Project44, FourKites, E2open.

**Constraint for solo founder:** Drawback specifically requires customs-broker partnership or license acquisition (~6–12 months timeline) — pushes this from 90-day pilot to 9-month pilot. D&D is faster but needs port-data partnerships.

## Section 3 — Regulatory shockwave map

Recent regulatory events have repeatedly created recovery surfaces. The pattern: regulation creates obligation → obligation creates errors → errors create recovery dollars → human-services firms swarm for 3–5 years → AI-natives industrialize and consolidate. The five live shockwaves:

**Wayfair (June 2018) — sales tax.** Created economic-nexus regime across 45 states; estimated $30B+ annual incremental remote-seller obligation. **State: Saturated.** Avalara taken private at $8.4B EV (Vista, October 2022); Anrok ($110M total, Khosla + Spark), Numeral ($57M total, Mayfield + Benchmark, $350M post-money), Kintsugi ($24M, Vertex). The wedge that remains is historical-refund recovery on contingency — over-collected B2B sales tax in Tennessee/Texas/NY home-rule cities — but the prime category is closed.

**CARES Act (March 2020) — ERC.** $242B issued through August 2024 per Taxpayer Advocate; IRS Sept 2023 moratorium, partial lift August 2024, OBBBA (July 4, 2025) effectively shut down new submissions. **State: Burned graveyard.** alliantgroup raided by IRS-CI May 2022; MainStreet recapitalized at sub-$200M, eventually acquired by Employer.com May 2025; ERC mills under criminal investigation. **Avoid entirely.**

**IRA (August 2022) — §179D + 45L energy credits.** §179D max deduction jumped from $1.88/sf to $5.00/sf when prevailing-wage requirements met; opened to REITs, tribes, all tax-exempt buildings. **OBBBA terminates §179D for construction beginning after June 30, 2026** — this is now a **closing window**. Engineered Tax Services and Source Advisors are the human-services dominators; PE engineer-license requirement creates a ceiling for solo founders without PE partners.

**OBBBA (July 4, 2025) — §174 R&E retroactive expensing.** Created a one-time, time-sensitive recovery opportunity for eligible small businesses to retroactively expense 2022–2024 R&E rather than amortize over 5 years. **State: Open but fast-closing.** This is a 2025–2026 launch window for a tightly-scoped tooling product (NOT a general R&D credit play, which is a graveyard).

**CMS-0057-F Prior Authorization Final Rule (effective 2026).** Mandates SLA turnaround for prior auth across MA, Medicaid, CHIP. **State: Saturated payer-side** — Cohere ($200M+), Anterior ($60M+), Humata Health (Olive successor), Infinitus ($103M voice), Thoughtful AI's PAULA. Provider-side voice automation has ~5 serious players; PA appeals (post-denial) less crowded.

**State 340B transparency laws (2025–26).** Colorado, Ohio, Indiana, Vermont, Rhode Island passing manufacturer/payer transparency requirements for 340B. **State: Open.** Reporting/audit-defense tooling has no AI-native incumbent; HRSA→CMS oversight transfer is the watch item.

**Lewandowski v. J&J (2024) ERISA fiduciary ruling.** Created board-level urgency at every Fortune 500 self-funded employer to audit PBM contracts and capture missed manufacturer rebates (PSG: only 35% of employers capture medical-benefit drug rebates). **State: Open.** No AI-native incumbent attacks PBM contract audit on contingency.

**TFTEA Modernized Drawback (Feb 2019 deadline) + 2025 tariff escalations.** Drawback regulatory complexity (19 CFR 190 + ABI/ACE) historically suppressed claim rates to 1–4% of eligible. 2025 tariff escalations under Section 301/232 dramatically expanded the addressable pool. **State: Open with regulatory moat** (Caspian's bet on owning broker license is right structural move).

## Section 4 — AI capability unlock map

The 2024–2026 capability stack made several previously-impossible recovery workflows tractable. The unlocks, mapped to newly-enabled domains:

**Long-context reasoning over regulatory text (Claude 3.5 Sonnet, GPT-4o, Gemini 1.5+).** Reliably reasoning across 200K+ tokens of utility tariff schedules, lease agreements, payer contracts, and FAR clauses became feasible only in 2024. **Newly enabled**: utility audit (TrueMeter pattern of LLM extraction → JSON normalization → deterministic calculator), commercial lease/CAM audit, govcon REA quantum analysis, payer contract underpayment detection. This is the single most important unlock for the report's top picks.

**Vision-language models on unstructured invoice/document formats (GPT-4V, Claude 3.5, Gemini multimodal).** Reading carrier-specific telecom bills, bank account analysis statements, utility bills, retailer deduction documentation, customs paperwork, EOBs/ERAs at production-grade accuracy. **Newly enabled**: telecom invoice audit (Lightyear's Dec 2025 launch), bank fee audit, freight claim recovery (Loadsure's Google Document AI case study), retailer deduction recovery (Glimpse), parcel audit modernization.

**Agentic browser automation (Anthropic Computer Use Oct 2024, OpenAI Operator Jan 2025, Browser Use, Multi-On).** Navigating government portals, payer portals, carrier portals, retailer portals, state databases. **Newly enabled**: B2B unclaimed property recovery (50-state database scanning), Glimpse-style retailer-portal automation across Walmart Retail Link / Target POL / Amazon Vendor Central / KeHE / UNFI, customs ACE filings, state UP claim filings.

**Voice agents handling phone-based dispute resolution (Infinitus, Bland AI, Vapi, ElevenLabs Conversational).** Handling carrier dispute calls, payer prior-auth phone trees, benefit verification. **Newly enabled**: prior auth recovery (Infinitus $103M, >100M minutes processed), benefit verification, demurrage/detention dispute calls with steamship lines, freight claim status calls.

**Multi-step planning over adversarial dispute processes (Claude 3.5+ tool use, GPT-4o function calling, agent frameworks).** Handling iterative back-and-forth dispute workflows where each step requires reasoning over the counterparty's last response. **Newly enabled**: chargeback recovery automation (Chargeflow at $16.4M ARR Dec 2025), workers' comp premium audit dispute escalation, lease audit landlord pushback, payer denial appeals across multiple levels.

**Entity resolution at scale (modern embeddings + LLM reasoning).** Matching corporate subsidiaries across name variants, M&A history, and DBAs against state databases / class-action settlement lists / customs records. **Newly enabled**: B2B unclaimed property recovery, institutional class-action recovery (custodian holding match against class period & cusip), subrogation defendant identification.

**Structured output reliability (JSON mode, function calling, constitutional AI).** Reliable parsing into deterministic downstream calculators rather than hallucinated arithmetic. **Newly enabled**: utility audit (the TrueMeter pattern), bank fee audit, premium audit calculation, all categories where math accuracy is non-negotiable.

The pattern: **2022's GPT-3.5 + brittle OCR could not handle any of these workflows reliably**; **2024 Claude 3.5 + agentic browsers + structured output + voice agents made them tractable**; the resulting wave of $20M–$50M Series A's in 2024–2026 reflects this unlock. The remaining whitespace exists where the unlock arrived but the venture firms haven't yet found the founders.

## Section 5 — Founder-fit ranking for the solo technical founder

The user profile — strong AI/ML and full-stack engineer, employed at a major tech company, in Bentonville Arkansas (with the underrated benefit of physical proximity to Walmart HQ and the Northwest Arkansas CPG ecosystem), no startup history, comfortable with B2B sales but no GTM cofounder, wants laptop-runnable business with no relocation, can build v1 alone in 90 days, will raise $200–500K F&F → institutional seed — narrows the top 10 considerably.

The Bentonville location is materially relevant: it's the SupplyPike / Glimpse / Confido / Revya talent pool and the natural beachhead for any retail-deduction-adjacent play. Glimpse already won CPG-grocery; SupplyPike consolidated under SPS Commerce; the **adjacent retail-deduction whitespace (apparel, beauty, electronics, healthcare distribution, foodservice, international)** is the category where physical proximity to Walmart HQ turns into customer access.

The ranked top 10, weighted as the user requested:

**1. Workers' comp premium audit recovery.** Why it fits: pure structured-data + VLM problem; no license required; small data per case (one policy/year); zero AI-native competition; 25–50% contingency industry standard; sales is one-call-close to construction subs / staffing / trucking SMBs reachable via SaaS-style outbound. **Single biggest risk**: TAM ceiling — venture-scale outcome requires expansion into broader insurance overcharge categories (property, GL, cyber). **Sequence: pilot first.**

**2. Commercial lease/CAM audit (multi-location operators).** Why it fits: VLMs solve the core PDF+reconciliation task; 14 detection rules are codifiable; multi-unit operators need recurring annual audits; Bentonville-area regional restaurant and retail chains are natural pilot customers. **Risk**: many leases prohibit contingency audits; legal positioning (TrueLease's "data leverage" frame) matters. **Sequence: pilot second or co-pilot with #1.**

**3. Bank fee audit.** Why it fits: AFP-standardized statements; deterministic rule engine; recurring SaaS NDR shape; mid-market CFO is direct buyer; clean exit path to FIS/Fiserv/Kyriba. **Risk**: long-ish sales cycle (60–120 days) and CFO buyers are conservative — needs a few brand-name early customers. **Sequence: pilot third.**

**4. B2B unclaimed property recovery.** Why it fits: public state databases; entity-resolution + agent-driven claim filing; PE portfolio CFOs are concentrated buyers (one PE firm = 30 portcos = 30 sub-customers). **Risk**: TAM at the high end is uncertain and recovery is sometimes one-time. **Sequence: layer in after #1 or #2 traction.**

**5. Telecom invoice audit (mid-market under Lightyear).** Why it fits: VLM unlock is fresh; Lightyear's enterprise focus leaves mid-market gap; multi-location operators (same ICP as #2 and #7) create cross-sell. **Risk**: carrier integration breadth is real capital pull (Lightyear has 1,200+); requires verticalized focus to keep integrations narrow. **Sequence: defer until $1M ARR on simpler wedge.**

**6. Apparel/beauty/electronics retail deduction recovery (Glimpse adjacency).** Why it fits: Bentonville location = Walmart HQ proximity = unfair customer-discovery access; Glimpse's $35M validates pattern; adjacent verticals haven't been targeted; routing-guide complexity is exactly what Glimpse-style agents solve. **Risk**: Glimpse, Confido, or SPS Revenue Recovery may extend into adjacent verticals before defensibility builds. **Sequence: this is the Bentonville-specific wildcard — explore in parallel with #1 if access exists.**

**7. Auto F&I chargeback recovery.** Why it fits: state-law-codifiable engine; DMS data is structured; dealer groups are concentrated buyers; WarrCloud's $20M Series B validates VC appetite. **Risk**: requires dealer-group physical relationships (state dealer associations, 20-group meetings) — not pure laptop-runnable. **Sequence: pursue only if user has automotive ICP access.**

**8. Institutional class-action recovery.** Why it fits: Battea's $670M exit validates math; tractable structured-data problem; recurring annual workflow. **Risk**: custodian integration trust takes years to build; institutional buyers move slowly. **Sequence: long-term play, not 90-day pilot.**

**9. 340B covered-entity contingency recovery.** Why it fits: $66B program with no AI-native incumbent; FQHCs and rural hospitals are under-served; HIPAA exposure is lighter than PHI-heavy provider work. **Risk**: HITRUST timeline (~6 months) blocks 90-day pilot; healthcare buyer trust requires credentialing. **Sequence: defer; not a 90-day-build candidate.**

**10. §174 retroactive R&E recovery (post-OBBBA).** Why it fits: clear regulatory window (closes within 18 months); narrow scope; tractable for small business clients. **Risk**: time-limited surface; not a long-term durable business. **Sequence: opportunistic side product alongside another pick.**

**Recommended sequencing for the user's specific profile.** Build the workers' comp premium audit pilot in 90 days as the wedge — it's the single most laptop-runnable, license-free, structured-data, uncrowded option in the report. Use the F&F $200–500K to get to 5 paying customers. Once early traction validates contingency-fee software economics, layer in commercial lease/CAM audit (cross-sell to multi-location operators, same buyer persona — CFO of regional chain). Defer bank fee audit, telecom audit, and unclaimed property to Series A capital, when CRM and integration capacity grows. Avoid healthcare-credentialed paths and avoid construction.

## Section 6 — Anti-recommendations

Several domains look superficially attractive but should be avoided. For each, why it appears tempting, why it actually fails, and the graveyard companies that prove it.

**ERC and broad R&D tax credits.** Appears attractive: massive dollar pools ($242B ERC issued; $14.8B/year federal R&D credit). Actually fails: IRS criminal-investigation overhang (alliantgroup raid May 2022 by IRS-CI; ERC mills under federal probe; OBBBA shut down new ERC submissions); MainStreet's down-round/recapitalization/eventual fire-sale to Employer.com (May 2025) proves the unit economics break under audit risk + payroll-integration ops burden. **Graveyards: MainStreet ($60M Series A SignalFire 2021 → fire-sale 2025), alliantgroup (raided), Synergi Partners (rolled into Equifax with limited tech leverage).** Avoid completely.

**Healthcare provider-side denials/RCM.** Appears attractive: $25.7B+ wasted on denials annually; growing to $43B by 2025 per AHA. Actually fails: 12+ funded competitors raised $20M+ rounds since 2023 (SmarterDx $71M, Adonis $94M+, Akasa $205M, Cohere $200M+, Anterior $60M+, Thoughtful $20M, Janus $74M, Codametrix $109M, Fathom Lightspeed-backed, Infinitus $103M, Alaffia $73M, Tennr $162M); R1 RCM/Cloudmed M&A baseline already at $4–9B; HFMA/Akasa April 2025 survey shows hospital pilot fatigue with cost cited as #1 obstacle. **Graveyard: Olive AI ($902M raised, $4B peak valuation, sold for parts October 2023; clearinghouse to Waystar, PA to Humata, UM to Availity).** Don't fight here without a credentialed clinical cofounder and a unique workflow wedge.

**SaaS expense optimization.** Appears attractive: $200B+ enterprise SaaS spend; 20–30% overspend rate; Vendr $156M raised at $1B+ valuation 2022. Actually fails: Vendr's two layoff rounds (May 2023 and January 2024 per CEO Ryan Neu's LinkedIn); Tropic hasn't raised since February 2022; SaaStr 2026 declared "the SaaS Rout of 2026" with software trading at a discount to S&P 500; Orlando Bravo (Thoma Bravo) publicly stated AI disruption to seat-based SaaS valuations is "very warranted" — meaning the leak Vendr/Tropic optimize is structurally **shrinking**. **Graveyard: Vendr's distressed trajectory.** The category is contracting, not maturing.

**Cloud cost optimization.** Appears attractive: 30%+ cloud waste; $200B US public cloud market. Actually fails: PointFive $36M in 18 months (Salesforce Ventures lead, Nov 2024) and Antimetal $4.3M seed (Framework, May 2023) are racing into a category where hyperscalers (AWS Cost Explorer, Azure Cost Management) are aggressively improving free native tools, and CloudHealth (VMware/Broadcom) plus Apptio Cloudability (IBM $4.6B) are entrenched. Margin compression is real. **Graveyard: in-flight, but PointFive and Antimetal will cannibalize each other.** Skip unless you have GPU-workload-specific differentiation.

**E-commerce chargebacks.** Appears attractive: $33–42B financial impact (Mastercard 2025); 70% disputable. Actually fails: Chargeflow ($49M total raised; $16.4M ARR Dec 2025) and Justt ($100M raised) own Shopify/Stripe/Klarna/Braintree integrations and 15,000+ merchant relationships. **Closed at SMB.** Enterprise CNP, gambling, crypto, BNPL friction, and ACH/A2A disputes might still be open but require non-card expertise.

**FBA/marketplace reimbursements US.** Appears attractive: 1–3% of inventory value owed back. Actually fails: GETIDA dominant; Carbon6/Seller Investigators acquired by SPS Commerce for $210M (February 2025) folded the leading roll-up into the SPS-Glimpse-adjacent retail-deduction stack. **Closed US Amazon.** International marketplaces (Mercado Libre, Shopee, Rakuten, TikTok Shop) and Walmart Marketplace shortage disputes are open but smaller-TAM.

**Construction change-order recovery and lien-rights software.** Appears attractive: $50B+ disputed change-order pool; massive industry. Actually fails: Procore acquired Levelset for $500M (Q4 2021) closing the lien-rights window; Trimble acquired Document Crunch (April 2026) closing the AI contract-review window; Clearstory has 13 of North America's 25 largest GCs and Turner enterprise rollout October 2025; Trunk Tools $40M Series B Insight-led July 2025. **Closed.** Solo founder cannot win against Procore/Trimble/Autodesk Construction Cloud distribution.

**Subrogation.** Appears attractive: $15B/year missed recoveries. Actually fails: relationship-locked to insurer customers; Equian sold to Optum for $3.2B (2019); EvolutionIQ sold to CCC for ~$730M (December 2024). **Distribution moat closed.**

**Residential property tax appeals.** Appears attractive: large-volume opportunity. Actually fails: Ownwell's $50M Series B (February 2026, $74M total raised, 1M+ appeals processed, 86% success rate, 9-state full-service coverage) dominates. **Closed.** Commercial single-vertical (hotels, multifamily, self-storage) is the remaining flank but requires real estate domain expertise.

**Parcel late-delivery refunds.** Appears attractive: $2B unclaimed annually claim. Actually fails: 15+ legacy services (Refund Retriever, 71lbs/AuditShipment, Lojistic, Reveel, Share-A-Refund, ShipMatrix) running on contingency fees compressed to 35–50% of recoveries; UPS/FedEx counter-attack via General Service Refund (GSR) waivers structurally caps the leak; TAM ceiling around $300–500M ARR. **Commoditized.**

## Section 7 — Three contrarian opportunities most underrated by mainstream investor pattern-matching

The following three picks are systematically underrated because they fail the "interesting story at a dinner party" test that VCs weight unconsciously. They are **boring, structurally uncool, and mechanically guaranteed to work** — exactly the Glimpse pattern at its purest.

### Contrarian #1: Workers' comp premium audit recovery

**Why investors are mis-pattern-matching.** VCs see "insurance" and immediately think Lemonade/Hippo/Coalition (carrier-tech), or they think subrogation (closed by Optum/CCC). They miss that **employer-side WC premium recovery** is the inverse problem from carrier underwriting and unrelated to subrogation. The category sounds like a lifestyle business because the existing incumbents (cutcomp.com, Apex Services, Premium Recovery Services) are 1980s-vintage husband-and-wife shops doing $2–10M revenue. Investors don't know it exists.

**Why it works.** $46.3B annual US WC premium pool; documented 5–15% overcharge rate per industry trade pubs; mechanically resolvable disputes via NCCI-codified processes; no license required; no insurer relationships required (employer is the buyer); structured data; deterministic math. Solo-buildable in 90 days. Once you're in the door for WC, you cross-sell broader commercial-insurance overcharge audit (commercial property, GL, cyber) — the venture-scale story.

**Defensibility.** State-by-state class-code expertise compounds into a data moat; broker partnerships (brokers can't sell this themselves due to commission conflict but can refer) compound into distribution moat.

### Contrarian #2: Bank fee audit

**Why investors are mis-pattern-matching.** Treasury management is fintech's most boring vertical; "bank fees" sounds like a $100/month consumer feature. VCs pattern-match to Mercury or Brex (banking-as-a-service) and miss that commercial bank account analysis statements are AFP-standardized PDF/EDI documents with deterministic pricing schedules — a perfect VLM-and-rules problem. Redbridge, the global incumbent, runs at ~$22.5M revenue (RocketReach 2025) with no AI-native challenger anywhere on the cap table.

**Why it works.** $20B+ commercial bank fee pool; 5–10% error rate; recurring monthly cadence drives clean SaaS NDR; mid-market CFO is direct buyer; FIS/Fiserv/Kyriba/Bottomline form a deep strategic-acquirer pool (Kyriba alone trades at $1.2B+). Solo-buildable; no license; no in-person sales required.

**Defensibility.** Bank pricing schedule database compounds; CFO trust compounds; treasury-management software integration compounds.

### Contrarian #3: Institutional securities class-action recovery

**Why investors are mis-pattern-matching.** "Class action recovery" sounds like a legal-tech category; VCs pattern-match to Ironclad (CLM), Casetext (research), or Harvey (LLM for law firms) — none of which touch the recovery workflow. The actual incumbents (Battea, Goal, FRT, Broadridge, ISS-STOXX) are **financial-services back-office firms**, not law firms — yet no fintech VC has noticed the category. Battea sold to SS&C for **$670M in September 2024 at an estimated 13–15× revenue multiple**, confirming the exit math, and yet two years later there is still **zero AI-native challenger**.

**Why it works.** $5B+ in annual settlements; $1–2B/year unclaimed by institutional non-participants; mechanically structured-data problem (custodian transactions × class period × cusip → recognized loss formula → claim form → distribution); recurring annual workflow as new cases settle; foreign opt-in regime expansion (>100 European collective claims in 2025; Australian soft class closures) is exactly the kind of multi-jurisdictional regulatory reasoning that long-context LLMs do uniquely well — incumbents handle it via headcount.

**Defensibility.** Custodian integration trust compounds; multi-jurisdictional case-monitoring data moat compounds; ISS/Broadridge are slow institutional incumbents that won't AI-rebuild from scratch — they'll acquire.

## Conclusion — what this map says that the consensus map misses

Three insights run against the dominant 2026 investor narrative.

**First, the Glimpse-pattern playbook is more replicable than the venture community has fully internalized.** Glimpse's a16z round will be read as "the category is closed"; it should be read as "the playbook is proven." The same architecture — agentic portal automation + VLM document understanding + ERP write-back + commission-aligned pricing — is replicable against any large, fragmented, contingency-fee leak where humans currently hop between portals and spreadsheets. The under-attacked targets are workers' comp premium recovery, commercial lease audit, bank fee audit, B2B unclaimed property, and institutional class-action recovery — none of which appear in the dominant healthcare/SaaS/cloud/chargeback pattern of 2024–2026 venture funding.

**Second, the 2024 LLM-over-regulatory-text unlock has not yet been priced into all the categories it actually opens.** Long-context reasoning over utility tariff schedules, payer contracts, lease agreements, and FAR clauses became reliable only with Claude 3.5 Sonnet, GPT-4o, and Gemini 1.5+. TrueMeter's published architecture (LLM extraction → JSON normalization → deterministic calculator → human-in-loop) is the working pattern, but only utility audit and lease audit have credible AI-native entrants — and neither has a Series A. The 18–24-month window before well-funded competitors plant flags is genuinely open.

**Third, the durable solo-founder recipe in 2026 is contingency-aligned pricing on a structured-data wedge in an industry with a sleepy 30-year-old human-services incumbent.** Workers' comp premium audit, bank fee audit, B2B unclaimed property, and commercial lease audit each fit this template precisely. None require a credentialed cofounder, none require relocation from Bentonville, and each has a 90-day v1 path with current AI tools. The user's profile fits the workers' comp opportunity most cleanly — small data per case, no license, zero AI-native competition, deterministic NCCI math, 25–50% contingency industry standard — and that should be the 90-day pilot.

The graveyard signals are equally clear: ERC, broad R&D credits, healthcare RCM denials, SaaS expense optimization, residential property tax, US Amazon FBA, e-commerce chargebacks, construction change orders, parcel refunds, subrogation, and ad fraud are demonstrably closed. The single biggest mistake a 2026 founder can make is targeting a category whose 2024 venture funding burst already produced multiple $20M+ winners — and the second biggest mistake is targeting a regulatory window (ERC) whose enforcement environment has turned criminal. Pick the boring open lane, not the exciting closed one.