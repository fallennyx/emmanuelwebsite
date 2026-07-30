---
title: "Metsu: Personal Intelligence"
date: 2026-07-30
summary: "A personal intelligence system that keeps AI aligned with a user's current reality across tools, decisions, and changing work."
category: writing
status: building
tags: ["Metsu", "AI systems", "personal intelligence", "founder memo"]
draft: false
---

> **Private V1 · Founder memo**
>
> AI is becoming more capable, but using it for serious work still requires people to repeatedly reconstruct their world. Metsu is being built to preserve the current version of that world: the goals, decisions, constraints, evidence, and outcomes that should shape the next piece of work.

## The problem

A founder moves between ChatGPT, Claude, coding agents, documents, email, research tools, and dozens of separate conversations. Each system sees only a fragment. Important decisions disappear inside old threads. Outdated assumptions remain mixed with current facts. A user changes direction, but the next AI conversation continues from the previous plan. Work produced in one tool does not naturally become usable context in another.

The result is a growing coordination problem:

- Users repeatedly explain who they are and what they are doing.
- Project context is fragmented across conversations and applications.
- Old discussion is mistaken for current truth.
- Important decisions are difficult to locate and update.
- Outcomes are separated from the advice or decision that produced them.
- Moving between AI tools requires manual copying, summarizing, and prompting.
- Every AI provider builds a different, incomplete version of the same user.

This is manageable when AI is used for isolated questions. It becomes a serious bottleneck when AI is used continuously to build companies, make decisions, conduct research, write, plan, and execute consequential work.

## What Metsu is

Metsu is a user-owned Personal Intelligence system.

It maintains a reviewable understanding of the user's current reality: active goals, projects, decisions, constraints, open questions, relevant evidence, and recent outcomes.

A user can give Metsu selected notes, documents, prior AI conversations, files, and natural-language updates. Metsu identifies what matters, distinguishes current information from historical discussion, and helps the user confirm or correct its understanding.

When the user asks for help, Metsu provides the relevant current context to the selected AI model. The model can then produce an answer, recommendation, research brief, plan, or draft without requiring the user to reconstruct everything manually.

After the work is produced, Metsu can preserve what the user accepted, changed, rejected, decided, or learned. Future conversations continue from the updated reality rather than replaying an outdated version of the user.

The core experience is simple:

> Explain something once. Keep the important parts current. Use them wherever you work with AI.

## The initial product

Metsu begins with a focused workflow for AI-native founders and technical operators. These users already rely on multiple models and tools, manage several active workstreams, and regularly lose time reconstructing context. They are also unusually sensitive to stale assumptions, contradictory recommendations, and decisions that disappear into conversation history.

The initial product centers on four behaviors.

### 1. Capture without organization overhead

Users can capture an unstructured thought, update, file, transcript, or prior AI conversation without first deciding where every piece belongs. The original material remains available as a source. Metsu proposes useful structure afterward instead of forcing the user to maintain a complicated personal database.

### 2. Maintain Current State

Metsu separates what is currently believed to be true from everything that has merely been discussed. Current State can include:

- The active objective and success criteria.
- Confirmed facts and explicit decisions.
- Constraints and open questions.
- Unresolved work and the next useful move.

Important changes are reviewable and correctable. A model does not silently redefine the user's reality.

### 3. Produce grounded work

Metsu identifies the user's intent and selects the minimum relevant context for the task. The selected model can then produce work grounded in the user's actual situation rather than generic assumptions or an entire unfiltered history.

The result might be a strategic recommendation, research memo, product decision, implementation plan, polished message, comparison of alternatives, or next-action brief.

### 4. Preserve decisions and outcomes

Metsu records what the user decided and what happened afterward. A proposal can be accepted, corrected, rejected, or superseded. An artifact can be used, edited, ignored, or connected to an outcome. This creates a history of how the user's world changed, not merely a transcript of what an AI said.

When the user returns, Metsu can explain what changed, what the change affects, what remains unresolved, and what the next move is.

## Why existing AI memory is insufficient

Major AI providers are rapidly adding memory, project context, connected applications, and personalization. This validates the importance of the problem. It does not fully solve it.

Provider memory is generally optimized for improving the experience inside one provider's ecosystem. The provider still decides how the memory is represented, retrieved, updated, and used. Context remains fragmented when the user changes models or applications.

More importantly, memory and Current State are not the same thing.

A memory system may know that a user previously considered moving to San Francisco. A Current State system should know whether the user decided to move, postponed the decision, rejected it, or changed the conditions under which the move makes sense.

A memory system may retrieve an old product direction. A Current State system should know that the direction was superseded, preserve why it changed, and avoid presenting the old plan as current.

Metsu is not trying to store the greatest possible amount of personal information. It is trying to maintain the smallest useful representation of what matters now, supported by evidence and controlled by the user.

## The long-term opportunity

Model intelligence is becoming widely available. Reasoning quality will continue improving. Tool integrations will expand. Generic retrieval and memory will increasingly become standard features.

The scarce layer will be trusted representation of the user:

- What is currently true?
- What did the user explicitly decide?
- Which assumptions are outdated?
- Which goal or role is active?
- What evidence supports the current understanding?
- What happened after the last recommendation?
- What may an AI disclose or do?
- Which system is responsible for maintaining that boundary?

