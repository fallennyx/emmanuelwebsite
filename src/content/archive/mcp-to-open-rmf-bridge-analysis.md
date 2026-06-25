---
title: "MCP-to-Open-RMF: The Robotics Infrastructure Gap"
date: 2026-04-25
summary: "The original research on the robotics-fleet problem: bridging MCP to Open-RMF so an AI agent could orchestrate a heterogeneous robot fleet. An honest read on the whitespace — and why the timing matters more than the opportunity."
category: research
status: shipped
tags: ["AI", "robotics", "MCP", "infrastructure"]
---

# MCP-to-Open-RMF: whitespace exists, but the clock is louder than the opportunity

**The short answer: no one has shipped an MCP-to-Open-RMF bridge publicly, and no major AI player has demonstrated LLM-orchestrated heterogeneous robot fleets — but the installed base is too thin in 2026 to support a standalone middleware company, the moat around open+open is weak, and NVIDIA's March 2026 Isaac Mission Dispatch release already carries an "MCP" tag.** This is a real whitespace *technically* and a marginal opportunity *commercially*. The right move is not "pursue full-time" and not "don't pursue" — it is "ship OSS now, secure a Walmart design-partner pilot, re-evaluate in 12 months." Details, numbers, and a concrete go-to-market path follow.

---

## Q1 — Does a public MCP-to-Open-RMF bridge already exist?

**No. As of April 2026 there is zero public project that exposes Open-RMF's task dispatcher, `rmf-web` API, or fleet-adapter commands as an MCP server.** Exhaustive searches across GitHub, GitLab, the four MCP registries (mcp.so, smithery.ai, glama.ai, pulsemcp.com), Anthropic's directory, ROS Discourse, arxiv, and Hacker News returned no Open-RMF-specific server, no VDA 5050 bridge, and no MassRobotics MRIS bridge.

The niche is not empty of adjacent work, though. Here is the state of MCP-for-robotics as of April 2026, ranked by maturity:

| Project | Stars | Layer | Scope | Maintainer |
|---|---|---|---|---|
| **robotmcp/ros-mcp-server** | ~1,200 | Generic ROS 1/2 pub-sub, services, actions | Production-leaning, weekly releases | Contoro Inc. (industrial robotics startup) |
| **NVIDIA isaac_mission_dispatch** (v4.3.0, Mar 2026) | 94 | VDA 5050 fleet dispatch + "Mission Dispatch MCP" tag | Production, ambiguous MCP claim | NVIDIA Isaac team |
| lpigeon/unitree-go2-mcp-server | few hundred | Single-vendor quadruped nat-lang control | Hobby/viral demo | Jungsoo Lee (individual) |
| ajtudela/nav2_mcp_server | ~dozens | Nav2 navigate-to-pose, lifecycle | Hobby/research | Alberto Tudela |
| LCAS/ros2_mcp | low | ROS 2 + VLM image retrieval | Academic | Lincoln Centre for Autonomous Systems |
| wise-vision/ros2_mcp | low | ROS 2 auto-discovery | Small startup | Wise Vision |
| 6–8 other ROS 2 MCP servers | very low | Toy/educational | Hobby | Individuals |
| Universal Robots MCP (nonead, RoversX) | ~5 | Single-arm control | Small commercial demo | NONEAD Corp, individuals |

**The single most important signal: NVIDIA's Isaac Mission Dispatch 4.3.0 (released March 19, 2026) added a "Mission Dispatch MCP" update line and tagged `mcp` alongside `vda5050`.** The README does not yet document explicit MCP server schemas, so this is *not* confirmed as a full Anthropic-compliant MCP surface — but it is the clearest shot across the bow. Any founder entering this space should inspect the 4.3.0 source directly before moving. **The competitive clock is already ticking inside NVIDIA.**

The generic ROS 2 layer is also consolidating: `robotmcp/ros-mcp-server` is becoming canonical and is backed by an industrial robotics company with commercial interests in ROS. It does not know Open-RMF semantics (traffic scheduling, lifts/doors, fleet arbitration), but it does mean "LLM-drives-ROS-2" is commodity territory within 12 months.

