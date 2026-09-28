# Decisions

## 2026-09-27 — Local, synthetic travel state

The demo uses a deterministic in-memory store and synthetic traveller data.
This keeps the demo scenario reproducible and prevents the demo from carrying
real bookings, credentials, payment, or personal data.

## 2026-09-27 — Arazzo composition first, façade for current graph runtime

`trip.arazzo.yaml` is Plan A and references the three source contracts. The
single `trip-federated.openapi.yaml` contract is a generated compatibility
façade for the current one-document Capability Graph runtime; it is not graph
federation.

## 2026-09-27 — Guarded execution remains externally approved

This standalone demo has no trusted confirmation issuer. It must not fake a
receipt or make the MCP model approve a mutation, so the runnable narrative
uses decision authority. Guarded execution is documented as an optional product
integration with an externally registered verifier.

## 2026-09-28 — Jev ranks the safe shortlist; it does not control authority

Keep the deterministic classifier as the default public demonstration. The
licensed TypeSafe/Jev provider is an explicit comparison mode for semantic
ranking after authorization and lexical shortlisting. It cannot create business
facts, plan semantics, confirmation, authorization, or execution authority.
Both modes use decision authority in this project; guarded execution remains
outside the demo until a real external confirmation verifier is available.
