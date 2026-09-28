const source = Bun.file("contracts/trip-federated.openapi.yaml");
if (!(await source.exists())) throw new Error("Generate the composed contract before caching it.");
await Bun.write("specs/lauras-trip.yaml", await source.text());
console.log("Cached composed contract as specs/lauras-trip.yaml for hapi init.");