**Bottom line on Q1:** Open-RMF-specific MCP is greenfield today. That greenfield probably closes within 6–18 months, either because NVIDIA makes its Mission Dispatch MCP claim real or because a researcher publishes the 200-line FastAPI-to-MCP wrapper on `rmf-web`'s existing OpenAPI surface.

---

## Q2 — Minimum hardware-free demo stack

**Yes, a 16 GB laptop runs the full multi-robot dispatch simulation.** The canonical stack in April 2026 is:

**Ubuntu 24.04 LTS + ROS 2 Jazzy + Open-RMF (apt binaries) + rmf_demos (source) + Gazebo Harmonic**

| Component | Minimum | Recommended |
|---|---|---|
| CPU | 4 cores x86_64 | 8 cores (i7-12th gen / Ryzen 7) |
| RAM | **16 GB** | 32 GB |
| GPU | Integrated (CPU maxes at 100%) | Discrete NVIDIA (GTX 1660+) |
| Disk | 50 GB | 100 GB NVMe |
| OS | Ubuntu 24.04 native | Ubuntu 24.04 native |

**Setup time for a Python dev new to ROS 2:** Day 1 = install + office demo running + `dispatch_patrol` working. Day 2 = rmf-web API up, understand the FastAPI schema. Day 3 = working MCP server exposing 5 tools over stdio. **Weekend build is realistic.**

The critical architectural insight: **rmf-web already ships a FastAPI server with OpenAPI docs at `localhost:8000/docs`**. That means building an MCP bridge is mechanically a FastAPI-to-MCP adapter (httpx client calling `/tasks/dispatch_task`, `/fleets/{fleet}/state`, etc.) — not a deep ROS 2 integration project. You do not need rclpy, you do not need to re-implement `rmf_traffic`, and you do not need a GPU.

The rmf_demos worlds available out-of-the-box:

| World | Launch | Use for |
|---|---|---|
| Office | `ros2 launch rmf_demos_gz office.launch.xml` | Simplest starting point; 2 robots, 1 fleet, patrol/delivery |
| **Hotel** | `hotel.launch.xml` | **Best multi-fleet demo** — 2 levels, lifts, doors, 3 fleets, 4 robots |
| Airport Terminal | `airport_terminal.launch.xml` | Large map, multiple fleets, crowd sim, Clean task |
| Clinic | `clinic.launch.xml` | 2 different fleets with distinct roles |
| Campus | `campus.launch.xml` | WGS84 outdoor planet-scale |
| Ionic Release Demo | Nav2 + MoveIt + RMF | Heaviest, closest-to-real integration |

