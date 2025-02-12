import Features from "@/components/place-details/Features";
import BookingWidget from "@/components/place-details/BookingSystem";
import ImagesAndVideo from "@/components/place-details/ImagesAndVideo";
import Reviews from "@/components/place-details/Reviews";

const place = {
  success: true,
  message: "The place with id: 2",
  data: {
    id: 2,
    name: "game center",
    description: "anythig",
    user_id: 1,
    category_id: 1,
    location: "test",
    owner_username: "sami.mal",
    owner_email: "sami.mal@outlook.com",
    phone_number: null,
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-rwvUVbhAWYQRhilHwGGdjjTHyQJ_ZR3wzg&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-rwvUVbhAWYQRhilHwGGdjjTHyQJ_ZR3wzg&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-rwvUVbhAWYQRhilHwGGdjjTHyQJ_ZR3wzg&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-rwvUVbhAWYQRhilHwGGdjjTHyQJ_ZR3wzg&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-rwvUVbhAWYQRhilHwGGdjjTHyQJ_ZR3wzg&s",
    ],
    videos: ["https://www.w3schools.com/html/mov_bbb.mp4"],
  },
};

const PlaceDetailedPage = () => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
        <h1 className="text-4xl font-bold text-gray-800">
          {place.data.name}{" "}
          <span className="text-blue-600">#{place.data.id}</span>
        </h1>
      </div>

      <ImagesAndVideo place={place.data} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="md:col-span-2">
          <Features place={place.data} />
        </div>
        <div className="md:col-span-1">
          <BookingWidget placeId={place.data.id} />
        </div>
      </div>

      <Reviews />
    </div>
  );
};

export default PlaceDetailedPage;
