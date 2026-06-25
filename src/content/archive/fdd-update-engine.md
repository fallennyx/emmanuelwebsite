---
title: "FDD Update Engine: AI + Deterministic Drafting for Franchise Disclosure Documents"
date: 2026-06-25
summary: "I went looking for an industry where AI document synthesis wasn't tapped yet — franchise disclosure documents were the first wedge. Building the demo made me pivot the whole idea: not a 23-prompt text generator, but a side-by-side updater that diffs last year's FDD against this year's source docs the way an attorney actually works."
category: project
status: building
tags: ["Python", "FastAPI", "Claude API", "legaltech", "DOCX"]
---

I was hunting for an untapped industry — somewhere LLM document synthesis and analysis
could do real work that nobody had automated yet. **Franchise Disclosure Documents (FDDs)
were the first wedge I found.** Every U.S. franchisor — roughly 9,000 brands — has to
update its 23-item FDD every year, it's done by hand by attorneys at $4,000–$15,000 a
filing, and no one is automating the *franchisor* side. I also have a government angle to
lean on — I'm in the military — which matters for the larger adjacent wedge (defense / CUI
compliance documents). The full market reasoning lives in the
[venture assessment](/archive/ai-regulated-document-compliance-venture).

So I built a demo to figure it out — and building it changed the idea.

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

- [**▶ Try the demo →**](/demos/fdd/index.html) — a real public Westin FDD, updated to a
  tracked-changes DOCX in the browser, no API key needed.
- [**The venture assessment behind it →**](/archive/ai-regulated-document-compliance-venture)
  — the market, the incumbents, the unauthorized-practice-of-law risk, and why I led with FDD.
- [**Code on GitHub →**](https://github.com/fallennyx/fddpipeline)
