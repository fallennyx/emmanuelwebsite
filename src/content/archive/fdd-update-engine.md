---
title: "FDD Update Engine: AI + Deterministic Drafting for Franchise Disclosure Documents"
date: 2026-06-25
summary: "Found a document nobody automates: the franchise disclosure document every franchisor has to refile every year, by hand, by lawyers. I built a demo to test it, and building it changed the whole idea. Attorneys don't draft 23 items from a blank page. They put last year's filing next to this year's and fix what moved. So that's the product now: upload the old FDD, drop in the new inputs, get a tracked-changes diff a lawyer can finalize. The actual workflow, not a text generator."
category: project
status: building
tags: ["Python", "FastAPI", "Claude API", "legaltech", "DOCX"]
---

I was hunting for an untapped opportunity where LLM document synthesis and analysis
could do real work that nobody had automated yet. **Franchise Disclosure Documents (FDDs)
was the biggest wedge I found.** Every U.S. franchisor — roughly 9,000 brands — has to
update its 23-item FDD every year, it's done by hand by attorneys at $4,000–$15,000 a
filing, and no one is automating the *franchisor* side. I also have a government angle to
lean on (Secret Clearance through ANG), which matters for the larger adjacent wedge (defense / CUI
compliance documents). The full market reasoning lives in the
[venture assessment](/archive/ai-regulated-document-compliance-venture).

And So I built a demo to figure it out, and while building it changed the idea.

**The original plan** was 23 extraction prompts: read each item out of the prior FDD and
re-generate the text from scratch. **What I realized** is that's not how the work actually
happens. An attorney updating an FDD doesn't draft 23 items from a blank page — they put
last year's FDD next to this year's source documents and compare them section by section,
fixing what changed and keeping it compliant.

**So I pivoted.** The real product is simpler and matches the actual workflow: upload last
year's FDD, upload the new inputs (amended franchise agreement, outlet roster, updated
data), and get a side-by-side, tracked-changes comparison the attorney can review and
finalize — instead of writing from nothing. The deterministic items (9, 17, 20, 23) are
generated in pure Python; the narrative items are diffed by an LLM with the prior text
routed per item.

## See it

- [**▶ Try the live demo →**](/demos/fdd/index.html) — it diffs two **real** consecutive
  filings: **Alloy Personal Training's 2025 FDD against its 2026 FDD** (both public, from
  the Minnesota CARDS registry). Hit run and the engine walks all 23 items live, surfacing
  every change an attorney must make  *each one quoted verbatim from the actual filing*.
  Because the 2026 FDD is the answer key, you can check the engine against what the
  franchisor's lawyers really filed: it catches the outlet count jumping **78 → 129
  (+51)**, fee changes, and the advisory-council that formed mid-year. The narrative items
  run on Gemini 2.5 Flash-Lite behind a verbatim-substring gate that *cannot* invent a
  value; items 9/17/20/23 are computed in pure Python with no model at all.
- [**The venture assessment behind it →**](/archive/ai-regulated-document-compliance-venture)
  — the market, the incumbents, the unauthorized-practice-of-law risk, and why I led with FDD.
- [**Code on GitHub →**](https://github.com/fallennyx/fddpipeline)
