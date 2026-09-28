# Laura's Trip Demo Policy

All identities, bookings, hotels, and flights are synthetic. The service uses
only loopback URLs and an in-memory store. A failed Hotel B booking is a
deliberate fixture: it never creates `hotel.booked`, never triggers an
automatic retry, and never performs compensation. The client chooses Hotel C,
records that verified choice, and asks HAPI to plan again.

Ports: the local REST/OpenAPI MCP server uses **3100**; the Arazzo workflow MCP
server uses **3101**. Stop them with `Ctrl-C`; no data persists after restart.
