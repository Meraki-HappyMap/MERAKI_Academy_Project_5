import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useParams, useNavigate } from "react-router";
import AllBooking from "@/components/manage-Booking/AllBooking";
import BlockBooking from "@/components/manage-Booking/BlockBooking";
import CalenderBooking from "@/components/manage-Booking/CalenderBooking";
import ConfirmedBooking from "@/components/manage-Booking/ConfirmedBooking";
import bookingsApi from "@/services/bookings";
import { useToast } from "@/hooks/use-toast";

const ManageBookingPage = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const { placeId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!placeId) {
      toast({
        title: "Error",
        description:
          "No place selected. Please select a place to manage bookings.",
        variant: "destructive",
      });
      navigate("/places");
    }
  }, [placeId, navigate, toast]);

  const { data: bookings, isLoading } = bookingsApi.usePlaceBookings(
    Number(placeId),
    {
      refetchInterval: 30000, // Refetch every 30 seconds
      enabled: !!placeId,
    }
  );

  if (!placeId) return null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <section className="py-4 sm:py-8">
      <div className="px-2 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold">Manage Bookings</h1>

            {/* Mobile Stats */}
            <div className="flex gap-4 sm:hidden">
              <div className="flex-1 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total
                </p>
                <p className="text-xl font-bold">
                  {bookings?.data?.length || 0}
                </p>
              </div>
              <div className="flex-1 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Confirmed
                </p>
                <p className="text-xl font-bold">
                  {bookings?.data?.filter((b) => b.status === "confirmed")
                    .length || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab}>
                <div className="overflow-x-auto -mx-2 px-2 sm:mx-0 sm:px-0">
                  <TabsList className="w-full grid grid-cols-4 mb-6">
                    <TabsTrigger
                      value="all"
                      className="text-xs sm:text-sm md:text-base whitespace-nowrap"
                    >
                      All Bookings
                    </TabsTrigger>
                    <TabsTrigger
                      value="confirmed"
                      className="text-xs sm:text-sm md:text-base whitespace-nowrap"
                    >
                      Confirmed
                    </TabsTrigger>
                    <TabsTrigger
                      value="calendar"
                      className="text-xs sm:text-sm md:text-base whitespace-nowrap"
                    >
                      Calendar
                    </TabsTrigger>
                    <TabsTrigger
                      value="block"
                      className="text-xs sm:text-sm md:text-base whitespace-nowrap"
                    >
                      Block
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="mt-4">
                  <TabsContent value="all" className="mt-0">
                    <Card className="p-4 sm:p-6">
                      <AllBooking
                        placeId={Number(placeId)}
                        bookings={bookings?.data}
                      />
                    </Card>
                  </TabsContent>

                  <TabsContent value="confirmed" className="mt-0">
                    <Card className="p-4 sm:p-6">
                      <ConfirmedBooking
                        placeId={Number(placeId)}
                        bookings={bookings?.data?.filter(
                          (b) => b.status === "confirmed"
                        )}
                      />
                    </Card>
                  </TabsContent>

                  <TabsContent value="calendar" className="mt-0">
                    <Card className="p-4 sm:p-6">
                      <CalenderBooking
                        placeId={Number(placeId)}
                        bookings={bookings?.data}
                      />
                    </Card>
                  </TabsContent>

                  <TabsContent value="block" className="mt-0">
                    <Card className="p-4 sm:p-6">
                      <BlockBooking
                        placeId={Number(placeId)}
                        existingBookings={bookings?.data}
                      />
                    </Card>
                  </TabsContent>
                </div>
              </Tabs>
            </div>

            {/* Sidebar - Hidden on mobile */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-24">
                <Card className="p-6">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">
                        Booking Statistics
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Total Bookings
                          </p>
                          <p className="text-2xl font-bold">
                            {bookings?.data?.length || 0}
                          </p>
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Confirmed
                          </p>
                          <p className="text-2xl font-bold">
                            {bookings?.data?.filter(
                              (b) => b.status === "confirmed"
                            ).length || 0}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Quick Actions</h3>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => setSelectedTab("block")}
                          className="w-full p-3 text-left bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          Block dates
                        </button>
                        <button
                          onClick={() => setSelectedTab("calendar")}
                          className="w-full p-3 text-left bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          View calendar
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageBookingPage;
