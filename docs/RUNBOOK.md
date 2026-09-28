# Laura's Trip demo runbook

## Setup

```sh
export YOUR_PROJECTS_DIR=/path/to/your/projects
cd $YOUR_PROJECTS_DIR/hapi-trip-demo
bun run generate:facade
bun scripts/cache-composed.ts
HAPI_HOME=$PWD hapi openapi init lauras-trip
# Restore the checked-in completed Controller if init was run again:
git checkout -- src/lauras-trip/Controller.ts
```

`hapi init` scaffolds a controller from the cached composed OpenAPI document.
The checked-in controller is its completed form and delegates to `TripService`.

## Start the local backend and graph MCP surface

```sh
bun run serve
```

This uses the installed `hapi` command and starts REST and MCP on
`http://127.0.0.1:3100`. It is not headless and does not proxy to an upstream
URL.

If the installed HAPI version supports development Capability Graph tracing,
use `bun run serve:trace` instead. `--capability-trace` is deliberately
development-only; `[HCG_TRACE]` records are redacted evidence, not business
audit records. If `hapi serve --help` does not list the flag, update HAPI before
using the trace command; normal serving and the offline review suite still work.

In another terminal, start Plan A workflows:

```sh
bun run serve:workflows
```

This starts workflow MCP tools on port 3101. Its three relative Arazzo source
contracts already declare the local backend URL, so no `--url` override is
needed.

## Compare deterministic and Jev-ranked discovery

`bun run serve` is the deterministic baseline. In a licensed environment with
the Enterprise classifier plugin installed and `TYPESAFE_API_KEY` available to
the server process, use `bun run serve:jev` to compare semantic ranking of the
same authorized graph candidates. Both commands run in `decision` authority;
read [GUARDED-AND-JEV.md](GUARDED-AND-JEV.md) before enabling Jev or guarded
execution.

## The client-led deterministic loop

1. Call `capability_context` with “I want to book Laura's trip to Cancún.”
2. Select the declared `trip.booked` goal and call `capability_plan`.
3. Treat requested identity/selection facts as clarification, not as values HAPI
   invented. Verify them with Laura or explicit local selection tools.
4. Invoke the permitted tool or `bookTrip` workflow. In decision authority the
   client (not HAPI) makes the call.
5. Re-plan with observed, verified state after every meaningful change.

For Hotel B, the booking returns 409. Do not retry it or mark a booking fact.
Select Hotel C explicitly and re-plan. This is the exact recovery story the
demo can support today.

## Stop and reset

Use `Ctrl-C` for each server. `POST /demo/reset` resets in-memory state. A
process restart also resets it; there is no persistence or resumable workflow.
