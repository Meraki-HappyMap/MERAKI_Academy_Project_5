import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const placeData = [
  {
    id: 2,
    name: "game center",
    description: "anythig",
    user_id: 1,
    category_id: 1,
    location: "test",
    is_deleted: 0,
    created_at: "2025-02-04T18:22:37.112Z",
    updated_at: "2025-02-04T18:22:37.112Z",
  },
  {
    id: 3,
    name: "game center",
    description: "updated",
    user_id: 1,
    category_id: 1,
    location: "test",
    is_deleted: 0,
    created_at: "2025-02-04T18:23:55.369Z",
    updated_at: "2025-02-04T18:24:12.469Z",
  },
  {
    id: 4,
    name: "test3",
    description: "test also",
    user_id: 2,
    category_id: 2,
    location: "test",
    is_deleted: 0,
    created_at: "2025-02-10T07:42:55.375Z",
    updated_at: "2025-02-10T07:42:55.375Z",
  },
  {
    id: 5,
    name: "test",
    description: "test",
    user_id: 2,
    category_id: 2,
    location: "test",
    is_deleted: 0,
    created_at: "2025-02-12T14:45:20.462Z",
    updated_at: "2025-02-12T14:45:20.462Z",
  },
  {
    id: 7,
    name: "test",
    description: "test",
    user_id: 1,
    category_id: 2,
    location: "test",
    is_deleted: 0,
    created_at: "2025-02-15T11:04:25.135Z",
    updated_at: "2025-02-15T11:04:25.135Z",
  },
];

function PlaceInfo({ booking }) {
  const place = placeData.find((p) => p.id === booking.place_id);

  return (
    <Card className="shadow-lg rounded-xl p-4 border border-gray-200">
      <CardHeader>
        <div>
          <CardTitle className="text-lg font-semibold">{place.name}</CardTitle>
          <p className="text-sm text-gray-500"># {place.category_id}</p>
        </div>
      </CardHeader>
      <CardContent className="mt-2">
        <p className="text-gray-700">
          <span className="font-semibold">Start:</span>{" "}
          {new Date(booking.start_time).toLocaleString()}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">End:</span>{" "}
          {new Date(booking.end_time).toLocaleString()}
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
