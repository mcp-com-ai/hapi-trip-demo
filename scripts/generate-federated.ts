import { parse, stringify } from "yaml";

const sourceNames = ["flights.openapi.yaml", "hotels.openapi.yaml", "transfers.openapi.yaml"];
const sources = await Promise.all(sourceNames.map(async (name) => parse(await Bun.file(`contracts/${name}`).text()) as Record<string, any>));
const paths: Record<string, unknown> = {};
const schemas: Record<string, unknown> = {};
for (const source of sources) {
  Object.assign(paths, source.paths);
  Object.assign(schemas, source.components?.schemas ?? {});
}

paths["/itinerary"] = {
  get: {
    operationId: "getItinerary", tags: ["Trip"], summary: "Review Laura's synthetic itinerary",
    "x-hapi-capability": ["Travel/Trip/Inspection"],
    "x-hapi-intent": { "use-when": ["The client needs to verify local booking state."], "avoid-when": ["The client only needs to discover choices."] },
    "x-hapi-effects": { mode: "read", "side-effecting": false, destructive: false, idempotent: true, "requires-confirmation": false },
    "x-hapi-prerequisites": [],
    responses: { 200: { description: "Current synthetic itinerary", content: { "application/json": { schema: { type: "object" } } } } },
  },
};
paths["/demo/reset"] = {
  post: {
    operationId: "resetDemo", tags: ["Demo"], summary: "Reset synthetic demo state",
    "x-hapi-capability": ["Travel/Demo/Reset"],
    "x-hapi-intent": { "use-when": ["Starting a deterministic local demo scenario."], "avoid-when": ["Working with a real trip."] },
    "x-hapi-effects": { mode: "action", "side-effecting": true, destructive: true, idempotent: true, "requires-confirmation": false },
    "x-hapi-prerequisites": ["Local demo environment only."],
    responses: { 200: { description: "Reset local state", content: { "application/json": { schema: { type: "object" } } } } },
  },
};

const facade = {
  openapi: "3.1.0",
  info: {
    title: "Laura's Trip — composed local demo", version: "1.0.0",
    description: "Generated single-document compatibility façade over the Flights, Hotels, and Transfers source contracts. It is not runtime Capability Graph federation.",
    "x-hapi-demo-composition": { sources: sourceNames, "not-runtime-federation": true },
  },
  servers: [{ url: "http://127.0.0.1:3100" }], paths, components: { schemas },
};
await Bun.write("contracts/trip-federated.openapi.yaml", stringify(facade));
console.log(`Generated composed façade with ${Object.keys(paths).length} paths from ${sourceNames.length} source contracts.`);
