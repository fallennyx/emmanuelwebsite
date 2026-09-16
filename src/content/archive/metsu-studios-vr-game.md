---
title: "Metsu Studios: What the VR Game Actually Is Now"
date: 2026-09-12
summary: "Taking Metsu into XR was the easy part. This is the product it became: a VR-first shared-world superpower action RPG with six pillars, six proof gates, and a Unity foundation that is proven locally and nowhere else yet."
category: project
status: building
tags: ["Metsu", "VR", "Quest", "game design", "Unity"]
draft: true
---

On September 7 I wrote [why I was taking Metsu into XR](/archive/metsu-xr-pivot/). This is what it
became once it stopped being a direction and started being a product.

## The call

Metsu is a VR-first shared-world superpower action RPG. You create a distinct superhuman
identity, enter a living city, physically perform powers, become visibly stronger, and
share the consequences with other players.

Quest is the first target and embodied VR is the first product proof. A controller-based PC
or PlayStation version is a future possibility, not current scope, and I am not building a
second platform now. Game rules consume abstract intentions like move, aim, charge, release,
defend and grab, so input adapters stay replaceable later without weakening the embodied
design.

## Six pillars

1. **Embodied power.** Charging, aiming, flying, blocking, striking and releasing have to
   feel physically authored and responsive. Traversal is low-attention enough that your
   hands stay free for combat.
2. **Distinct identity.** Players choose appearance, power family, traversal investment and
   build. You should be able to read what someone is becoming without a spreadsheet.
3. **Visible progression.** Growth changes verbs, scale, appearance or tactical options,
   not just a damage number. Fewer pronounced choices beat piles of random rolls.
4. **Consequential world.** The city supports traversal, hiding, pursuit, bosses, localized
   breaches, craters and building destruction. World changes agree across visuals, collision
   and later multiplayer state, then reset understandably.
5. **PvE and PvP continuity.** Players grow through shared-world PvE, cooperate against
   threats and test builds against each other. Earned strength matters in casual world
   combat, while ranked modes normalize power.
6. **Social reasons to return.** Power gains meaning through an audience. Parties,
   rivalries, public threats, transformations and recurring events turn mechanics into
   stories.

## What is actually proven

Local, not shipped. I want that line kept sharp.

- Unity 6000.3.24f1 imports, renders and passes desktop Play-mode collision: 272,140
  triangles, 17 renderers, 16 colliders, street grounding, 5 m of clear movement, 10 m of
  ascent, wall collision and a roof landing.
- An island foundation scene has terraced terrain, water, a circular hub, 235 building
  placements, landmarks, service markers and connected walk and fly routes. Shared meshes,
  LODs and GPU instancing cut observed peak draw calls from 1,746 to 584.
- Combat City Slice A emits a 450 m landmark, 18 independently owned route buildings,
  stable building and damage-cell IDs, and two-corner ground and flight routes.
  Deterministic metrics matched byte-for-byte across rebuilds. Unity reported 126,264
  triangles, 48 renderers, 47 colliders and 187 material-slot draw estimates.

What that is not: no headset build, no APK, no tracked traversal, no measured comfort, no
Quest framerate, no multiplayer, no final art acceptance and no retention evidence. Editor
render and readback numbers are not Quest timings.

## The six proof gates

1. **The city supports the fantasy.** Human scale, skyline variety, street, roof and aerial
   readability, hiding and crossing routes. Local checks pass; headset evidence is open.
2. **Embodied traversal works.** Movement, flight, hover, boost and super-speed with head
   look independent of hand aim. Desktop input can diagnose; only a headset can accept
   comfort.
3. **Power changes the world.** One combat interaction across ordinary impact, breach and
   ultimate removal, verified in visuals, collision, reset, replay and performance.
4. **Another player makes it better.** Two players, synchronized movement, readable
   identities, one shared threat, optional PvP, late join and reconnect.
5. **Growth creates desire to return.** One chosen persistent upgrade that visibly changes
   an ability, then the same encounter re-run to see whether the changed build creates a new
   tactic.
6. **First-version population and repeatability.** The accepted 4 to 8 player target under
   combat and destruction load.

No gate is passed by a document, a desktop render, a synthetic test or my own agreement
when the claim is about headset feel, multiplayer behavior or retention.

## What I am not pretending

Super City, HERO x HERO, Project Demigod and Elements Divided already cover parts of this
space. DC Universe Online and Champions Online disprove any claim that customizable online
superhero games are absent. What I have not found is the specific combination of embodied
VR power performance, shared free-roam, synchronized destruction and earned progression,
and failing to find an example is not evidence that none exists.

Metsu uses original characters, powers, worldbuilding, names, visuals, story, audio and
assets. Dragon Ball and protected superhero properties are private feeling references only.

## Where it stands

The next build is Slice C: one building and one pavement damage proof. Networking,
progression, LiveOps and a full ability roster are deliberately deferred. The honest status
line is that a local Unity foundation exists with owner-accepted scale and proportions, and
everything that makes it a game in a headset is still ahead.
