export type Flight = { id: string; route: string; date: string; status: "available" | "booked" | "cancelled" };
export type Hotel = { id: string; name: string; status: "available" | "unavailable" | "booked" | "cancelled" };
export type Transfer = { id: string; status: "available" | "booked" };

export class TripStore {
  readonly flights = new Map<string, Flight>();
  readonly hotels = new Map<string, Hotel>();
  readonly transfers = new Map<string, Transfer>();

  reset() {
    this.flights.clear();
    this.hotels.clear();
    this.transfers.clear();
    this.flights.set("flight-cun-101", { id: "flight-cun-101", route: "Austin → Cancún", date: "2026-10-10", status: "available" });
    this.hotels.set("hotel-a", { id: "hotel-a", name: "Hotel A", status: "available" });
    this.hotels.set("hotel-b", { id: "hotel-b", name: "Hotel B", status: "unavailable" });
    this.hotels.set("hotel-c", { id: "hotel-c", name: "Hotel C", status: "available" });
    this.transfers.set("transfer-cun-1", { id: "transfer-cun-1", status: "available" });
  }
}

export const tripStore = new TripStore();
tripStore.reset();
