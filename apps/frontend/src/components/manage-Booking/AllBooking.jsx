import React, { useState } from "react";
import UserInfo from "./UserInfo";
import { Button } from "@/components/ui/button";

const bookingData = [
  {
    id: 6,
    place_id: 3,
    user_id: 2,
    start_time: "2025-02-10T16:00:00.000Z",
    end_time: "2025-02-10T18:00:00.000Z",
    booked_by: "alrawajfa.s",
  },
  {
    id: 5,
    place_id: 3,
    user_id: 2,
    start_time: "2025-02-10T18:00:00.000Z",
    end_time: "2025-02-10T22:00:00.000Z",
    booked_by: "alrawajfa.s",
  },
  {
    id: 10,
    place_id: 3,
    user_id: 2,
    start_time: "2025-02-15T18:00:00.000Z",
    end_time: "2025-02-15T20:00:00.000Z",
    booked_by: "alrawajfa.s",
  },
  {
    id: 11,
    place_id: 3,
    user_id: 2,
    start_time: "2025-02-18T18:00:00.000Z",
    end_time: "2025-02-18T20:00:00.000Z",
    booked_by: "alrawajfa.s",
  },
];

function AllBooking() {
  const [visibleBookings, setVisibleBookings] = useState(3);

  return (
    <div className="p-1">
      <h1 className="text-xl font-bold mb-3">All Booking</h1>
      <div className="space-y-3">
        {bookingData.slice(0, visibleBookings).map((booking) => (
          <UserInfo key={booking.id} booking={booking} />
        ))}
      </div>
      {visibleBookings < bookingData.length && (
        <div className="mt-3 flex justify-center">
          <Button onClick={() => setVisibleBookings(bookingData.length)} className="bg-black hover:bg-slate-700 text-white px-3 py-1 rounded-md text-sm">
            Show More
          </Button>
        </div>
      )}
    </div>
  );
}

export default AllBooking;
