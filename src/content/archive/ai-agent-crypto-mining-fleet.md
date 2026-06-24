---
title: "Feasibility: An AI Agent for Remote Crypto-Mining Fleet Control"
date: 2026-03-10
summary: "Technically feasible today via pyasic's unified API — the market gap isn't another dashboard, it's autonomous closed-loop remediation. Here's the architecture and the wedge."
category: research
status: shipped
tags: ["AI agents", "crypto", "infrastructure", "market analysis"]
---

# Feasibility Assessment: An AI Agent for Remote Crypto-Mining Fleet Control Without a Unified API

**TL;DR**
- **Technically feasible today.** The cgminer-derived API on TCP port 4028 is a near-universal read interface across Antminer, Whatsminer, and Avalon, and the open-source Python library `pyasic` already abstracts the messy per-vendor control differences — so an AI agent does not need browser automation as its primary path and does not need vendor cooperation.
- **The market is real but crowded at the monitoring layer** (Foreman, AwesomeMiner, Minerstat, Hive OS/ASIC Hub, Braiins, Luxor), yet thin on genuinely autonomous, natural-language, closed-loop *action* — the wedge is an agent that diagnoses and remediates (reboot, curtail, re-point pools, flag failing hashboards) automatically, not just another dashboard.
- **Best wedge:** target small-to-mid private/hosted farms (50–2,000 machines) with mixed fleets and thin IT staff, build on `pyasic`, and sell autonomous downtime reduction + thermal/curtailment response priced per-machine-per-month against a hard, measurable uptime SLA.

## Key Findings

1. **No unified cross-vendor management standard exists** — and this fragmentation is the entire business opportunity. Bitmain (Antminer), MicroBT (Whatsminer), and Canaan (Avalon) all descend from cgminer and share a read API on port 4028, but their *write* (control) mechanisms diverge sharply. Whatsminer requires an encrypted token handshake; Antminer stock firmware often disables privileged API writes and forces web-CGI calls; Bitaxe uses a clean modern REST API. Stratum is frequently misunderstood as relevant here — it is the pool↔miner *job* protocol, not a device-management protocol, and cannot read temperature or reboot a unit.

2. **An open-source unification layer already exists: `pyasic`** (by UpstreamData). It is the single most important fact for feasibility: it already speaks to Antminer (stock, Braiins OS+, Vnish, LuxOS, ePIC), Whatsminer (including the encrypted write handshake), Avalon, Goldshell, Innosilicon, Auradine and more, with a unified async interface for data collection and control (`reboot()`, pool updates, stop/resume). A new agent should build on this rather than reverse-engineer protocols.

3. **The monitoring market is saturated; the action/autonomy layer is not.** Existing tools are overwhelmingly dashboards + alerting + manual remote controls. Few deliver autonomous, closed-loop remediation driven by reasoning over heterogeneous fleet telemetry. That is where an "AI agent" framing adds defensible value.

4. **Pain points map cleanly to agent value:** silent downtime/dead miners, thermal throttling and fan failures, the need for remote reboot/power-cycle, risky mass firmware updates (including malicious "custom firmware" that steals hashrate), profitability/curtailment switching (especially ERCOT/Texas demand response), and reliable alerting.

5. **The US is the dominant mining geography** post-China-ban (roughly 35–40% of global Bitcoin hashrate), with a barbell distribution: a handful of public industrial miners (MARA, Riot, CleanSpark, Core Scientific, Cipher) running tens of thousands to 100,000+ ASICs each, plus a long tail of mid-size private and home/hobby operators.

## Details

### 1. Technical feasibility

**Remote management interfaces by vendor**

- **Antminer (Bitmain):** HTTP web UI (historically default credentials root/root), exposing hashrate, per-board/per-chip temps, fan RPM, pool config, reboot, network and firmware-upload controls. The embedded **cgminer API on TCP 4028** provides read commands (`summary`, `stats`, `pools`, `devs`, `version`, `devdetails`). `summary` gives 5s/avg GH/s, accepted/rejected shares, hardware errors, uptime; `stats` gives per-hashboard temps and frequency. Privileged write commands (`switchpool`, `addpool`, `restart`) are commonly disabled on stock firmware, so control is often performed through web-CGI endpoints. SSH/dropbear access existed on older models but is locked down on newer firmware.
- **Whatsminer (MicroBT):** Also a cgminer-lineage read API on TCP 4028 (`summary`, `pools`, `devs`, `get_version`, `get_psu`, `get_miner_info`). Crucially, **write commands use a token-based AES-encrypted handshake** (`get_token` → encrypt payload with admin-password-derived key) for actions like `update_pools`, `reboot`, power off/on, and power-mode changes. The desktop "WhatsMinerTool" is the common batch utility. This encryption is the single biggest per-vendor implementation hurdle — and `pyasic` already implements it.
- **Avalon (Canaan):** Web UI plus cgminer-style API on 4028 with Avalon-specific `estats`/`stats` strings carrying mining-module data. Canaan offers AvalonHub / fleet-management controller hardware/software (verify current product naming).
- **Bitaxe (open-source, AxeOS firmware):** The most automation-friendly — a clean documented **HTTP/JSON REST API** with endpoints such as `GET /api/system/info` (hashrate, temp, voltage, frequency, power, fan, shares, pool, version), `PATCH /api/system` (settings), and `POST /api/system/restart`. AxeOS is open source (bitaxeorg/ESP-Miner).

