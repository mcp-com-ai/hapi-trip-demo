# Laura's Trip — HAPI Capability Graph demo

> **In this contract-driven MCP trip-booking demo, Jev/TypeSafe helps when the
> user's intent is clear but the wording is ambiguous.**

This project is a local, (**greenfield**) synthetic demonstration of a 
contract-driven trip story about Laura's trip. Contract-driven interactions 
are modeled using **HAPI Capability Graphs**. Requires _HAPI v1.2.0_, private 
beta access, and a valid `TYPESAFE_API_KEY`.

[Request access](https://rebelion.la/contact) to the private beta binaries and 
obtain a valid `TYPESAFE_API_KEY` before proceeding. 
Contact the [HAPI Guy](https://www.linkedin.com/in/adrianescutia/) for any questions or support.

What is a **HAPI Capability Graph**?

A **HAPI Capability Graph** is a structured representation of the capabilities, 
contracts, and interactions within a system. It allows for declarative modeling 
of what actions are possible, under what conditions, and how different components 
of the system can interact to achieve specific goals. In this demo, it is used 
to model the contract-driven interactions for Laura's trip.

What is in this project?

Pure **contract-driven** interactions for Laura's trip are modeled using HAPI 
Capability Graphs. This project demonstrates how to define capabilities, contracts, 
and interactions in a declarative manner, and how to execute and verify them locally.


```sh
export YOUR_PROJECTS_DIR=/path/to/your/projects
cd $YOUR_PROJECTS_DIR/hapi-trip-demo
bun run generate:facade
HAPI_HOME=$PWD hapi openapi init lauras-trip
bun test
bun run serve
```

Do you have a valid `TYPESAFE_API_KEY` set in your environment?

```sh
export TYPESAFE_API_KEY=your_api_key_here
bun run serve:jev
```

In another terminal, run `bun run serve:workflows` to expose Arazzo workflow
tools on port 3101. The backend on port 3100 is a real local HAPI controller;
neither command uses `--url` nor `--headless`.

Read [the runbook](docs/RUNBOOK.md) to understand the workflow for Laura's trip 
demo. The important conceptual boundary is deliberate: `capability_context` 
describes declared vocabulary; `capability_plan` consumes verified facts and 
does not call an API. In decision authority, a client invokes the next allowed 
tool and re-plans.
