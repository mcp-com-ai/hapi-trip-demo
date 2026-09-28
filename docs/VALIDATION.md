# Validation record — 2026-09-27

Completed locally from the project directory:

- `bun install --ignore-scripts` — installs only `yaml` for contract tools.
- `bun scripts/generate-federated.ts` and `bun scripts/check-contracts.ts` —
  composed façade represents all 11 source operations with matching planning
  metadata.
- `bun test` — 4 deterministic Service tests passed.
- `hapi arazzo validate ./arazzo/trip.arazzo.yaml` — 4 workflows and 3 source
  contracts resolved.
- `hapi graph compile`, `graph simulate`, and `graph visualize` — graph has 13
  operations, 11 planning transitions, no diagnostics, and produces a planned
  4-step booking path when the explicit confirmation gate is supplied.
- Live REST checks on port 3100 — controller served flight inventory and Hotel
  B returned the declared 409 without booking state.
- Live Arazzo MCP `bookTrip` on port 3101 — all three steps returned 200 and
  the local itinerary showed flight, Hotel C, and transfer booked.
- Live graph MCP `capability_context` on port 3102 — returned declared goals,
  requirements, provenance, and confirmation gates. Development logs contained
  a redacted `[HCG_TRACE] context.resolved` record with no request payload or
  fact values.

Known intentional gaps: `--capability-trace` requires an installed HAPI release
that exposes the development-only option; regular serve, Arazzo, and offline
review commands use `hapi` and do not depend on it. There is no trusted external
confirmation issuer, so guarded execution is not faked. Federation, persistent
state, automatic elicitation, compensation, and resume remain future work.
