import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import BookingUser from "@/components/manage-Booking/BookingUser";
import CalenderBooking from "@/components/manage-Booking/CalenderBooking";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarDays,
  Clock,
  Filter,
  LayoutGrid,
  List,
  MapPin,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Dummy data for bookings
const dummyBookings = [
  {
    id: 1,
    type: "Hotel",
    name: "Rainbow Street Boutique Hotel 🏰",
    location: "Amman, Jordan",
    startTime: "2024-03-15T10:00:00",
    endTime: "2024-03-20T12:00:00",
    status: "upcoming",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=300",
  },
  {
    id: 2,
    type: "Sports",
    name: "Ayla Golf Resort 🏌️‍♂️",
    location: "Aqaba, Jordan",
    startTime: "2024-04-01T08:00:00",
    endTime: "2024-04-03T18:00:00",
    status: "upcoming",
    price: 80,
    image:
      "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=300",
  },
  {
    id: 3,
    type: "Resort",
    name: "Mountain Breeze Resort 🌲",
    location: "Dabouq, Jordan",
    startTime: "2024-05-10T14:00:00",
    endTime: "2024-05-15T12:00:00",
    status: "upcoming",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?q=80&w=300",
  },
  {
    id: 4,
    type: "Hotel",
    name: "Rotana Amman 🌆",
    location: "Amman, Jordan",
    startTime: "2024-02-20T12:00:00",
    endTime: "2024-02-22T12:00:00",
    status: "completed",
    price: 180,
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=300",
  },
  {
    id: 5,
    type: "Beach Club",
    name: "Tala Bay Beach Club 🏖️",
    location: "Aqaba, Jordan",
    startTime: "2024-02-25T10:00:00",
    endTime: "2024-02-25T18:00:00",
    status: "cancelled",
    price: 45,
    image:
      "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=300",
  },
];

function ManageBookingForUser() {
  const [view, setView] = useState("grid");
  const [selectedTab, setSelectedTab] = useState("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Manage Your Bookings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage all your bookings in one place
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Bookings List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2 space-y-6"
          >
            {/* Filters and Search */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
                    <Input
                      placeholder="Search bookings..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 focus:ring-rose-500 dark:focus:ring-rose-400"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select
                      value={filterStatus}
                      onValueChange={setFilterStatus}
                    >
                      <SelectTrigger className="w-[140px]">
                        <Filter className="h-4 w-4 mr-2 text-gray-400 dark:text-gray-500" />
                        <SelectValue placeholder="Filter by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[140px]">
                        <SlidersHorizontal className="h-4 w-4 mr-2 text-gray-400 dark:text-gray-500" />
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="date">Date</SelectItem>
                        <SelectItem value="price">Price</SelectItem>
                        <SelectItem value="duration">Duration</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex rounded-md border dark:border-gray-800">
                      <Button
                        variant={view === "grid" ? "default" : "ghost"}
                        size="icon"
                        onClick={() => setView("grid")}
                        className={cn(
                          "rounded-none rounded-l-md",
                          view === "grid"
                            ? "bg-rose-500 hover:bg-rose-600 text-white dark:bg-rose-500/20 dark:hover:bg-rose-500/30 dark:text-rose-100"
                            : "text-gray-400 hover:text-rose-500 dark:text-gray-400 dark:hover:text-rose-300"
                        )}
                      >
                        <LayoutGrid className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={view === "list" ? "default" : "ghost"}
                        size="icon"
                        onClick={() => setView("list")}
                        className={cn(
                          "rounded-none rounded-r-md",
                          view === "list"
                            ? "bg-rose-500 hover:bg-rose-600 text-white dark:bg-rose-500/20 dark:hover:bg-rose-500/30 dark:text-rose-100"
                            : "text-gray-400 hover:text-rose-500 dark:text-gray-400 dark:hover:text-rose-300"
                        )}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Card>
              <CardContent className="p-6">
                <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                  <TabsList className="mb-4">
                    <TabsTrigger
                      value="upcoming"
                      className="data-[state=active]:bg-rose-500 data-[state=active]:text-white dark:data-[state=active]:bg-rose-500/20 dark:data-[state=active]:text-rose-100"
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      Upcoming
                    </TabsTrigger>
                    <TabsTrigger
                      value="past"
                      className="data-[state=active]:bg-rose-500 data-[state=active]:text-white dark:data-[state=active]:bg-rose-500/20 dark:data-[state=active]:text-rose-100"
                    >
                      <CalendarDays className="h-4 w-4 mr-2" />
                      Past
                    </TabsTrigger>
                    <TabsTrigger
                      value="cancelled"
                      className="data-[state=active]:bg-rose-500 data-[state=active]:text-white dark:data-[state=active]:bg-rose-500/20 dark:data-[state=active]:text-rose-100"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Cancelled
                    </TabsTrigger>
                  </TabsList>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedTab}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <TabsContent value={selectedTab} className="m-0">
                        <BookingUser
                          bookings={dummyBookings.filter((booking) =>
                            selectedTab === "upcoming"
                              ? booking.status === "upcoming"
                              : selectedTab === "past"
                                ? booking.status === "completed"
                                : booking.status === "cancelled"
                          )}
                          view={view}
                        />
                      </TabsContent>
                    </motion.div>
                  </AnimatePresence>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Calendar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <Card className="sticky top-24">
              <CardHeader className="pb-3">
                <CardTitle>Calendar Overview</CardTitle>
                <CardDescription>
                  View your bookings in calendar format
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CalenderBooking bookings={dummyBookings} />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ManageBookingForUser;