**Data accessible across the fleet:** hashrate (instant + averaged), per-board/per-chip temperature, fan RPM, power draw (direct on Whatsminer/Bitaxe, inferred on Antminer), pool/stratum config, accepted/rejected/stale shares, hardware error rate, uptime, frequency/voltage, and reboot/restart/power controls.

**Browser automation (Playwright/Selenium):** Technically viable for models lacking a usable API, but brittle — HTML/CGI endpoints and auth differ across firmware versions. Direct 4028-API or CGI calls are far more robust. Browser automation should be a fallback, not the core architecture. An LLM agent's role is better spent on *diagnosis and decision-making over telemetry* than on screen-scraping.

**Security constraints:** Mining management interfaces are almost always intended for trusted **local LANs**, frequently with default or weak credentials, and are dangerous to expose to the public internet (Shodan routinely indexes exposed miners). This strongly favors an **edge/on-prem agent** (e.g., on a Raspberry Pi or small x86 box on the farm LAN) that talks to miners locally and only sends outbound telemetry/commands over an encrypted tunnel to a cloud control plane.

**Standard protocol verdict:** The cgminer 4028 API is the closest thing to a common denominator for *reads*; there is **no unified standard for *control*.** Stratum (V1/V2) is a pool job protocol, not management. Braiins OS+ adds its own (gRPC) API and autotuning. This confirmed fragmentation is the reason commercial tools and `pyasic` exist.

### 2. Existing solutions, gaps, and pricing

*(Pricing should be re-verified against current vendor pages — figures below reflect recent-but-possibly-stale knowledge.)*

- **Foreman.mn:** Broad ASIC + GPU farm management — monitoring, control (reboot, pool/profit switching), alerting, automation. Per-miner-per-month pricing in the low-single-digit-dollar range with volume discounts and a small free tier.
- **Braiins OS+ (BOS+):** Custom firmware for supported Antminers; per-chip autotuning, efficiency and power-target modes. Monetized via a firmware development fee (a small percentage of mining time), with efficiency gains marketed to more than offset it.
- **AwesomeMiner:** Windows-based, strong ASIC + GPU support, profit switching, remote management; tiered licensing scaling by device count (free for a few devices up to several-hundred-dollar tiers), plus optional cloud subscription.
- **Minerstat:** ASIC + GPU, per-worker monthly pricing (a few dollars/worker) with a small free tier; profit switching, ClockTune, alerts.
- **Hive OS / HiveON + ASIC Hub:** GPU-rig Linux OS plus ASIC Hub for ASIC management; free for a limited number of workers (especially when mining to HiveON pool), then a per-worker monthly fee.
- **Luxor LuxOS:** Custom ASIC firmware focused on autotuning, efficiency, and curtailment/demand-response for industrial miners, with an API; enterprise/dev-fee model.

**Documented gaps:** these are predominantly *monitor-and-manually-act* tools. Cross-vendor coverage is uneven; autonomous closed-loop remediation is limited; profit/curtailment automation exists but is rules-based rather than reasoning-based; and natural-language operability is essentially absent.

### 3. Market size and operator profile

