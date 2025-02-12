import PlaceListings from "@/components/home-page/PlaceListings";
const HomePage = () => {
  const PLACEHOLDER_IMAGE =
    "https://th.bing.com/th/id/OIP.64PN1rjY7-RKHjH2H8vCfQHaFj?w=238&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7";

  // TODO: Replace with actual data from the database
  const placesList = [
    {
      id: 1,
      name: "Cozy Beachfront Villa",
      description:
        "Escape to paradise in this stunning beachfront villa. Enjoy breathtaking ocean views and private beach access.",
      user_id: 101,
      category: "Vacation Rentals",
      location: "Malibu, CA",
      is_deleted: 0,
      created_at: new Date("2024-03-15T10:00:00Z"),
      updated_at: new Date("2024-03-18T14:30:00Z"),
      owner_username: "beachlover",
      owner_email: "beachlover@example.com",
      images: [PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE],
      videos: [],
      average_rating: 4.8,
      total_reviews: 25,
      price_per_night: 350,
    },
    {
      id: 1,
      name: "Cozy Beachfront Villa",
      description:
        "Escape to paradise in this stunning beachfront villa. Enjoy breathtaking ocean views and private beach access.",
      user_id: 101,
      category: "Vacation Rentals",
      location: "Malibu, CA",
      is_deleted: 0,
      created_at: new Date("2024-03-15T10:00:00Z"),
      updated_at: new Date("2024-03-18T14:30:00Z"),
      owner_username: "beachlover",
      owner_email: "beachlover@example.com",
      images: [PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE],
      videos: [],
      average_rating: 4.8,
      total_reviews: 25,
      price_per_night: 350,
    },
    {
      id: 1,
      name: "Cozy Beachfront Villa",
      description:
        "Escape to paradise in this stunning beachfront villa. Enjoy breathtaking ocean views and private beach access.",
      user_id: 101,
      category: "Vacation Rentals",
      location: "Malibu, CA",
      is_deleted: 0,
      created_at: new Date("2024-03-15T10:00:00Z"),
      updated_at: new Date("2024-03-18T14:30:00Z"),
      owner_username: "beachlover",
      owner_email: "beachlover@example.com",
      images: [PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE],
      videos: [],
      average_rating: 4.8,
      total_reviews: 25,
      price_per_night: 350,
    },
    {
      id: 1,
      name: "Cozy Beachfront Villa",
      description:
        "Escape to paradise in this stunning beachfront villa. Enjoy breathtaking ocean views and private beach access.",
      user_id: 101,
      category: "Vacation Rentals",
      location: "Malibu, CA",
      is_deleted: 0,
      created_at: new Date("2024-03-15T10:00:00Z"),
      updated_at: new Date("2024-03-18T14:30:00Z"),
      owner_username: "beachlover",
      owner_email: "beachlover@example.com",
      images: [PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE],
      videos: [],
      average_rating: 4.8,
      total_reviews: 25,
      price_per_night: 350,
    },
    {
      id: 2,
      name: "Luxury City Penthouse",
      description:
        "Experience the city in style with this luxurious penthouse apartment. Panoramic views and top-of-the-line amenities.",
      user_id: 102,
      category: "City Apartments",
      location: "New York, NY",
      is_deleted: 0,
      created_at: new Date("2024-03-10T12:00:00Z"),
      updated_at: new Date("2024-03-12T18:00:00Z"),
      owner_username: "citydweller",

      owner_email: "citydweller@example.com",
      images: [PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE],
      videos: [],
      average_rating: 4.9,
      total_reviews: 52,
      price_per_night: 500,
    },
    {
      id: 3,
      name: "Rustic Mountain Cabin",
      description:
        "Get away from it all in this charming mountain cabin. Perfect for hiking, skiing, or just relaxing by the fire.",
      user_id: 101,
      category: "Cabins",
      location: "Aspen, CO",
      is_deleted: 0,

      created_at: new Date("2024-03-01T08:00:00Z"),
      updated_at: new Date("2024-03-05T11:00:00Z"),
      owner_username: "beachlover",
      owner_email: "beachlover@example.com",
      images: [
        PLACEHOLDER_IMAGE,
        PLACEHOLDER_IMAGE,
        PLACEHOLDER_IMAGE,
        PLACEHOLDER_IMAGE,
      ],
      videos: [],
      average_rating: 4.5,
      total_reviews: 18,
      price_per_night: 200,
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col">
      <PlaceListings placesList={placesList} />
    </div>
  );
};

export default HomePage;
