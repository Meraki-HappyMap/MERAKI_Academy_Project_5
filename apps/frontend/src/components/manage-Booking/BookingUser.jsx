import { useState } from "react";
import { motion } from "motion/react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Clock,
  MapPin,
  Calendar,
  DollarSign,
  ArrowRight,
  Trash2,
  PencilLine,
} from "lucide-react";
import { cn } from "@/lib/utils";

const getStatusColor = (status) => {
  switch (status) {
    case "upcoming":
      return "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-200";
    case "completed":
      return "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-200";
    case "cancelled":
      return "bg-gray-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-300";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-300";
  }
};

function BookingUser({ bookings = [], view = "grid" }) {
  const [visibleBookings, setVisibleBookings] = useState(6);

  const handleShowMore = () => {
    setVisibleBookings((prev) => prev + 6);
  };

  const GridView = ({ booking }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group"
    >
      <Card className="overflow-hidden hover:shadow-lg transition-all dark:hover:shadow-gray-800/20">
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={booking.image}
              alt={booking.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          <Badge
            className={cn(
              "absolute top-4 right-4 z-10",
              getStatusColor(booking.status)
            )}
          >
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </Badge>
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold line-clamp-1">
            {booking.name}
          </CardTitle>
          <CardDescription className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {booking.location}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 pb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="h-4 w-4" />
            <span>{format(new Date(booking.startTime), "MMM d, yyyy")}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Clock className="h-4 w-4" />
            <span>
              {format(new Date(booking.startTime), "h:mm a")} -{" "}
              {format(new Date(booking.endTime), "h:mm a")}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <DollarSign className="h-4 w-4" />
            <span>${booking.price}</span>
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <div className="flex gap-2 w-full">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 hover:bg-rose-500 hover:text-white dark:hover:bg-rose-500/20 dark:hover:text-rose-200"
            >
              <PencilLine className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 hover:bg-rose-500 hover:text-white dark:hover:bg-rose-500/20 dark:hover:text-rose-200"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );

  const ListView = ({ booking }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
    >
      <Card className="hover:shadow-lg transition-all dark:hover:shadow-gray-800/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={booking.image}
                alt={booking.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold line-clamp-1">
                    {booking.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {booking.location}
                  </p>
                </div>
                <Badge className={cn(getStatusColor(booking.status))}>
                  {booking.status.charAt(0).toUpperCase() +
                    booking.status.slice(1)}
                </Badge>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {format(new Date(booking.startTime), "MMM d, yyyy")}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="h-4 w-4" />
                  <span>{format(new Date(booking.startTime), "h:mm a")}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <DollarSign className="h-4 w-4" />
                  <span>${booking.price}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-rose-500 hover:text-white dark:hover:bg-rose-500/20 dark:hover:text-rose-200"
              >
                <PencilLine className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-rose-500 hover:text-white dark:hover:bg-rose-500/20 dark:hover:text-rose-200"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      <div
        className={cn(
          "grid gap-6",
          view === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
        )}
      >
        {bookings.slice(0, visibleBookings).map((booking) => (
          <div key={booking.id}>
            {view === "grid" ? (
              <GridView booking={booking} />
            ) : (
              <ListView booking={booking} />
            )}
          </div>
        ))}
      </div>

      {visibleBookings < bookings.length && (
        <div className="flex justify-center">
          <Button
            onClick={handleShowMore}
            variant="outline"
            className="hover:bg-rose-500 hover:text-white dark:hover:bg-rose-500/20 dark:hover:text-rose-200"
          >
            Show More
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

export default BookingUser;
