import { useState, useMemo } from "react";
import UserInfo from "./UserInfo";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

function AllBooking({ bookings = [] }) {
  const [visibleBookings, setVisibleBookings] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredAndSortedBookings = useMemo(() => {
    let result = [...bookings];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (booking) =>
          booking.booked_by.toLowerCase().includes(searchQuery.toLowerCase()) ||
          booking.user_name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((booking) => booking.status === statusFilter);
    }

    // Apply sorting
    result.sort((a, b) => {
      const dateA = new Date(a.start_time);
      const dateB = new Date(b.start_time);

      switch (sortBy) {
        case "newest":
          return dateB - dateA;
        case "oldest":
          return dateA - dateB;
        default:
          return 0;
      }
    });

    return result;
  }, [bookings, searchQuery, sortBy, statusFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <h2 className="text-2xl font-bold">All Bookings</h2>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <Input
            placeholder="Search by user..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-[200px]"
          />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[140px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[140px]">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredAndSortedBookings.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No bookings found</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {filteredAndSortedBookings
                .slice(0, visibleBookings)
                .map((booking) => (
                  <UserInfo
                    key={`${booking.id}-${booking.start_time}`}
                    booking={booking}
                  />
                ))}
            </div>

            {visibleBookings < filteredAndSortedBookings.length && (
              <div className="flex justify-center mt-6">
                <Button
                  variant="outline"
                  onClick={() => setVisibleBookings((prev) => prev + 5)}
                >
                  Load More
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AllBooking;
