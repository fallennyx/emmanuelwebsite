---
title: "Palantir Foundry: Incident Triage Agent"
date: 2026-06-26
summary: "Built this to impress Palantir before an interview, straight up. One session inside Foundry, their actual platform, and I shipped a full incident triage agent end to end: live data, an ontology, an AIP agent that reasons over runbooks, and a governed action behind a human approval gate. The fun part was just playing in their software, watching the data pipelines line up and the object state flip in real time while I watched. Same shape as the agent I shipped at Walmart, this time on their governance primitives."
category: project
status: shipped
tags: ["Palantir Foundry", "AIP", "Ontology", "AI agents", "FDE"]
---

I built this to impress Palantir. Straight up. I had an interview coming and I
wanted to walk in having already used their platform, not just talked about it.
So I gave myself one session inside Foundry and built something real.

The result is a full **incident triage agent**, end to end. Three ontology object
types backed by live datasets, an AIP chatbot that runs semantic search and
actually reasons over document content, a governed write-back action gated behind
human approval, and a published Workshop app. It runs the whole operational loop:
take a natural-language query, find the incident, surface the matching runbook,
locate the on-call engineer with the right expertise, apply the escalation rules
pulled from the runbook text, propose an action with every parameter pre-filled,
and hold for a human to approve before anything executes. Approve it and the
object state updates live in the UI while you watch.

Honestly the best part was just being in their software. Loading the data, wiring
the ontology, watching the pipelines line up and the objects turn queryable.
Seeing how the whole thing fits together was the point.

<figure>
  <img src="/images/palantir/ontology-discover.png" alt="Palantir Foundry Ontology Manager showing the Incident, Engineer, and Runbook object types" loading="lazy" />
  <figcaption>Ontology Manager. The Incident, Engineer, and Runbook object types I modeled, sitting alongside 14 object types and 7 action types in the workspace.</figcaption>
</figure>

<figure>
  <img src="/images/palantir/incident-object-type.png" alt="The Incident object type in Foundry with six properties and the escalate_incident action" loading="lazy" />
  <figcaption>The Incident object type. Six properties backed by a live datasource, and the governed <code>escalate_incident</code> action that modifies it.</figcaption>
</figure>

## How it's built

**Data.** Three CSVs in the Foundry file system: incidents, runbooks, on-call
engineers. Six infrastructure incidents, the runbooks that apply to them, and the
engineers with the expertise to handle them.

**Ontology.** Three linked object types in Ontology Manager (Incident, Runbook,
Engineer), each with its own primary key, all queryable and semantically
searchable by the agent.

**Agent.** An AIP chatbot with semantic search across all three object types. The
retrieval context lets it reason over runbook *content*, not just the metadata. So
when a runbook says "escalate if it persists past 15 minutes," the agent pulls
that rule straight out of the text and applies it.

**Action.** An `escalate_incident` action type. It sets status to ESCALATED and
reassigns the incident to the right engineer. The catch: it proposes, it does not
execute. A **human approval gate** sits in front of it. That gate is the whole
difference between a chatbot and a governed operational workflow.

**UI.** A published Workshop app with the agent chat, a live incident table that
updates the second an action fires, and an approval modal for the governed actions.

## The full loop

Someone types "we're seeing 502 errors on the API gateway." The agent searches
incidents and finds INC-001, the gateway 502 issue, HIGH severity, still open. It
pulls the matching runbook, reads the content, and extracts the 15-minute
escalation threshold. It finds the on-call engineer whose expertise matches,
Marcus Rivera, and proposes the escalation with every parameter already filled in
and a reason derived from the runbook logic. Then it stops and waits. The operator
reviews it in the approval modal. On approval the ontology writes: status flips to
ESCALATED, the incident reassigns, and the Workshop table updates in real time.
State change you can watch happen.

## When the data's incomplete

I didn't only build the happy path. INC-006 is a CRITICAL kernel panic with no
runbook that covers it. Ask about it and the agent finds the incident, admits
there's no matching runbook, flags the documentation gap out loud, and still
points to the best available on-call engineer. It degrades gracefully instead of
pretending it has an answer.

## Why it matters

This is the same shape as the MCP documentation agent I shipped at Walmart: an AI
layer reasoning over scattered enterprise data and taking governed actions. I
rebuilt it on Palantir's platform with their governance primitives. Data to
ontology to agent to actions to UI, the full stack.

The approval gate is the core of it. AI proposes, a human approves, the system
executes with a full audit trail. That is the forward-deployed value proposition
in one pattern. Empty workspace to published app in about 80 minutes.
