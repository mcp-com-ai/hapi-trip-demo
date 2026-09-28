const env = { ...process.env, HAPI_HOME: process.cwd(), HAPI_ANALYTICS_OPTOUT: "true" };

async function run(...args: string[]) {
  const child = Bun.spawn(["hapi", ...args], { cwd: process.cwd(), env, stdout: "inherit", stderr: "inherit" });
  if ((await child.exited) !== 0) throw new Error(`Review command failed: ${args.join(" ")}`);
}

await run("arazzo", "validate", "./arazzo/trip.arazzo.yaml");
await run("graph", "compile", "./contracts/trip-federated.openapi.yaml", "--out", "artifacts/laura-graph.json");
await run("graph", "simulate", "artifacts/laura-graph.json", "--initial-fact", "traveller.identity.verified", "--initial-fact", "flights.consulted", "--initial-fact", "hotels.consulted", "--goal-fact", "trip.booked", "--satisfied-gate", "mutation-confirmation");
await run("graph", "visualize", "artifacts/laura-graph.json", "--initial-fact", "traveller.identity.verified", "--initial-fact", "flights.consulted", "--initial-fact", "hotels.consulted", "--goal-fact", "trip.booked", "--out", "artifacts/laura-business-state-flow.html");
console.log("Offline Laura trip review completed. Run lauras-trip-demo.http with the two servers for live REST/MCP scenarios.");