Alternative simulators are dead-ends for this specific task: **Isaac Sim 5.1 requires an RTX 4080 / 16 GB VRAM / 32 GB RAM minimum** and has no native Open-RMF integration (NVIDIA's Mega Blueprint competes with RMF, not integrates). Webots and O3DE have no canonical Open-RMF path. **Gazebo Harmonic via rmf_demos_gz is the only practical laptop route.**

---

## Q3 — LLM-agent + robot demos from major players

**The core finding: no major commercial player has publicly demonstrated an LLM agent dispatching tasks across a heterogeneous robot fleet.** Every leading lab is running the single-robot VLA playbook. The demos cluster into four categories; the user's thesis — (c) multi-robot orchestration with natural language — is overwhelmingly served by academic papers, not commercial products.

| Company | Flagship demo | Date | Category | Single/fleet | Heterogeneous? |
|---|---|---|---|---|---|
| **Google DeepMind** | Gemini Robotics 1.5 + ER 1.5 | Sep 25, 2025 | **(b) agentic LLM orchestrator calling VLA as tool** | Single robot per demo | Cross-embodiment model, not concurrent fleet |
| Google DeepMind | AutoRT | Jan 2024 | (b/d) LLM-driven data-collection dispatcher | **Fleet (20 simultaneous, 52 total)** | **No — homogeneous office cobots** |
| Google DeepMind | Gemini Robotics (VLA) | Mar 2025 | (a) VLA | Single | Cross-embodiment (ALOHA, Franka, Apollo) |
| NVIDIA | **Mega Omniverse Blueprint** | Jan 2025 (CES) | (d) fleet *simulation* (no LLM dispatch) | Fleet | Yes in sim, but orchestrated by KION WMS, not LLM |
| NVIDIA | Isaac GR00T N1/N1.5/N1.7 | Mar 2025 → | (a) VLA foundation model | Single, cross-embodiment | No |
| Figure AI | **Helix on 2× Figure 02** | Feb 20, 2025 | (a) VLA + S2 supervisor | Multi-robot (2) | **No — homogeneous** |
| Figure AI | Helix 02 full-body | ~Jan 2026 | (a) VLA | Single | No |
| 1X | Redwood AI on NEO Gamma | Jun 2025 | (a) VLA + onboard LLM | Single | No |
| Physical Intelligence | π0 / π0.5 / π0.6 | 2024–2025 | (a) VLA | Single, cross-embodiment | No |
| Boston Dynamics | Spot + ChatGPT tour-guide | Oct 2023 | (b) LLM → Spot SDK calls | Single | No |
| Intrinsic (now Google, Feb 2026) | Flowstate + Intrinsic Vision Model | 2023–2026 | (b/d) platform for industrial cells | Single-cell mostly | Multi-arm support |
| Skild AI | Skild Brain | Jul 2025 | (a) omni-bodied model | Single | Cross-morphology model |
| Covariant | RFM-1 (Amazon acqui-hire Aug 2024) | Mar 2024 | (a/b) warehouse picking | Single | No |
| Sanctuary AI | Phoenix + Carbon | 2023–2025 | (b) hybrid symbolic + LLM + RL | Single | No |

**The three closest analogs to the user's thesis and why each falls short:**
1. **Google Gemini Robotics-ER 1.5** is the only commercial LLM that explicitly tool-calls a VLA and uses the word "orchestration." But every published demo directs one robot at a time.
2. **Figure's Helix two-humanoid demo** is the only commercial multi-robot-via-LLM demo, but both robots are identical and co-located.
3. **NVIDIA Mega** is the only commercial *fleet-scale* framework, but the orchestration brain is KION's warehouse-management software, not an LLM.

Academic literature has raced ahead: **FLEET (JHU APL, Oct 2025), RobotFleet (arXiv 2510.10379), MHRC (arXiv 2409.16030), EMOS, SwiftBot** all instantiate the user's exact thesis in research settings. The gap between those papers and a shipping commercial product is where the opportunity sits — **and it is narrowing by the quarter**.

**Verdict on Q3:** The user's thesis is genuinely uncontested commercially. It is also genuinely being attacked by every major academic robotics lab, which means a commercial incumbent is 12–24 months out.

---

## Q4 — Is there a security-industry VDA 5050 equivalent?

**No.** As of April 2026, there is no adopted technical interoperability standard for heterogeneous security/patrol robots. The industry is a proprietary silo, with ONVIF used opportunistically as a video-only common denominator.

| Standard | Body | Covers security robots? | Adoption |
|---|---|---|---|
| **VDA 5050** (v3.0, Mar 2026) | VDA/VDMA | No — intralogistics | Zero in security |
| **MassRobotics MRIS v1.0** | MassRobotics | Generic but unadopted in security | Zero |
| **ISO/FDIS 21423** | ISO TC 299 | No — industrial scope, *pre-publication* | — |
| **ONVIF Profiles S, T, G, M** | ONVIF Forum | Video only; no fleet/tasking semantics | **De facto video layer** (SMP, Spot, Ascento all ride this) |
| **SIA Autonomous Solutions WG** | SIA | Policy/best-practices only — no spec in 8 years | Active forum, zero technical output |
| **ASIS PAP.1 / PSC.1** | ASIS International | Management-process governance only | Widespread but irrelevant for interop |

**The major integrators all run proprietary silos:**
- **Knightscope**: KSOC API (proprietary, Aug 2023) + vertically-integrated managed service after March 2026 Event Risk acquisition
- **Cobalt**: one-off connectors to Genetec, Milestone, LenelS2, Brivo, Avigilon Alta, C·CURE 9000, Otis elevators, ServiceNow, Slack — each bespoke
- **ADT Commercial / EvoGuard**: explicitly stated in Dec 2023 that its 1X humanoid and Indoor Robotics drones were *not yet communicating with each other*; called out the industry's lack of standards
- **Securitas**: uses Ascento for SBB Swiss rail + proprietary SecureStat aggregation
- **SMP Robotics**: exposes the only meaningful standard surface — ONVIF Profile S/G, but for video only

**Is the market ripe for standardization?** Partially. SIA has had a working group on this since 2017 and has produced zero technical output. Unit volumes per site are tiny (1–5 robots typical, vs. dozens/hundreds of AMRs in a warehouse), so buyer pull is weak. Knightscope's move to vertical services in March 2026 is a *negative* signal — major OEMs are choosing lock-in, not openness.

**Implication for the user's thesis:** Security is **the wrong beachhead**. It is too fragmented, deployments are too small, and the economics favor bundled managed services over orchestration layers. **Hospitals and warehouses are meaningfully more ripe for the same architecture.** A security angle could work as a 2028 opportunistic extension, not as the 2026 wedge.

---

## Q5 — Who funds physical-AI infrastructure at seed?

Ranked tier list of 17 firms + Anthology Fund for middleware/infra fit:

| Tier | VC | Check size (Seed / A) | Lead partner(s) for this thesis | Key precedent |
|---|---|---|---|---|
| **1** | **Bessemer** | $3–10M / $10–30M | Alexandra Sukin, Bhavik Nagda (thesis authors); Jeremy Levine (GP) | **Led Foxglove $40M B — direct middleware precedent** |
| **1** | **Eclipse Ventures** | $2–10M / $10–50M | Jiten Behl, Lior Susan | **$1.3B physical-AI fund, April 2026** |
| **1** | **Lux Capital** | $500K–$5M / $15–30M | Grace Isford (AI agents + physical), Shahin Farshchi, Deena Shakir | Physical Intelligence, Fauna, Applied Intuition |
| **1** | **a16z American Dynamism** | $500K–$5M / $10–50M | Erin Price-Wright (AI for physical world), Ryan McEntush, Jacob Phillips, Katherine Boyle | $1.176B fund; Big Ideas 2026 named "physical observability" |
| **1** | **Construct Capital** | $2–5M / $3–6M | Dayna Grayson, Rachel Holt | **Copia Automation — closest portfolio analog** |
| 2 | Toyota Ventures / Woven | $500K–$5M / $5–100M | Jim Adler, David Chen | **Apex.AI — they literally fund middleware** |
| 2 | Playground Global | $1–5M / $5–20M | Peter Barrett | Hardware-heavy (Agility, Mytra) |
| 2 | Accel | $1–3M / $15–40M | Daniel Levine (AI infra), Sameer Gandhi | Mind Robotics co-lead, Foxglove |
| 2 | Khosla | $1–3M / $15–50M | Vinod Khosla, Samir Kaul | FieldAI, Physical Intelligence |
| 2 | Founders Fund | $100K–$2M / $5–50M | Trae Stephens, Napoleon Ta | Gecko $500M E; defense-leaning |
| 2 | Sequoia | $1–3M / $10–50M | Pat Grady, Alfred Lin, Shaun Maguire | Physical Intelligence; follows winners |
| 2 | Lightspeed | $1–5M / $20–50M | Ravi Mhatre | Led Anthropic $3.5B E |
| 3 | 8VC | $1–5M / $10–30M | Joe Lonsdale, Jake Medwell | Bedrock Robotics, Saronic |
| 3 | Root Ventures | $500K–$3M / limited | Avidan Ross, Chrissy Meyer, Kane Hsieh, Lee Edwards | Dusty, Mashgin — engineer-friendly |
| 3 | NEA | — / $10–50M | — | No visible 2025–26 thesis |
| 3 | Bedrock (Geoff Lewis) | — / $5–10M | Lewis, Stromberg | No robotics thesis; reputational caveats |
| 4 | **Deep Science Ventures** | — | — | **Skip — wrong sector, venture-creator model** |

**Anthology Fund (Menlo + Anthropic, $100M, July 2024):** Checks from $100K pre-seed to Seed/Series A lead, plus $25K Anthropic credits. No public humanoid or robot-maker bets. But Matt Murphy's stated coverage includes *both* "robotics" and "AI infrastructure (DevOps, data stack, middleware, API platforms)." **This is the single most thesis-aligned fund for an MCP-to-Open-RMF play**, and it is virtually unpitched on physical AI today. Apply directly via menlovc.com/anthology-fund; target **Matt Murphy** and **Tim Tully**. Anthropic itself has no public physical-AI investments; its strategic capital is going to compute (the $50B Fluidstack data-center buildout).

**Is there appetite for "middleware for robot fleets" in 2026?** Yes, but narrow. Foxglove's $40M Series B (Bessemer-led) is the proof-of-category. Apex.AI (Toyota Ventures) shows middleware gets funded. Bessemer's 2026 robotics prediction explicitly names "logging, simulation, and visualization platforms" as a core category. But the oxygen is going to humanoids — Figure $1B+ at $39B, Physical Intelligence $1.1B+ targeting $11B, Mind Robotics $500M Series A, FieldAI $405M. **A middleware founder will fight for attention against foundation-model plays at every pitch.**

---

# Startup viability assessment

## Market timing — 5/10

**The thesis is architecturally 18 months early for a standalone middleware company.** Global installed base of LLM-orchestratable robots as of 2026:
- **AMRs/AGVs**: ~200K–400K globally (largest segment by far; mostly in warehouses running WMS-first, not fleet-manager-first)
- **Humanoids**: fewer than 5,000 operational (Figure ~hundreds shipped, 1X consumer pre-orders, Agility Digit at GXO/Spanx, Apptronik pilots)
- **Security robots**: low thousands (Knightscope ~300–400 units total, Cobalt small, SMP modest)
- **Quadrupeds (Spot, Unitree)**: ~10K in commercial use, ~100K consumer/research

**The pain of heterogeneous fleet coordination requires at least 3+ robot types per site to be acute.** Today that configuration is almost exclusively in: (1) Singapore/Japanese hospitals running Open-RMF already, (2) a handful of Amazon/Walmart/Microsoft campuses, and (3) research facilities. **The pool of design-partner-ready buyers for a middleware startup is probably fewer than 200 sites globally in 2026, growing to perhaps 2,000 by 2028.**

## Competitive moat — 4/10

Given Open-RMF (Apache 2.0) and MCP (open protocol) are both open source, defensibility is genuinely weak on the bridge itself. Ranked by durability:

1. **Enterprise integration layer (SSO, SIEM, audit, RBAC, multi-tenant)** — strongest. Robot fleets inside a Fortune 500 need compliance plumbing that takes 18–24 months to harden.
2. **Deterministic fallback + safety envelope** — strong. LLM agents hallucinate; an orchestration layer that provides provable task-state guarantees and collision-avoidance SLAs is valuable even in an AGI world.
3. **Skills/adapter registry with network effects** — moderate, slow-building. If you become the canonical place to publish "Figure-02 → MCP skills" or "Spot-3 → MCP skills," you own the long tail.
4. **Orchestration UX** — weak. A dashboard is copy-able in a quarter.
5. **The bridge itself** — near-zero moat. 500 lines of Python wrapping rmf-web's FastAPI.

**The honest framing**: this is not a product moat play, it is a *distribution and trust* moat play. You win by becoming the default orchestrator inside 3–5 lighthouse customers, not by hiding IP.

## Big-company risk — HIGH (NVIDIA is the dominant threat)

| Threat | Probability they ship something competitive | Timeline | Mitigation for the user |
|---|---|---|---|
| **NVIDIA** (Isaac + Mega + Mission Dispatch already tagged "MCP" in March 2026) | **85%** | **6–18 months** | Stay vendor-neutral / non-CUDA-locked; court buyers who don't want NVIDIA lock-in (hospitals, healthcare, cost-sensitive warehouses) |
| **Intrinsic/Google** (Flowstate + Gemini, joined Google Feb 2026) | 50% | 12–24 months | Intrinsic targets industrial cells, not heterogeneous facility fleets — the segments barely overlap |
| **Anthropic directly** | 10% | n/a | Anthropic is a protocols + models company; shipping robot middleware is off-strategy. MCP protocol leadership makes them a partner, not competitor |
| **AWS RoboMaker** | 5% | — | RoboMaker was effectively deprecated/repositioned in 2022–24; AWS is not re-entering |
| **Azure** | 10% | — | Low robotics activity; Azure Object Anchors not a fleet play |
| **Open-RMF core team (Intrinsic-employed)** shipping first-party MCP | **40%** | 6–12 months | Contribute the bridge upstream — be the maintainer, not the competitor. This is the MOST underrated move. |

**NVIDIA is the binding constraint.** Their Mega + Isaac Mission Dispatch stack already covers 80% of the territory. The defensible wedge is *vendor-neutral, ROS-2-native, non-GPU-locked* orchestration for buyers who refuse to run CUDA in production (a real segment: healthcare, European industrial, cost-sensitive SMB warehouses).

## AGI/ASI risk — LOW to MODERATE

Even in a capable-VLA world, deterministic orchestration middleware survives for 10–15 years for the same reasons Kubernetes survived despite better schedulers: **audit, compliance, multi-tenant access control, deterministic fallback, cross-vendor arbitration, and traffic management at scale are separate concerns from task execution intelligence.** A capable humanoid VLA still needs someone to prove to OSHA, HIPAA, SOC 2, and the insurance underwriter that it didn't violate policy. That proof layer is inherently symbolic, deterministic, and auditable — the opposite of a neural policy.

**The honest risk is not AGI killing middleware; it's that the middleware gets absorbed into OS-level primitives (think: kubelet, not a middleware startup).** NVIDIA and Intrinsic are the most likely absorbers.

## Go-to-market — hospitals and Walmart-style campuses first

Ranked by fastest path to paid pilot:

1. **Hospitals** (🥇). Open-RMF was literally born at Changi General Hospital, Singapore. Multi-vendor robot fleets are already operational (delivery, disinfection, pharmacy). Compliance pain is real. HIMSS/HLTH conferences are reachable. 6–12 month sales cycle; $100–300K pilots realistic.
2. **Fortune-500 corporate campuses** (🥈). Walmart HQ, Microsoft Redmond, Google MTV, Amazon HQ2. Mixed fleets of security + delivery + cleaning. **Walmart HQ proximity is the user's single biggest asset.** 3–9 month pilot if internal sponsor exists.
3. **3PLs and large warehouses** (🥉). Biggest TAM but hardest displacement — Manhattan Associates / SAP EWM / Blue Yonder already own fleet coordination. Entering here means displacing installed enterprise software. Avoid as beachhead.
4. Hotels — margin-compressed; slow movers.
5. Smart cities — multi-year procurement; skip.
6. Security — too early (see Q4); skip.
7. Defense — requires clearances; skip as a first-time founder.

## Founder-market fit — 6/10 for the user's profile

**Strengths:** MCP engineering at Walmart Global Tech = legitimate agent-infra credibility. **Bentonville = unearned VC moat.** Every American Dynamism / Construct / Eclipse partner would kill for warm Walmart design-partner access. Age 23 = long runway. Infra-agent skills map exactly to the technical work needed.

**Gaps:** No robotics background (ROS 2, traffic scheduling, fleet adapters are a learning curve — but the rmf-web REST approach minimizes this). No startup experience. No capital. No VC network. Solo. ADHD + aphantasia are not disqualifying — arguably aphantasia pushes toward symbolic/deterministic thinking, which is actually the right mental model for orchestration middleware — but solo founding a deeptech company with zero prior startup cycles is hard.

**Realistic path, ranked:**

1. **✅ Recommended: Build-in-public + stay at Walmart + pursue an internal design partnership.** Ship the OSS `rmf-mcp` bridge on GitHub this month. Target 500+ stars via an HN post, a ROS Discourse announcement, and a clean demo video. Parlay MCP + Open-RMF expertise inside Walmart Global Tech into a sanctioned pilot on a Walmart campus (security + delivery mixed fleet). Present at ROSCon 2026 (October) and HIMSS. Raise a pre-seed from **Anthology Fund** ($250K–$1M) with the Walmart pilot as proof-point in Q1 2027.
2. **Viable alternative: Join Physical Intelligence, Intrinsic, or Foxglove** as an infra engineer for 12–24 months. Build domain credibility and VC relationships via employer network, then spin out with proper grounding. Lower ceiling but higher floor.
3. **Not recommended: Quit Walmart now and build full-time solo.** Zero capital + no network + no robotics domain = an 18-month runway you don't have. The opportunity isn't hot enough to justify burning savings.
4. **Not recommended: OSS contribute but don't found.** The founder fit is actually good *if* the Walmart design-partner move lands; abandoning founder ambition is premature.

## Final ratings

| Dimension | Score | Rationale |
|---|---|---|
| Market size | **6/10** | Large 5-year TAM (~$2–5B by 2030), thin 2026 paying base |
| Timing | **5/10** | Architecturally correct, installed base 18 months light, NVIDIA clock ticking |
| Defensibility | **4/10** | Open + open protocols; moat must come from distribution, compliance, and being the upstream maintainer |
| Founder fit | **6/10** | MCP skills + Walmart access are real; robotics gap + solo + no capital are real |

## Verdict: Build public artifacts and re-evaluate in 12 months

Do not quit Walmart today. Do not wait passively either. Execute this 90-day plan:

**Month 1–2:** Ship `rmf-mcp` as an open-source MIT-licensed wrapper around rmf-web's FastAPI. Five tools: `dispatch_patrol`, `dispatch_delivery`, `get_robot_states`, `get_task_status`, `cancel_task`. Demo video with Claude Desktop driving the rmf_demos hotel world. HN + ROS Discourse + Anthropic MCP directory submission. Target: 500 GitHub stars, 3 community PRs, a mention in the Open-RMF core team's monthly update.

**Month 3–6:** Secure an internal Walmart sponsor for a proof-of-concept on a corporate campus (mixed security + delivery fleet). Present at ROSCon 2026. Open conversations with the Open-RMF core team (Brian Gerkey / OSRA) about becoming an upstream co-maintainer of an MCP subpackage — this is the single best defensive move against NVIDIA shipping first-party.

**Month 6–12:** Decide based on three signals: (a) Did NVIDIA's Mission Dispatch MCP become a full Anthropic-compliant server? If yes, your wedge narrows to vendor-neutrality. (b) Did you land a Walmart paid pilot? If yes, you have Series-Seed-worthy evidence. (c) Did any commercial player ship "LLM dispatches heterogeneous fleet"? If yes, you're late; if no, the window is still open.

**If all three signals point favorably at month 12, raise a $2–4M seed from Anthology Fund + Bessemer + Construct Capital. If NVIDIA has landed the full stack and you have no Walmart pilot, pivot to (a) joining Intrinsic/Physical Intelligence as an infra engineer, or (b) narrowing to a vertical application (e.g., hospital fleet orchestrator) where the middleware bundles with domain workflows and becomes defensible.**

The opportunity is real but not urgent enough to justify burning runway. The single most underrated move — more than fundraising, more than customer discovery — is **becoming the upstream MCP maintainer inside the Open-RMF project itself.** That one political move converts a weak technical moat into a durable position, and it is available today for the price of three good pull requests.