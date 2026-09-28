# Deterministic discovery, Jev ranking, and runtime authority

This demo has two discovery modes. Both compile the same Capability Graph, use
the same OpenAPI/Arazzo contracts, return the same tool identities, and keep
planning deterministic. The difference is how HAPI orders an already-safe set
of candidate tools for a natural-language request.

| Command | Classifier | Best use |
| --- | --- | --- |
| `bun run serve` | Deterministic | Repeatable demos, exact keywords, CI, and baseline behaviour. |
| `bun run serve:jev` | Licensed TypeSafe/Jev | Natural-language paraphrases, broad requests, ambiguous wording, or a larger authorized tool catalog. |

## Why Jev is relevant

The deterministic classifier is the product baseline. It is fast,
inspectable, and ideal when a request already maps cleanly to capability names,
operation summaries, or established terms such as “cancel a flight.”

Jev is useful after that baseline has reduced the catalog. It evaluates the
meaning of a request against a bounded set of authorized graph candidates,
including capability paths, purpose, use/avoid guidance, non-secret input and
output shape, effects, and prerequisites. This helps distinguish close but
different requests, such as “keep my flight but replace the hotel,” from “cancel
my whole trip,” without asking an MCP client to guess tool names.

TypeSafe/Jev returns typed, probability-bearing judgments that HAPI combines
with deterministic lexical and taxonomy evidence. Its role here is ranking and
clarifying an authorized shortlist—not generating a workflow in prose. The
result can be ranked, clarification-required, or no-match.

## When to use Jev—and when not to

Use Jev when semantic wording is the hard part:

- Users describe an outcome in many ways, rather than naming an API operation.
- Several authorized operations have similar terms but different effects.
- A large catalog benefits from better paraphrase recall after deterministic
  filtering.
- You can measure the expected latency/cost trade-off and calibrate it against
  representative discovery cases.

Prefer the deterministic classifier when:

- The catalog is small or a query is already exact and unambiguous.
- You need the lowest latency, no external model dependency, or fully offline
  repeatability.
- The deployment has no Enterprise entitlement, managed classifier plugin, or
  server-side `TYPESAFE_API_KEY`.
- The question is about verified current state, authorization, confirmation, or
  execution. Those are not ranking problems.

Jev never receives credentials, headers, cookies, principal/runtime records,
or transport metadata. HAPI filters unauthorized operations before the
provider is called. Never place `TYPESAFE_API_KEY` in this repository, an
OpenAPI contract, an `.http` file, logs, or MCP client configuration.

## Enable the Jev demo mode

The normal `serve` command is intentionally deterministic. To use Jev, install
the matching managed Enterprise classifier plugin, import a license granting
`core.enterprise` or `capability.graph.ai`, and keep the key only in the server
environment:

```sh
export TYPESAFE_API_KEY='your-server-side-secret'
bun run serve:jev
```

`TYPESAFE_ENDPOINT` and `TYPESAFE_MODEL` are operator configuration, not demo
arguments. Do not change the model unless the corresponding HAPI calibration
artifact supports it. If the provider, entitlement, or key is absent,
`serve:jev` must fail at startup; use `bun run serve` for the public,
deterministic demonstration.

If the installed HAPI release exposes development tracing, `bun run
serve:jev:trace` adds redacted classifier evidence. It records bounded counts,
outcomes, latency, and token usage—not prompts, raw model state, credentials,
or customer data.

## Runtime authority is a separate decision

`--capability-classifier` chooses how HAPI ranks discovered tools. Runtime
authority chooses whether HAPI merely helps a client decide or exposes bounded
execution. Neither setting can substitute for the other.

### Decision authority — this demo's default

`--runtime-authority decision` is used by both demo commands. The portable
loop is:

1. `capability_context` turns a request into declared candidate goals, facts,
   transitions, and tools; it does not assert any fact.
2. The client selects a goal and sends only verified current facts to
   `capability_plan`.
3. HAPI returns a deterministic plan or `clarification-required` result.
4. The client obtains missing information or confirmation, invokes a permitted
   tool or Arazzo workflow, observes the result, and re-plans.

Discovery and planning are read-only. Jev may improve which candidates appear
first, but it cannot establish `flight.selected`, make a booking, grant an
authorization decision, or decide that a confirmation occurred.

### Guarded authority — explicit, externally confirmed execution

`--runtime-authority guarded` additionally exposes `capability_execute` only
with Capability Graph and planning enabled. It accepts an exact current plan,
exact step arguments, current facts, and a short-lived confirmation receipt
issued by a trusted external verifier. HAPI binds the receipt to the plan,
graph, principal, mutation set, and expiry, then revalidates authorization,
policy, prerequisites, arguments, schemas, and limits before each step.

This standalone demo deliberately does not implement a fake receipt issuer or
self-approving “confirm” flag. A real provider outage in decision authority
falls back to deterministic ranking over the same authorized shortlist and
marks the result degraded. In guarded authority it fails closed: a ranking
outage cannot weaken a mutation boundary. Jev cannot issue receipts, approve
mutations, elevate authority, or invoke a target in either mode.
