import { tripStore } from "./TripStore";

export class TripService {
  listFlights() { return { flights: [...tripStore.flights.values()].filter((flight) => flight.status === "available") }; }
  selectFlight(flightId: string) {
    const flight = tripStore.flights.get(flightId);
    if (!flight || flight.status !== "available") throw new Error("Flight is not available");
    return { selectedFlight: { id: flight.id, route: flight.route } };
  }
  bookFlight(flightId: string, travellerId: string) {
    const flight = tripStore.flights.get(flightId);
    if (!travellerId || !flight || flight.status !== "available") throw new Error("Flight booking requires an available flight and verified traveller");
    flight.status = "booked";
    return { bookingId: `flight-booking-${flightId}`, flightId, travellerId, status: "booked" };
  }
  modifyFlight(flightId: string, departureDate: string) {
    const flight = tripStore.flights.get(flightId);
    if (!flight || flight.status !== "booked") throw new Error("A booked flight is required");
    flight.date = departureDate;
    return { flightId, departureDate, status: "modified" };
  }
  cancelFlight(flightId: string) {
    const flight = tripStore.flights.get(flightId);
    if (!flight || flight.status !== "booked") throw new Error("A booked flight is required");
    flight.status = "cancelled";
    return { flightId, status: "cancelled" };
  }
  listHotels() { return { hotels: [...tripStore.hotels.values()] }; }
  selectHotel(hotelId: string) {
    const hotel = tripStore.hotels.get(hotelId);
    if (!hotel || hotel.status === "unavailable") throw new Error("Hotel selection is unavailable");
    return { selectedHotel: { id: hotel.id, name: hotel.name } };
  }
  bookHotel(hotelId: string, travellerId: string) {
    const hotel = tripStore.hotels.get(hotelId);
    if (hotel?.status === "unavailable") return { unavailable: true, hotelId, reason: "Hotel B is unavailable in this deterministic demo" };
    if (!travellerId || !hotel || hotel.status !== "available") throw new Error("Hotel booking requires an available hotel and verified traveller");
    hotel.status = "booked";
    return { bookingId: `hotel-booking-${hotelId}`, hotelId, travellerId, status: "booked" };
  }
  cancelHotel(hotelId: string) {
    const hotel = tripStore.hotels.get(hotelId);
    if (!hotel || hotel.status !== "booked") throw new Error("A booked hotel is required");
    hotel.status = "cancelled";
    return { hotelId, status: "cancelled" };
  }
  listTransfers() { return { transfers: [...tripStore.transfers.values()] }; }
  bookTransfer(transferId: string) {
    const transfer = tripStore.transfers.get(transferId);
    if (!transfer || transfer.status !== "available") throw new Error("Transfer is unavailable");
    transfer.status = "booked";
    return { bookingId: `transfer-booking-${transferId}`, transferId, status: "booked" };
  }
  itinerary() { return { flights: [...tripStore.flights.values()], hotels: [...tripStore.hotels.values()], transfers: [...tripStore.transfers.values()] }; }
  reset() { tripStore.reset(); return { status: "reset" }; }
}

export const tripService = new TripService();
