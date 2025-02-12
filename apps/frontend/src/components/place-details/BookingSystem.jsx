import React, { useEffect, useState } from "react";
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
      message: "The place with id: 2",
      data: {
        id: 2,
        name: "game center",
        description: "anything",
        user_id: 1,
        category_id: 1,
        location: "test",
        owner_username: "sami.mal",
        owner_email: "sami.mal@outlook.com",
        phone_number: null,
        images: [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-rwvUVbhAWYQRhilHwGGdjjTHyQJ_ZR3wzg&s",
        ],
        videos: ["https://www.w3schools.com/html/mov_bbb.mp4"],
      },
    };

    if (place.success) {
      setPlaceName(place.data.name);
    }
  }, [placeId]);

  return (
    <Card className="sticky top-20 w-full max-w-sm bg-white shadow-lg rounded-lg p-4">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          Book this place
        </CardTitle>
        <CardContent>
          <div className="mb-4">
            <Label className="text-gray-600 text-sm">Place Name</Label>
            <Input type="text" value={placeName} disabled className="mt-1" />
          </div>

          <div className="mb-4">
            <Label className="text-gray-600 text-sm">Start Time</Label>
            <Input type="datetime-local" className="mt-1" />
          </div>

          <div className="mb-4">
            <Label className="text-gray-600 text-sm">End Time</Label>
            <Input type="datetime-local" className="mt-1" />
          </div>

          <Button className="w-full mt-4" disabled>
            Book Now
          </Button>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default BookingWidget;
