# Worklog

## 2026-09-27 — Bootstrap

Created the isolated Laura trip demo project. `HAPI_HOME` is set to this
directory so HAPI resolves `specs/`, `config/`, and generated `src/` locally;
the demo never writes to a user's normal `~/.hapi` directory.

## 2026-09-27 — Contracts, workflows, and runtime evidence

Added Flights, Hotels, and Transfers OpenAPI sources, a generated composed
façade, and the Plan A Arazzo workflows. Ran `hapi openapi init lauras-trip`
with the local HAPI home, then completed the generated controller using the
Service layer. Verified local REST, Arazzo `bookTrip`, graph compilation,
planning, visualization, and redacted `[HCG_TRACE]` context output. The
installed global `hapi` did not recognize `--capability-trace` at validation
time; tracing remains an optional release-version capability.

## 2026-09-27 — Installed CLI compatibility

Changed normal project scripts, the runbook, and the offline review runner to
invoke the installed `hapi` command. Capability tracing is an explicit optional
`serve:trace` command because it depends on the installed HAPI version
advertising `--capability-trace`.

## 2026-09-28 — Jev comparison mode and authority guidance

Added explicit deterministic (`serve`) and licensed Jev (`serve:jev`) server
commands. The Jev command selects `--capability-classifier typesafe` but leaves
runtime authority at `decision`; the document explains the Enterprise/key
requirements, safe shortlist-ranking role, deterministic fallback, and guarded
fail-closed execution boundary without including any secret or internal
roadmap material.

## 2026-09-27 — Acceptance validation

Ran the project review suite and live two-server checks. See
`docs/VALIDATION.md` for exact results, the HCG trace evidence boundary, and
the intentional guarded/federation limitations.
