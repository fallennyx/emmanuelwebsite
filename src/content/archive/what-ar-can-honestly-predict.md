---
title: "What AR Can Honestly Predict, and At What Horizon"
date: 2026-09-10
summary: "The version of this idea I almost shipped claimed too much. This is the version I can defend: a non-contact anticipation trainer with a tiny vocabulary, an abstain rule, and gates the claim has to pass before I am allowed to make it."
category: research
status: building
tags: ["Metsu", "AR", "computer vision", "perception", "research"]
draft: true
---

The version of this idea I almost shipped claimed too much. This is the version I can
defend.

## What V1 actually does

V1 runs MediaPipe Hand Landmarker in the browser and gets 21 normalized 2D hand landmarks.
It averages the wrist and four metacarpal-base points into a palm center, keeps about 330 ms
of samples, fits independent linear regressions for x and y over time, and extrapolates the
fitted velocity by the selected 250 to 500 ms horizon. Confidence is a hand-built mix of
history length, speed and linear-fit stability, and it abstains below motion or confidence
thresholds. A cue counts as verified when the observed palm later enters the predicted
screen third.

That produces five consequences I have to keep saying out loud:

- 500 ms means farther ahead, not faster processing.
- Error normally increases with horizon.
- It reacts after hand motion exists and does not infer a punch or an intention.
- Its confidence is a heuristic, not a calibrated probability.
- 2D palm motion cannot separate a punch, a reach, a feint, camera motion or depth.

## What the research changed

Three findings moved the build more than any tuning would have.

**Human response is the bottleneck, not detection.** A controlled VR-boxing study reports
that a punch commonly lasts under 200 ms, and human reaction time is of similar magnitude.
Defending successfully therefore needs information from body motion before punch onset, not
faster post-onset detection. Combat-sport experts are measurably faster and more accurate at
perceptual anticipation than novices, which supports the idea that advance kinematic cues
are real and trainable.

**A fighting model has to watch the whole opponent.** Martial-arts research points at weight
redistribution, center-of-mass change, and trunk, shoulder, knee and limb motion as advance
cues. A recent karate pre-action detector shows the trap directly: ordinary footwork is
easily misclassified as an attack precursor.

**A future position is a distribution.** Published egocentric forecasting systems predict
trajectories probabilistically, and 3D forecasting research finds 2D image-space paths
insufficient for real-world hand motion. So the honest output is a likely lane plus
uncertainty, not one confident red line.

## What V2 is

V2 is a non-contact combat anticipation trainer, not a general danger detector. It watches a
consenting opponent, recognizes preparatory motion, predicts one bounded attack lane and
time-to-contact, and shows a quiet cue only when confidence and useful lead time are
sufficient. Then it measures whether the wearer responded faster or more accurately than in
matched no-cue trials.

The first vocabulary is deliberately tiny: lead straight, rear straight, deliberate feint,
and no attack or footwork, each normalized to the wearer’s left or right upper-body lane.
Boxing-like straight attacks give repeatable onset and contact definitions plus a direct
reaction-time test.

Nothing makes contact with a person. Early trials target a foam pad or stop before the
wearer. This is training and research equipment, not protective equipment.

The cue grammar follows from the research: keep the live opponent visually clean, flash the
earliest informative joint region briefly, show one translucent lane wedge or skeletal
branch instead of a certain future body, show time-to-contact only when it is calibrated,
stay silent on ambiguous footwork, and push detailed metrics into replay.

## Gates the claim has to pass

V2 earns a combat-anticipation claim only on held-out trials, and only when the cue appears
before defined attack onset or else is labeled post-onset detection; lane, feint and
no-attack are evaluated separately; false-cue rate, coverage and accuracy are all reported;
median useful lead is reported after measured system latency; confidence bands match
observed correctness rather than a UI heuristic; overlay-on versus overlay-off uses
randomized equivalent trials; and every failed or abstained trial stays in the receipt.

Initial engineering targets, not current claims: at least 250 ms median useful lead on
eligible controlled trials, at most 10 percent false cues on feint and no-attack trials, at
least 80 percent lane accuracy when it chooses to cue, and under 50 ms capture-to-overlay
processing latency on the chosen prototype.

The minimum dataset before any learned model is 40 lead straights, 40 rear straights, 40
feints and 40 no-attack or footwork windows, across at least two recording sessions, with
one held-out session used only for evaluation. None of that is collected yet.

## Hardware fit

The criteria are camera frames plus timestamps, head pose, calibration, a programmable
spatial display and low sustained latency. AI branding or a display alone is not enough, and
a moving wearer needs camera-motion compensation or head movement gets mistaken for the
opponent’s movement.

1. **Quest 3 / 3S**, the recommended next wearable prototype. Camera access, calibration,
   timestamps, spatial projection and on-device inference make it the clearest bridge from
   webcam skeletons to body-registered future ghosts. Its published 60 Hz and roughly 20 to
   40 ms figures describe the camera path, not end-to-end model or display latency.
2. **Snap Spectacles**, the closest glasses-shaped expression. World Query is about 5 Hz
   depth and world mesh, which suits static or slow objects, not fast punches.
3. **Project Aria Gen 2**, research companion. Synchronized cameras, IMUs and gaze are
   unusually relevant to separating wearer movement from observed movement. Treat it as a
   sensing and data route, not a demonstrated spatial-display route.
4. **Android XR glasses**, promising phone-powered route. Google recommends 640x480 at
   10 FPS for computer vision because of battery and thermal limits, which matters for fast
   movement. A camera plus a HUD does not establish 3D AR.

No expensive device is required for the next learning test.

## Why the constraint is the point

It would be easy to build a demo that looks like it predicts the future. The hard and
interesting part is deciding when the system should stay silent, then proving that the
silent cases were the right ones to skip. That is the whole design.
