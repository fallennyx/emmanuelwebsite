---
title: "Metsu engine, Phase 1: the Unreal destruction and traversal core"
date: 2026-10-25
summary: "Six engine acceptance items pass and the Windows build is green. A solo sandbox is playable in slices, with flight, impact and a power kit on the way. The Unreal editor is driven live from my Mac over a tunnel."
category: project
status: building
tags: ["Metsu", "Unreal Engine", "C++", "VR", "game"]
draft: false
---

The Metsu game runs on an Unreal Engine 5 core built around two things: destruction and
traversal. If a city can be broken and flown through convincingly, the rest of the game has
something to stand on.

## Where it is

- **Phase 1 is done (Oct 25).** Six acceptance items pass and the Win64 build is green. Five of the engine's layers sit at 90 percent against their checklists.
- **A solo sandbox is playable in slices.** A city-scale stage with ocean and quays, a body with a leap, a guard and a burst, a power HUD, and three art looks compared side by side before one was chosen.
- **Flight is next.** The engine already has reactionless flight in three speed tiers, a comfort vignette and a visor for VR. Oct 31 set the order: flight and impact environment first, abilities second.

## How it is built

- Heavy city, physics and VR work runs on a remote GPU PC. The Mac drives the Unreal editor live through an SSH tunnel to the editor's built-in MCP server, with 37 toolsets answering. No reboot of the editor per script.
- Gameplay is C++ with tuning exposed in Blueprints. City Sample content stays in its built, Nanite form and swaps to pre-fractured physics only on impact.
- Every milestone is checked on the real runtime. Desktop visuals are not counted as headset performance.

## What is not proven

The 90 Hz Chaos destruction test and the headset retest are still open. They stay open here until they pass.

The source is private. This page and [the VR game write-up](/archive/metsu-studios-vr-game/) are the public record.
