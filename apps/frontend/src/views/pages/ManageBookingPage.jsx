import AllBooking from "@/components/manage-Booking/AllBooking";
import BlockBooking from "@/components/manage-Booking/BlockBooking";
import CalenderBooking from "@/components/manage-Booking/CalenderBooking";
import ConfirmedBooking from "@/components/manage-Booking/ConfirmedBooking";

const ManageBookingPage = () => {
  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <AllBooking />
        <ConfirmedBooking />
      </div>
      <div className="space-y-6">
        <BlockBooking />
        <CalenderBooking />
      </div>
    </div>
  );
};

export default ManageBookingPage;
