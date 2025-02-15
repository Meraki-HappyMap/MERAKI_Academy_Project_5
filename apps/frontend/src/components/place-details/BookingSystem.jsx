import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams } from "react-router";

const BookingWidget = () => {
  const { placeId } = useParams();
  const [placeName, setPlaceName] = useState("");

  useEffect(() => {
    const place = {
      success: true,
      data: {
        id: 2,
        name: "game center",
      },
    };

    if (place.success) {
      setPlaceName(place.data.name);
    }
  }, [placeId]);

  return (
    <Card className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">
          Book this place
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Label className="text-gray-600 dark:text-gray-300 text-sm">Place Name</Label>
          <Input type="text" value={placeName} disabled className="mt-1 bg-gray-200 dark:bg-gray-700" />
        </div>

        <div className="mb-4">
          <Label className="text-gray-600 dark:text-gray-300 text-sm">Start Time</Label>
          <Input type="datetime-local" className="mt-1 bg-gray-200 dark:bg-gray-700" />
        </div>

        <div className="mb-4">
          <Label className="text-gray-600 dark:text-gray-300 text-sm">End Time</Label>
          <Input type="datetime-local" className="mt-1 bg-gray-200 dark:bg-gray-700" />
        </div>

        <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">Book Now</Button>
      </CardContent>
    </Card>
  );
};

export default BookingWidget;
