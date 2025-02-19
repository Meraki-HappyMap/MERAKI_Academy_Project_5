import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import {
  format,
  isWithinInterval,
  isSameDay,
  startOfDay,
  endOfDay,
} from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

function CalenderBooking({ bookings = [] }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Get bookings for the selected date
  const selectedDateBookings = bookings.filter((booking) =>
    isSameDay(new Date(booking.start_time), selectedDate)
  );

  // Function to check if a date has bookings
  const hasBookings = (date) => {
    return bookings.some((booking) => {
      try {
        return isWithinInterval(startOfDay(date), {
          start: startOfDay(new Date(booking.start_time)),
          end: endOfDay(new Date(booking.end_time)),
        });
      } catch {
        return false;
      }
    });
  };

  // Function to get booking status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "border-green-500 text-green-500";
      case "pending":
        return "border-yellow-500 text-yellow-500";
      case "cancelled":
        return "border-red-500 text-red-500";
      default:
        return "border-gray-500 text-gray-500";
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Calendar View</h2>
      <div className="grid gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md border"
                components={{
                  Day: ({ date, ...props }) => {
                    if (!date) return null;

                    const hasBookingsForDay = hasBookings(date);
                    const bookingsForDay = bookings.filter((booking) => {
                      try {
                        return isSameDay(new Date(booking.start_time), date);
                      } catch {
                        return false;
                      }
                    });

                    const confirmedCount = bookingsForDay.filter(
                      (b) => b.status === "confirmed"
                    ).length;
                    const pendingCount = bookingsForDay.filter(
                      (b) => b.status === "pending"
                    ).length;
                    const blockedCount = bookingsForDay.filter(
                      (b) => b.is_blocked
                    ).length;

                    return (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div
                              {...props}
                              className={cn(
                                "relative h-9 w-9 p-0 text-center text-sm focus-within:relative focus-within:z-20 hover:bg-accent",
                                props.className,
                                hasBookingsForDay &&
                                  "bg-gray-50 dark:bg-gray-800",
                                isSameDay(date, selectedDate) &&
                                  "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground"
                              )}
                            >
                              <time dateTime={format(date, "yyyy-MM-dd")}>
                                {format(date, "d")}
                              </time>
                              {hasBookingsForDay && (
                                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
                                  {confirmedCount > 0 && (
                                    <div className="w-1 h-1 bg-green-500 rounded-full" />
                                  )}
                                  {pendingCount > 0 && (
                                    <div className="w-1 h-1 bg-yellow-500 rounded-full" />
                                  )}
                                  {blockedCount > 0 && (
                                    <div className="w-1 h-1 bg-red-500 rounded-full" />
                                  )}
                                </div>
                              )}
                            </div>
                          </TooltipTrigger>
                          {hasBookingsForDay && (
                            <TooltipContent className="p-0" sideOffset={5}>
                              <div className="p-3 space-y-3">
                                <div className="flex items-center gap-2">
                                  <CalendarIcon className="h-4 w-4 text-gray-500" />
                                  <p className="font-medium">
                                    {format(date, "MMMM d, yyyy")}
                                  </p>
                                </div>
                                <div className="space-y-1.5">
                                  {confirmedCount > 0 && (
                                    <p className="text-sm text-green-600 dark:text-green-400">
                                      {confirmedCount} confirmed booking
                                      {confirmedCount !== 1 ? "s" : ""}
                                    </p>
                                  )}
                                  {pendingCount > 0 && (
                                    <p className="text-sm text-yellow-600 dark:text-yellow-400">
                                      {pendingCount} pending booking
                                      {pendingCount !== 1 ? "s" : ""}
                                    </p>
                                  )}
                                  {blockedCount > 0 && (
                                    <p className="text-sm text-red-600 dark:text-red-400">
                                      {blockedCount} blocked period
                                      {blockedCount !== 1 ? "s" : ""}
                                    </p>
                                  )}
                                </div>
                                <div className="border-t pt-2 mt-2 space-y-1.5">
                                  {bookingsForDay.map((booking) => {
                                    const startTime = new Date(
                                      booking.start_time
                                    );
                                    const endTime = new Date(booking.end_time);

                                    if (
                                      isNaN(startTime.getTime()) ||
                                      isNaN(endTime.getTime())
                                    ) {
                                      return null;
                                    }

                                    return (
                                      <div
                                        key={booking.id}
                                        className="text-sm flex items-center justify-between gap-3"
                                      >
                                        <div className="min-w-0 flex-1">
                                          <p className="truncate">
                                            {booking.user_name ||
                                              booking.booked_by}
                                          </p>
                                          <p className="text-gray-500 dark:text-gray-400">
                                            {format(startTime, "h:mm a")} -{" "}
                                            {format(endTime, "h:mm a")}
                                          </p>
                                        </div>
                                        <Badge
                                          variant="outline"
                                          className={cn(
                                            "text-xs shrink-0",
                                            booking.is_blocked
                                              ? "border-red-500 text-red-500"
                                              : getStatusColor(booking.status)
                                          )}
                                        >
                                          {booking.is_blocked
                                            ? "Blocked"
                                            : booking.status}
                                        </Badge>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    );
                  },
                }}
                classNames={{
                  months:
                    "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                  month: "space-y-4",
                  caption: "flex justify-center pt-1 relative items-center",
                  caption_label: "text-sm font-medium",
                  nav: "space-x-1 flex items-center",
                  nav_button:
                    "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex",
                  head_cell:
                    "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                  row: "flex w-full mt-2",
                  cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
                  day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-accent rounded-md",
                  day_selected:
                    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                  day_today: "bg-accent text-accent-foreground",
                  day_outside: "text-muted-foreground opacity-50",
                  day_disabled: "text-muted-foreground opacity-50",
                  day_range_middle:
                    "aria-selected:bg-accent aria-selected:text-accent-foreground",
                  day_hidden: "invisible",
                }}
              />
            </div>
          </CardContent>
        </Card>

        {selectedDateBookings.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>
                Bookings for {format(selectedDate, "MMMM d, yyyy")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedDateBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div>
                      <p className="font-medium">
                        {booking.user_name || booking.booked_by}
                      </p>
                      <p className="text-sm text-gray-500">
                        {format(new Date(booking.start_time), "h:mm a")} -{" "}
                        {format(new Date(booking.end_time), "h:mm a")}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        "ml-auto",
                        booking.is_blocked
                          ? "border-red-500 text-red-500"
                          : getStatusColor(booking.status)
                      )}
                    >
                      {booking.is_blocked ? "Blocked" : booking.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default CalenderBooking;
