import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Calendar, Clock, User } from "lucide-react";
import bookingsApi from "@/services/bookings";
import { useToast } from "@/hooks/use-toast";

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "confirmed":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
    case "cancelled":
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
  }
};

function UserInfo({ booking }) {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const { toast } = useToast();

  const { mutate: updateBooking, isLoading: isUpdating } =
    bookingsApi.useUpdate(booking.id, {
      onSuccess: () => {
        toast({
          title: "Booking updated",
          description: "The booking status has been successfully updated.",
        });
        setIsConfirmDialogOpen(false);
        setIsRejectDialogOpen(false);
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message || "Failed to update booking status.",
          variant: "destructive",
        });
      },
    });

  const handleConfirm = () => {
    updateBooking({ status: "confirmed" });
  };

  const handleReject = () => {
    updateBooking({ status: "cancelled" });
  };

  return (
    <>
      <Card className="shadow-lg rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <User className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">
                {booking.user_name || booking.booked_by}
              </CardTitle>
              <p className="text-sm text-gray-500">@{booking.booked_by}</p>
            </div>
          </div>
          <Badge className={getStatusColor(booking.status)}>
            {booking.status || "Pending"}
          </Badge>
        </CardHeader>

        <CardContent className="pt-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <Calendar className="w-4 h-4" />
                <div>
                  <p className="text-sm font-medium">Start</p>
                  <p className="text-sm">
                    {format(new Date(booking.start_time), "PPP")}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <Clock className="w-4 h-4" />
                <div>
                  <p className="text-sm font-medium">Duration</p>
                  <p className="text-sm">
                    {format(new Date(booking.start_time), "p")} -{" "}
                    {format(new Date(booking.end_time), "p")}
                  </p>
                </div>
              </div>
            </div>

            {booking.status === "pending" && (
              <div className="flex justify-end space-x-3 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsRejectDialogOpen(true)}
                  disabled={isUpdating}
                >
                  Reject
                </Button>
                <Button
                  onClick={() => setIsConfirmDialogOpen(true)}
                  disabled={isUpdating}
                >
                  Accept
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to confirm this booking? This will notify
              the user and update the booking status.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsConfirmDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleConfirm} disabled={isUpdating}>
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to reject this booking? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRejectDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={isUpdating}
            >
              Reject Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default UserInfo;
