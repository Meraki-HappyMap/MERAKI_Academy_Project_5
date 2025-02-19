import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  format,
  isAfter,
  isBefore,
  addDays,
  startOfDay,
  endOfDay,
  isWithinInterval,
  isSameDay,
  isValid,
} from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, Loader2 } from "lucide-react";
import bookingsApi from "@/services/bookings";
import { cn } from "@/lib/utils";

function BlockBooking({ placeId, existingBookings = [] }) {
  const [dateRange, setDateRange] = useState({
    from: undefined,
    to: undefined,
  });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add console log to debug bookings data
  console.log("Existing bookings:", existingBookings);

  const { mutate: blockDates } = bookingsApi.useCreate(placeId, {
    onSuccess: () => {
      toast({
        title: "Dates blocked successfully",
        description: "The selected dates have been blocked.",
      });
      setDateRange({ from: undefined, to: undefined });
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast({
        title: "Error blocking dates",
        description:
          error.message ||
          "Failed to block the selected dates. Make sure you have permission to block this place.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const { mutate: unblockDate } = bookingsApi.useUpdate(null, {
    onSuccess: () => {
      toast({
        title: "Date unblocked",
        description: "The selected date has been unblocked.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error unblocking date",
        description:
          error.message || "Failed to unblock the date. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleBlockDates = () => {
    if (!placeId) {
      toast({
        title: "Error",
        description: "Place ID is required to block dates.",
        variant: "destructive",
      });
      return;
    }

    if (!dateRange.from || !dateRange.to) {
      toast({
        title: "Select dates",
        description: "Please select both start and end dates.",
        variant: "destructive",
      });
      return;
    }

    // Check if any existing bookings overlap with the selected date range
    const hasOverlap = existingBookings.some((booking) => {
      try {
        const bookingStart = new Date(booking.start_time);
        const bookingEnd = new Date(booking.end_time);

        if (isNaN(bookingStart.getTime()) || isNaN(bookingEnd.getTime())) {
          return false;
        }

        return (
          (isAfter(bookingStart, startOfDay(dateRange.from)) &&
            isBefore(bookingStart, endOfDay(dateRange.to))) ||
          (isAfter(bookingEnd, startOfDay(dateRange.from)) &&
            isBefore(bookingEnd, endOfDay(dateRange.to)))
        );
      } catch {
        return false;
      }
    });

    if (hasOverlap) {
      toast({
        title: "Booking conflict",
        description:
          "There are existing bookings within the selected date range. Please choose different dates.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    blockDates({
      start_time: startOfDay(dateRange.from).toISOString(),
      end_time: endOfDay(dateRange.to).toISOString(),
      is_blocked: true,
      place_id: placeId,
      status: "blocked",
    });
  };

  const handleUnblock = (bookingId) => {
    if (!bookingId) {
      toast({
        title: "Error",
        description: "Booking ID is required to unblock dates.",
        variant: "destructive",
      });
      return;
    }

    unblockDate({
      id: bookingId,
      is_blocked: false,
      status: "cancelled",
    });
  };

  const blockedDates = existingBookings.filter((booking) => booking.is_blocked);

  const isDateDisabled = (date) => {
    if (!date || !isValid(date)) return true;
    if (isBefore(date, addDays(new Date(), -1))) return true;

    return existingBookings.some((booking) => {
      if (!booking.start_time || !booking.end_time) return false;
      try {
        const bookingStart = startOfDay(new Date(booking.start_time));
        const bookingEnd = endOfDay(new Date(booking.end_time));
        return isWithinInterval(date, {
          start: bookingStart,
          end: bookingEnd,
        });
      } catch {
        return false;
      }
    });
  };

  const handleSelect = (range) => {
    if (!range) {
      setDateRange({ from: undefined, to: undefined });
      return;
    }

    // If we have a from date but no to date, this is a new selection
    if (range.from && !range.to) {
      setDateRange({ from: range.from, to: undefined });
      return;
    }

    // If we have both dates, make sure they're in the correct order
    if (range.from && range.to) {
      const from = startOfDay(range.from);
      const to = startOfDay(range.to);

      // If the dates are in reverse order, swap them
      if (isAfter(from, to)) {
        setDateRange({ from: to, to: from });
      } else {
        setDateRange({ from, to });
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Block Dates</h2>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Select Date Range to Block
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={handleSelect}
                  numberOfMonths={1}
                  disabled={isDateDisabled}
                  initialFocus
                  className="rounded-md border"
                  components={{
                    Day: ({ date, ...props }) => {
                      if (!date) return null;

                      const isDisabled = isDateDisabled(date);
                      const isSelected =
                        dateRange.from &&
                        dateRange.to &&
                        isWithinInterval(date, {
                          start: dateRange.from,
                          end: dateRange.to,
                        });
                      const isRangeStart =
                        dateRange.from && isSameDay(date, dateRange.from);
                      const isRangeEnd =
                        dateRange.to && isSameDay(date, dateRange.to);

                      return (
                        <button
                          type="button"
                          {...props}
                          className={cn(
                            "h-9 w-9 p-0 font-normal",
                            props.className,
                            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            "rounded-md",
                            isSelected && "bg-accent/50",
                            (isRangeStart || isRangeEnd) &&
                              "bg-primary text-primary-foreground",
                            isDisabled &&
                              "bg-red-50 dark:bg-red-900/20 cursor-not-allowed opacity-50"
                          )}
                          disabled={isDisabled}
                        >
                          <time dateTime={format(date, "yyyy-MM-dd")}>
                            {format(date, "d")}
                          </time>
                          {isDisabled && (
                            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                              <div className="w-1 h-1 bg-red-500 rounded-full" />
                            </div>
                          )}
                        </button>
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
                    day: "h-9 w-9 p-0 font-normal hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                    day_range_end: "rounded-r-md",
                    day_range_start: "rounded-l-md",
                    day_range_middle: "bg-accent/50",
                    day_selected:
                      "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                    day_today: "bg-accent text-accent-foreground",
                    day_outside: "text-muted-foreground opacity-50",
                    day_disabled: "text-muted-foreground opacity-50",
                    day_hidden: "invisible",
                  }}
                />
              </div>

              {(dateRange.from || dateRange.to) && (
                <div className="rounded-md border p-4 bg-gray-50 dark:bg-gray-800">
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="h-4 w-4 text-gray-500" />
                    <div className="grid gap-1">
                      <p className="text-sm font-medium">Selected Range</p>
                      <p className="text-sm text-gray-500">
                        {dateRange.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "PPP")} -{" "}
                              {format(dateRange.to, "PPP")}
                            </>
                          ) : (
                            format(dateRange.from, "PPP")
                          )
                        ) : (
                          "Pick a date range"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <Button
                className="w-full"
                onClick={handleBlockDates}
                disabled={!dateRange.from || !dateRange.to || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Blocking dates...
                  </>
                ) : (
                  "Block Selected Dates"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {blockedDates.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Currently Blocked Dates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {blockedDates.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md"
                >
                  <div className="grid gap-1">
                    <p className="font-medium">
                      {format(new Date(booking.start_time), "PPP")}
                    </p>
                    <p className="text-sm text-gray-500">
                      to {format(new Date(booking.end_time), "PPP")}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => handleUnblock(booking.id)}
                  >
                    Unblock
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default BlockBooking;