Metsu's long-term opportunity is to become the user-controlled intelligence and authority layer shared across AI systems. The provider performing a task should not need to own the authoritative version of the user. ChatGPT, Claude, coding agents, research tools, and future AI systems should be able to work from the same authorized current context.

Metsu's native product can become the primary surface for ongoing work, while interoperability allows the user's context to travel into other tools without creating a separate identity and memory inside each one.

## Potential applications

The initial wedge is AI-native founders and technical operators, but the underlying problem appears across many forms of consequential knowledge work.

### Founders

Maintain product decisions, customer findings, fundraising context, experiments, constraints, and strategic changes across research, writing, and coding tools.

### Engineers and technical leaders

Carry current architecture decisions, system constraints, incident history, implementation status, and unresolved tradeoffs across coding agents and documentation systems.

### Consultants and professional-service operators

Preserve client context, prior recommendations, decisions, deliverables, and outcomes without rebuilding the engagement history for every task.

### Researchers and analysts

Distinguish evidence, hypotheses, conclusions, rejected explanations, and unresolved questions across long-running investigations.

### Individuals managing complex lives

Maintain continuity across career decisions, financial planning, major purchases, education, relocation, health administration, and other long-running personal decisions.

Metsu does not need to serve every use case initially. The broader range matters because the same structural problem appears whenever people use AI repeatedly across time, tools, and changing circumstances.

## Trust and user control

A system representing a person's world must be more trustworthy than an ordinary chatbot. Metsu is being designed around several product principles:

- Important state remains inspectable.
- Users can correct or reject inaccurate information.
- Outdated decisions remain in history but are excluded from current context.
- Model-generated inferences do not silently become facts.
- Context is scoped to the user's current purpose.
- Users can see and control what is shared.
- External actions require explicit authority.
- Users can export, revoke, and delete their information.
- Advertising and paid recommendation ranking are not part of the core model.

The goal is not an AI that agrees with everything the user says. It is an intelligence aligned with the user's declared objectives while still surfacing contrary evidence, uncertainty, risk, and contradiction.

## Progress

Metsu is currently a private V1 under active development.

The product direction grew from systems I built for my own use to process large volumes of notes, voice transcripts, project material, and AI conversations. Those experiments exposed a deeper problem than retrieval alone: historical context is only useful when a system can determine what remains current, what changed, and what should affect the next decision.

The private V1 is being built as a real product rather than a static concept demo. The current work focuses on the core loop:

> Capture → Current State → grounded AI work → decision → outcome → later continuation

A public product demonstration is coming soon. I will update this memo with the live demonstration and access information when the current private build is ready to show.

Product site: [metsu.ai](https://metsu.ai)

Founder and technical work: [akanmutech.com](https://akanmutech.com)

## Why I am building it

I encountered this problem through unusually intensive use of AI.

I have used AI across software development, research, product strategy, applications, writing, decision-making, and personal knowledge work. The more capable the models became, the more obvious the missing layer became. The limiting factor was increasingly not whether the model could reason. It was whether the model understood the right version of my world at the moment of the request.

I began building tools to preserve continuity for myself. I processed my notes, project history, voice transcripts, and AI conversations into structured context. This produced better assistance, but it also showed why simple summarization or vector retrieval is insufficient. A useful system must understand changes, decisions, contradictions, evidence, and outcomes.

Professionally, I am a software engineer at Walmart Global Tech, where I have built and shipped internal AI systems that connect fragmented operational knowledge and make it usable inside real workflows. That work gave me direct experience with retrieval, AI agents, context systems, user trust, and the gap between a convincing prototype and something people can depend on.

I am a solo technical founder and can build the initial product end to end. My background combines software engineering, applied AI systems, product judgment, and direct personal exposure to the problem.

## What must be proven

Metsu is pre-revenue and has not yet established product-market fit. The next phase is designed to test several specific claims:

- Can a new user reach a useful grounded result quickly?
- Can Metsu construct an accurate Current State without creating excessive correction work?
- Do users prefer the same model when it receives Metsu's selected context?
- Can users return to an active project without manually reconstructing what happened?
- Will users trust Metsu enough to preserve important decisions?
- Does recording outcomes improve the next recommendation?
- Will users return repeatedly and pay for the product?

The initial testing will focus on a small group of AI-native founders and technical professionals using Metsu for real, ongoing work. The objective is not to manufacture broad signup numbers. It is to determine whether Metsu creates measurable continuity, better outputs, lower reconstruction overhead, and repeat behavior.

## The company I intend to build

Metsu should become infrastructure the user possesses, not a profile controlled by an AI provider.

The company will be built around subscription revenue and transparent premium model or research usage. The core business will not depend on advertising, selling user data, paid rankings, or incentives that conflict with the user's objectives.

The strongest version of Metsu becomes more valuable as models improve. Better models increase the quality of the work, while Metsu preserves the user's continuity, evidence, decisions, permissions, and control.

The long-term question is not only which AI model a person uses. It is:

> Which system represents the person when every model and agent wants to act on their behalf?

Metsu intends to be that system.
