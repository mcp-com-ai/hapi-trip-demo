# Laura's Trip fact vocabulary

Facts are declared business state. They are not tool names, raw fields, a
traveller's unverified statement, or a permanent server-side memory.

| Fact | Meaning | Established by |
| --- | --- | --- |
| `flights.consulted` / `hotels.consulted` | The relevant local catalogue was reviewed. | Successful list operation. |
| `flight.selected` / `hotel.selected` | Laura explicitly selected an available option, or the client has independently verified the same choice. | Explicit selection operation or verified initial fact. |
| `traveller.identity.verified` | The client has verified synthetic Laura identity. | Trusted client initial fact; never context discovery. |
| `flight.booked`, `hotel.booked`, `trip.booked` | The declared booking operation completed. | Successful local booking operation. |
| `flight.cancelled`, `hotel.cancelled` | A prior verified booking was cancelled. | Successful cancellation operation. |

`capability_context` returns this vocabulary and relevant relationships; it
does not assert any of it. `capability_plan` accepts only verified facts. The
compiler's `operation.*.completed` entries are technical facts and remain
secondary to this business vocabulary.
