import React, { useState } from "react";
import UserInfo from "./UserInfo"; // استخدام نفس المكون لعرض البيانات
import { Button } from "@/components/ui/button";

const userData = {
  avatarUrl: "https://via.placeholder.com/100",
  username: "Saleh Alrawajfa",
};

function ConfirmedBooking() {
  const [visibleBookings, setVisibleBookings] = useState(3);

  const bookingData = [
    {
      id: 6,
      place_id: 3,
      user_id: 2,
      start_time: "2025-02-10T16:00:00.000Z",
      end_time: "2025-02-10T18:00:00.000Z",
      is_deleted: 0,
      created_at: "2025-02-08T11:16:08.395Z",
      updated_at: "2025-02-08T11:16:08.395Z",
      booked_by: "alrawajfa.s",
    },
    {
      id: 5,
      place_id: 3,
      user_id: 2,
      start_time: "2025-02-10T18:00:00.000Z",
      end_time: "2025-02-10T22:00:00.000Z",
      is_deleted: 0,
      created_at: "2025-02-08T09:49:27.241Z",
      updated_at: "2025-02-08T11:17:34.172Z",
      booked_by: "alrawajfa.s",
    },
    {
      id: 10,
      place_id: 3,
      user_id: 2,
      start_time: "2025-02-15T18:00:00.000Z",
      end_time: "2025-02-15T20:00:00.000Z",
      is_deleted: 0,
      created_at: "2025-02-12T16:44:56.623Z",
      updated_at: "2025-02-12T16:45:36.708Z",
      booked_by: "alrawajfa.s",
    },
    {
      id: 5,
      place_id: 3,
      user_id: 2,
      start_time: "2025-02-10T18:00:00.000Z",
      end_time: "2025-02-10T22:00:00.000Z",
      is_deleted: 0,
      created_at: "2025-02-08T09:49:27.241Z",
      updated_at: "2025-02-08T11:17:34.172Z",
      booked_by: "alrawajfa.s",
    },
    {
      id: 10,
      place_id: 3,
      user_id: 2,
      start_time: "2025-02-15T18:00:00.000Z",
      end_time: "2025-02-15T20:00:00.000Z",
      is_deleted: 0,
      created_at: "2025-02-12T16:44:56.623Z",
      updated_at: "2025-02-12T16:45:36.708Z",
      booked_by: "alrawajfa.s",
    },
  ];

  return (
    <div className="p-1">
      <h1 className="text-xl font-bold mb-3">Accepted Booking</h1>
      <div className="space-y-3">
        {bookingData.slice(0, visibleBookings).map((booking) => (
          <UserInfo key={booking.id} booking={booking} />
        ))}
      </div>
      {visibleBookings < bookingData.length && (
        <div className="mt-3 flex justify-center">
          <Button
            onClick={() => setVisibleBookings(bookingData.length)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
          >
            Show More
          </Button>
        </div>
      )}
    </div>
  );
}

export default ConfirmedBooking;
