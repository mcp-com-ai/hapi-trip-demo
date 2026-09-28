import { parse } from "yaml";

const names = ["flights.openapi.yaml", "hotels.openapi.yaml", "transfers.openapi.yaml"];
const sources = await Promise.all(names.map(async (name) => parse(await Bun.file(`contracts/${name}`).text()) as Record<string, any>));
const facade = parse(await Bun.file("contracts/trip-federated.openapi.yaml").text()) as Record<string, any>;
const sourceOperations = new Map<string, unknown>();
for (const source of sources) for (const path of Object.values(source.paths as Record<string, Record<string, any>>)) {
  for (const operation of Object.values(path)) if (operation?.operationId) {
    if (sourceOperations.has(operation.operationId)) throw new Error(`Duplicate source operationId: ${operation.operationId}`);
    sourceOperations.set(operation.operationId, operation);
  }
}
const facadeOperations = new Map<string, any>();
for (const path of Object.values(facade.paths as Record<string, Record<string, any>>)) for (const operation of Object.values(path)) {
  if (operation?.operationId) facadeOperations.set(operation.operationId, operation);
}
for (const [id, source] of sourceOperations) {
  const composed = facadeOperations.get(id);
  if (!composed) throw new Error(`Composed contract omits ${id}`);
  if (JSON.stringify(source["x-hapi-planning"] ?? null) !== JSON.stringify(composed["x-hapi-planning"] ?? null)) throw new Error(`Planning metadata drift for ${id}`);
}
if (facade.info?.["x-hapi-demo-composition"]?.["not-runtime-federation"] !== true) throw new Error("Composed contract must disclose it is not runtime federation.");
console.log(`Contract parity passed: ${sourceOperations.size} source operations represented in composed façade.`);
