import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const placeData = [
  {
    id: 2,
    name: "game center",
    category_id: 1,
  },
  {
    id: 3,
    name: "game center",
    category_id: 1,
  },
  {
    id: 4,
    name: "test3",
    category_id: 2,
  },
  {
    id: 5,
    name: "test",
    category_id: 2,
  },
  {
    id: 7,
    name: "test",
    category_id: 2,
  },
];

function PlaceInfo({ booking }) {
  const place = placeData.find((p) => p.id === booking.place_id);

  return (
    <Card className="shadow-lg rounded-xl p-4 border border-gray-200">
      <CardHeader>
        <div>
          <CardTitle className="text-lg font-semibold">
            {place.name}
          </CardTitle>
          <p className="text-sm text-gray-500"># {place.category_id}</p>
        </div>
      </CardHeader>
      <CardContent className="mt-2">
        <p className="text-gray-700">
          <span className="font-semibold">Start:</span> {new Date(booking.start_time).toLocaleString()}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">End:</span> {new Date(booking.end_time).toLocaleString()}
        </p>
        <div className="mt-4 flex justify-between">
          <Button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default PlaceInfo;
