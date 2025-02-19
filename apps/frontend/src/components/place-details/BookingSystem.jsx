import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast.js";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Loader2,
  Calendar as CalendarIcon,
  Clock,
  ArrowRight,
  Ban,
  CheckCircle2,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import bookingsApi from "@/services/bookings";
import { getCategoryById } from "@/lib/constants/categories.js";
import {
  format,
  addHours,
  setHours,
  setMinutes,
  isWithinInterval,
  differenceInDays,
} from "date-fns";

const HOURLY_CATEGORIES = ["Entertainment", "Sports"];
const AVAILABLE_HOURS = Array.from({ length: 13 }, (_, i) => i + 8); // 8 AM to 8 PM

const BookingWidget = ({ place }) => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startHour, setStartHour] = useState("");
  const [duration, setDuration] = useState("");
  const [isAvailable, setIsAvailable] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [bookingMode, setBookingMode] = useState("hourly");

  // Determine if the place should be booked by hours or days
  useEffect(() => {
    if (place?.category_id) {
      const category = getCategoryById(place.category_id);
      setBookingMode(category === "Entertainment" ? "hourly" : "daily");
    }
  }, [place?.category_id]);

  const { data: existingBookings } = bookingsApi.usePlaceBookings(place?.id, {
    onSuccess: (data) => {
      if (data?.data) {
        setBookedSlots(
          data.data.map((booking) => ({
            start: new Date(booking.start_time),
            end: new Date(booking.end_time),
          }))
        );
      }
    },
  });

  const { mutate: checkAvailability, isLoading: checkingAvailability } =
    bookingsApi.useCheckAvailability(place?.id, {
      onSuccess: (data) => {
        setIsAvailable(data.isAvailable);
        if (!data.isAvailable) {
          toast({
            title: "Time not available",
            description:
              "This time slot is already booked. Please choose another time.",
            variant: "destructive",
          });
        }
      },
    });

  const { mutate: createBooking, isLoading: isBooking } = bookingsApi.useCreate(
    place?.id,
    {
      onSuccess: () => {
        toast({
          title: "Booking confirmed! 🎉",
          description:
            "Your booking has been successfully confirmed. Have fun!",
        });
        setSelectedDate(null);
        setEndDate(null);
        setStartHour("");
        setDuration("");
        setIsAvailable(null);
      },
    }
  );

  const isDateBooked = (date) => {
    return bookedSlots.some((slot) =>
      isWithinInterval(date, { start: slot.start, end: slot.end })
    );
  };

  useEffect(() => {
    if (!selectedDate) return;

    if (bookingMode === "hourly" && selectedDate && startHour && duration) {
      const startTime = setMinutes(
        setHours(selectedDate, parseInt(startHour)),
        0
      );
      const endTime = addHours(startTime, parseInt(duration));

      checkAvailability({
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
      });
    } else if (bookingMode === "daily" && selectedDate && endDate) {
      const startTime = setHours(selectedDate, 14); // Check-in at 2 PM
      const endTime = setHours(endDate, 11); // Check-out at 11 AM

      checkAvailability({
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
      });
    }
  }, [selectedDate, endDate, startHour, duration, bookingMode]);

  const handleBooking = () => {
    let startTime, endTime;

    if (bookingMode === "hourly") {
      if (!selectedDate || !startHour || !duration) return;
      startTime = setMinutes(setHours(selectedDate, parseInt(startHour)), 0);
      endTime = addHours(startTime, parseInt(duration));
    } else {
      if (!selectedDate || !endDate) return;
      startTime = setHours(selectedDate, 14); // Check-in at 2 PM
      endTime = setHours(endDate, 11); // Check-out at 11 AM
    }

    createBooking({
      start_time: startTime.toISOString(),
      end_time: endTime.toISOString(),
    });
  };

  const renderDailyBookingInfo = () => {
    if (!selectedDate || !endDate) return null;

    const nights = differenceInDays(endDate, selectedDate);
    const pricePerNight = place.price_per_day || place.price || 0;
    const totalPrice = nights * pricePerNight;

    return (
      <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <div className="space-y-1">
            <p className="font-medium">Check-in</p>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <CalendarIcon className="h-4 w-4" />
              <p>{format(selectedDate, "EEE, MMM d, yyyy")}</p>
            </div>
            <p className="text-xs text-gray-500">From 2:00 PM</p>
          </div>
          <ArrowRight className="h-4 w-4 text-gray-400" />
          <div className="space-y-1">
            <p className="font-medium">Check-out</p>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <CalendarIcon className="h-4 w-4" />
              <p>{format(endDate, "EEE, MMM d, yyyy")}</p>
            </div>
            <p className="text-xs text-gray-500">Until 11:00 AM</p>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {pricePerNight} × {nights} night{nights !== 1 ? "s" : ""}
            </p>
            <p className="font-medium">${totalPrice}</p>
          </div>
          {place.cleaning_fee && (
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Cleaning fee
              </p>
              <p className="font-medium">${place.cleaning_fee}</p>
            </div>
          )}
          <Separator />
          <div className="flex justify-between items-center font-semibold">
            <p>Total</p>
            <p>${totalPrice + (place.cleaning_fee || 0)}</p>
          </div>
        </div>
      </div>
    );
  };

  if (!place) return null;

  return (
    <Card
      className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg"
      id="booking-section"
    >
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">
          Book {place.name}
        </CardTitle>
        <CardDescription>
          {bookingMode === "hourly" ? (
            "Choose your preferred date and time to have fun!"
          ) : (
            <div className="flex items-center gap-2 mt-1">
              <p className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Check-in: 2:00 PM
              </p>
              <span>•</span>
              <p className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Check-out: 11:00 AM
              </p>
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {bookingMode === "daily" ? (
          // Daily booking calendar
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Your Dates</label>
              <div className="relative flex justify-center">
                <Calendar
                  mode="range"
                  selected={{
                    from: selectedDate,
                    to: endDate,
                  }}
                  onSelect={(range) => {
                    setSelectedDate(range?.from);
                    setEndDate(range?.to);
                  }}
                  disabled={
                    (date) =>
                      date < new Date() || // Can't book past dates
                      isDateBooked(date) // Can't book already booked dates
                  }
                  className="rounded-md border bg-white dark:bg-gray-800"
                  numberOfMonths={2}
                  showOutsideDays={false}
                  classNames={{
                    months: "flex flex-col space-y-4",
                    head_cell: "w-10 font-normal text-muted-foreground",
                    cell: "h-10 w-10 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                    day: "h-10 w-10 p-0 font-normal aria-selected:opacity-100",
                    day_range_end: "day-range-end",
                    day_selected:
                      "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                    day_today: "bg-accent text-accent-foreground",
                    day_outside: "day-outside text-muted-foreground opacity-50",
                    day_disabled: "text-muted-foreground opacity-50",
                    day_range_middle:
                      "aria-selected:bg-accent aria-selected:text-accent-foreground",
                    day_hidden: "invisible",
                    root: "w-full max-w-none p-3",
                    nav_button:
                      "h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100",
                    nav_button_previous: "absolute left-1",
                    nav_button_next: "absolute right-1",
                    caption: "relative flex justify-center py-2 px-10",
                  }}
                />
              </div>
            </div>

            {renderDailyBookingInfo()}

            {isAvailable === false && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription className="flex items-center gap-2">
                  <Ban className="h-4 w-4" />
                  Some dates in your selection are not available. Please try
                  different dates.
                </AlertDescription>
              </Alert>
            )}

            {isAvailable === true && (
              <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900">
                <AlertDescription className="text-green-800 dark:text-green-200 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Perfect! These dates are available.
                </AlertDescription>
              </Alert>
            )}
          </div>
        ) : (
          // Hourly booking options
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium">Pick a Date</label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={
                  (date) =>
                    date < new Date() || // Can't book past dates
                    isDateBooked(date) // Can't book already booked dates
                }
                className="rounded-md border"
              />
            </div>

            {selectedDate && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Time</label>
                  <Select value={startHour} onValueChange={setStartHour}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {AVAILABLE_HOURS.map((hour) => (
                        <SelectItem key={hour} value={hour.toString()}>
                          {format(setHours(new Date(), hour), "h:mm a")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Duration</label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger>
                      <SelectValue placeholder="How long?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 hour</SelectItem>
                      <SelectItem value="2">2 hours</SelectItem>
                      <SelectItem value="3">3 hours</SelectItem>
                      <SelectItem value="4">4 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </>
        )}

        <Button
          className="w-full"
          size="lg"
          onClick={handleBooking}
          disabled={
            !isAvailable ||
            isBooking ||
            checkingAvailability ||
            (bookingMode === "hourly"
              ? !selectedDate || !startHour || !duration
              : !selectedDate || !endDate)
          }
        >
          {isBooking || checkingAvailability ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isBooking
                ? "Confirming your booking..."
                : "Checking availability..."}
            </>
          ) : (
            `Book Now${
              bookingMode === "daily" && selectedDate && endDate
                ? ` • $${
                    differenceInDays(endDate, selectedDate) *
                      (place.price_per_day || place.price || 0) +
                    (place.cleaning_fee || 0)
                  }`
                : ""
            }`
          )}
        </Button>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          {bookingMode === "hourly" ? (
            <>
              <p>• Select a date from the calendar</p>
              <p>• Choose your preferred start time</p>
              <p>• Pick how long you want to stay</p>
              <p>• Click &quot;Book Now&quot; to confirm your booking</p>
            </>
          ) : (
            <>
              <p>• Select your check-in and check-out dates</p>
              <p>• Standard check-in time is 2:00 PM</p>
              <p>• Standard check-out time is 11:00 AM</p>
              <p>• Prices are per night and may include additional fees</p>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingWidget;