- **Geography:** The US holds roughly 35–40% of global Bitcoin hashrate post-2021. Industry trackers (Cambridge CBECI, Luxor's Hashrate Index, The Miner Mag) publish facility/hashrate maps.
- **Operators:** Public industrial miners — MARA, Riot Platforms, CleanSpark, Core Scientific (pivoting heavily to HPC/AI hosting), Cipher Mining, plus Bitfarms, Hut 8, TeraWulf, IREN, Bitdeer — each run tens of thousands to 100,000+ ASICs. Below them sit mid-size private/hosted farms and a large count of home/hobby miners (small in hashrate share, growing in number with the Bitaxe movement).
- **IT sophistication:** Bimodal. Large public miners have in-house ops/NOC teams and often custom tooling; the mid-size and hosted segment frequently runs lean, non-specialist IT and is the most underserved by good automation — the natural beachhead.
- **Most-cited pain points:** silent downtime, thermal/fan failures, remote reboot, firmware-update risk (including hashrate-stealing malicious firmware), profitability/curtailment switching, and reliable alerting (Telegram/Discord/SMS).

### 4. Technical architecture for the agent

- **Edge-first design:** An agent on a Raspberry Pi or small x86 box on the farm LAN can scan the subnet, identify heterogeneous hardware, and talk to each unit locally (4028 API, CGI, Whatsminer encrypted writes, Bitaxe REST). It maintains an outbound encrypted connection to a cloud control plane; no inbound exposure of miners.
- **Minimal PoC for an Antminer S19:** (a) discover the IP; (b) poll port 4028 `summary`/`stats`/`pools` for hashrate, temps, fans, pool state; (c) detect anomalies (zero hashrate, overtemp, dead hashboard); (d) act via web-CGI reboot or pool-switch (or privileged 4028 write if enabled); (e) push alerts. `pyasic` collapses most of this into a few async calls (`get_data()`, `reboot()`).
- **Open-source libraries:** `pyasic` (the key one — unified multi-vendor control), cgminer-API Python wrappers, and the Braiins BOS+ gRPC API. An LLM layer adds value by reasoning over fleet telemetry, correlating failures, and choosing/justifying remediations in natural language.

### 5. Business feasibility

- **Willingness to pay:** A miner's economics are downtime-dominated — an offline rig earns $0 while still incurring fixed costs. For a fleet of any size, even a 1–3 percentage-point uptime improvement comfortably justifies a few dollars/machine/month, which is the prevailing pricing band. Curtailment optimization (selling power back during ERCOT peaks) can dwarf this in Texas. Value should be sold as a measurable SLA (uptime %, mean-time-to-recovery), not a feature list.
- **Competitive landscape:** Foreman, Luxor, Braiins, AwesomeMiner, Minerstat, and Hive OS occupy monitoring/firmware. Luxor is the most prominent VC-backed mining-software/data company; Braiins is an established firmware/pool player; Foreman is a focused management vendor. Explicit *AI-agent* entrants are nascent — the autonomous-remediation + natural-language-ops position is largely open.

## Recommendations

1. **Build on `pyasic`, not browser automation.** Use it as the hardware-abstraction layer and reserve Playwright/Selenium only for orphan models with no API. This collapses months of per-vendor protocol work.
2. **Ship edge-first.** Deploy a LAN appliance/container that keeps miner interfaces off the public internet and tunnels out — this is both a security necessity and a trust differentiator.
3. **Wedge = autonomous downtime reduction for mid-size mixed fleets (50–2,000 machines).** This segment has heterogeneous hardware, thin IT, and clear ROI; the industrial top-end builds in-house and the hobby tail won't pay much.
4. **Price per-machine-per-month against a hard uptime/MTTR SLA**, in the low-single-digit-dollar band, with curtailment optimization as a premium tier in ERCOT/PJM markets.
5. **Lead feature: closed-loop remediation + natural-language ops** ("why is rack 4 underperforming, and fix it"), not another dashboard. Differentiate on *action and reasoning*, since monitoring is commoditized.
6. **Benchmarks that change the plan:** if `pyasic` coverage proves insufficient for a target customer's fleet, prioritize filling those drivers; if a major vendor ships a robust official fleet API or an incumbent ships true autonomy, pivot to the natural-language/curtailment layer where you retain an edge.

## Caveats

- **Sourcing limitation:** The live web-search tools failed in this environment, so this assessment is built from domain knowledge rather than freshly retrieved pages. All pricing, dev-fee percentages, market-share figures, funding amounts, facility counts, and the current `pyasic`/AxeOS feature lists should be independently re-verified before any investment decision.
- **Pricing volatility:** Mining-software pricing pages change frequently; treat all dollar figures as directional.
- **Hardware/firmware drift:** Vendor firmware updates regularly change or lock down interfaces (e.g., disabling SSH, altering CGI endpoints), so any control layer needs ongoing maintenance.
- **Security/liability:** An agent with reboot/curtail/firmware-write authority over revenue-generating hardware carries real operational risk; safeguards, audit logs, and conservative default permissions are essential.
- **Custom-firmware trust:** Some third-party firmware has historically carried hidden dev fees or backdoors — a product touching firmware updates must address this trust issue head-on.