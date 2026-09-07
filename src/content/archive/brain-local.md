---
title: "How I built Brain Local around the way I work"
date: 2026-09-07
summary: "One local place for context, changing decisions, and actual work. How I configured Brain Local to work across my projects and evolve with me."
category: writing
status: shipped
tags: ["Brain Local", "AI", "context", "workflow"]
draft: false
---

I was trying to build Metsu as a personal AI context product. Then I realized I could get most of what I wanted for myself in Codex, using a local project folder.

That became Brain Local.

I wanted one main place where I could talk across different parts of my life and work. Tech, content, projects, whatever I’m thinking about. I didn’t want to keep deciding which project folder to talk to just so the AI could understand what I meant.

If I’m working inside a project, I still want access to the bigger context. If I’m talking through Brain, I want it to be able to work with the project. The code can live in its own repository. I just don’t want to keep reconstructing the same context.

The direction also has to be dynamic. I might start a conversation with one idea and change my mind by the end of it. The next conversation should know what I actually decided. The final decision should supersede the earlier one when it applies.

That’s why I care about keeping the current direction separate from the history of decisions. I want the history there, but I don’t want the system treating every idea I’ve ever discussed as something I’m still doing.

I wanted the system to stay simple, reusable, scalable, and low maintenance. I should be adding to it and modifying it as I go. I don’t want to spend all my time reconfiguring it.

I think of it as a better Obsidian for the way I want to work. What matters to me is that remembering my context helps me turn ideas into actual work. Remembering by itself isn’t the whole point.

It lives on my local filesystem. In principle I can keep a copy of the folder and take the information with me. I still want to see how portable the whole setup really is, not just whether I can copy the files.

I like what I have right now. Now I really have to execute stuff.

## Walkthrough of the current structure

Here’s how the current setup is arranged.

1. **Start in Brain.** The root instructions route a request to the relevant project or content workspace. You can still work directly inside a child project.
2. **Load a small amount of useful context.** A compact identity file supplies the baseline. A routing index points to current direction and the project summary. Detailed source material is retrieved when the task needs it.
3. **Keep source, ideas, and decisions distinct.** The original admitted material belongs in Evidence. Inferences remain Candidates. Explicit decisions and verified outcomes update the appropriate current views.
4. **Do the work in its own place.** Technology projects have independent repositories. Public writing has a content workspace. Shared personal context remains in Core.
5. **Record what changed.** A correction updates the relevant current view and retains a source reference. Later work can retrieve that decision without treating old discussion as the latest plan.
6. **Reconcile missed context.** A nightly process is configured to review accessible conversations and reconcile changes in time order. The contract requires it to report gaps. It does not guarantee access to every conversation or immediate synchronization across running sessions.

## Portability

This is a write-up of my own setup, not a downloadable package. The folder includes private context and depends on instructions, skills, agent configuration, accounts, and machine-specific paths outside it. Copying the folder preserves the files, but it does not reproduce the full experience automatically.

[Read why I’m taking Metsu into XR](/archive/metsu-xr-pivot/) · [Contact me](mailto:1eakanmu@gmail.com)
