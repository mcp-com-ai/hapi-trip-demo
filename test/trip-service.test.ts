import { beforeEach, describe, expect, test } from "bun:test";
import { tripService } from "../src/lauras-trip/TripService";

beforeEach(() => tripService.reset());

describe("Laura's deterministic trip services", () => {
  test("lists and books Laura's selected flight", () => {
    expect(tripService.listFlights().flights).toHaveLength(1);
    expect(tripService.selectFlight("flight-cun-101").selectedFlight.id).toBe("flight-cun-101");
    expect(tripService.bookFlight("flight-cun-101", "laura-demo").status).toBe("booked");
  });

  test("Hotel B is unavailable and does not book a hotel", () => {
    const result = tripService.bookHotel("hotel-b", "laura-demo");
    expect(result).toEqual(expect.objectContaining({ unavailable: true, hotelId: "hotel-b" }));
    expect(tripService.itinerary().hotels.find((hotel) => hotel.id === "hotel-b")?.status).toBe("unavailable");
  });

  test("Hotel C can be selected and booked after the failed alternate", () => {
    expect(tripService.selectHotel("hotel-c").selectedHotel.id).toBe("hotel-c");
    expect(tripService.bookHotel("hotel-c", "laura-demo")).toEqual(expect.objectContaining({ status: "booked" }));
  });

  test("cancelling a booked flight changes only its local state", () => {
    tripService.bookFlight("flight-cun-101", "laura-demo");
    expect(tripService.cancelFlight("flight-cun-101")).toEqual({ flightId: "flight-cun-101", status: "cancelled" });
    expect(tripService.itinerary().flights[0]?.status).toBe("cancelled");
  });
});
