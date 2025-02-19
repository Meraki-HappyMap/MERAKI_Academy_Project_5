import { useState } from "react";
import PlaceInfo from "./PlaceInfo";
import { Button } from "@/components/ui/button";

function BookingUser() {
  const [visibleBookings, setVisibleBookings] = useState(3);

  const bookingData = [
    {
      id: 6,
      place_id: 3,
      user_id: 2,
      start_time: "2025-02-10T16:00:00.000Z",
      end_time: "2025-02-10T18:00:00.000Z",
      is_deleted: 0,
      booked_by: "alrawajfa.s",
    },
    {
      id: 5,
      place_id: 3,
      user_id: 2,
      start_time: "2025-02-10T18:00:00.000Z",
      end_time: "2025-02-10T22:00:00.000Z",
      is_deleted: 0,
      booked_by: "alrawajfa.s",
    },
    {
      id: 10,
      place_id: 3,
      user_id: 2,
      start_time: "2025-02-15T18:00:00.000Z",
      end_time: "2025-02-15T20:00:00.000Z",
      is_deleted: 0,
      booked_by: "alrawajfa.s",
    },
    {
      id: 6,
      place_id: 3,
      user_id: 2,
      start_time: "2025-02-10T16:00:00.000Z",
      end_time: "2025-02-10T18:00:00.000Z",
      is_deleted: 0,
      booked_by: "alrawajfa.s",
    },
    {
      id: 5,
      place_id: 3,
      user_id: 2,
      start_time: "2025-02-10T18:00:00.000Z",
      end_time: "2025-02-10T22:00:00.000Z",
      is_deleted: 0,
      booked_by: "alrawajfa.s",
    },
    {
      id: 10,
      place_id: 3,
      user_id: 2,
      start_time: "2025-02-15T18:00:00.000Z",
      end_time: "2025-02-15T20:00:00.000Z",
      is_deleted: 0,
      booked_by: "alrawajfa.s",
    },
  ];

  return (
    <div className="p-1">
      <h1 className="text-xl font-bold mb-3">my Booking</h1>
      <div className="space-y-3">
        {bookingData.slice(0, visibleBookings).map((booking) => (
          <PlaceInfo
            key={`${booking.id}-${booking.start_time}`}
            booking={booking}
          />
        ))}
      </div>
      {visibleBookings < bookingData.length && (
        <div className="mt-3 flex justify-center">
          <Button onClick={() => setVisibleBookings(bookingData.length)}>
            Show More
          </Button>
        </div>
      )}
    </div>
  );
}

export default BookingUser;
