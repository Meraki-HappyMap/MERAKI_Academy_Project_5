import BookingUser from "@/components/manage-Booking/BookingUser";
import CalenderBooking from "@/components/manage-Booking/CalenderBooking";

function ManageBookingForUser() {
  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <BookingUser />
      </div>
      <div className="space-y-6">
        <CalenderBooking />
      </div>
    </div>
  );
}

export default ManageBookingForUser;
