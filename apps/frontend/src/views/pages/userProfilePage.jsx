import { useState } from "react";
import { format } from "date-fns";
import { motion } from "motion/react";
import { Link } from "react-router";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ChevronDown,
  ChevronUp,
  Settings,
  Calendar,
  Star,
} from "lucide-react";

// Sample user data
const user = {
  name: "Ali 🌍",
  bio: "Hi there! I'm based in Amman and love exploring Jordan's beautiful locations. As a local enthusiast, I enjoy discovering hidden gems across the country, from bustling city spots to serene natural retreats. Always excited to share recommendations about the best places to visit!",
  image:
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&h=200&auto=format&fit=crop",
  socialLinks: {
    facebook: "https://facebook.com/ali",
    twitter: "https://twitter.com/ali",
    instagram: "https://instagram.com/ali",
    linkedin: "https://linkedin.com/in/ali",
  },
};

// Sample bookings data (for the user)
const bookings = [
  {
    id: 1,
    listing: "Rainbow Street Boutique Hotel 🏰",
    checkIn: new Date(2024, 3, 15),
    checkOut: new Date(2024, 3, 20),
    status: "Confirmed",
    location: "Amman, Jordan",
  },
  {
    id: 2,
    listing: "Ayla Golf Resort 🏌️‍♂️",
    checkIn: new Date(2024, 4, 1),
    checkOut: new Date(2024, 4, 3),
    status: "Pending",
    location: "Aqaba, Jordan",
  },
  {
    id: 3,
    listing: "Mountain Breeze Resort 🌲",
    checkIn: new Date(2024, 5, 10),
    checkOut: new Date(2024, 5, 15),
    status: "Confirmed",
    location: "Dabouq, Jordan",
  },
];

// Sample user reviews (left by the user)
const userReviews = [
  {
    id: 1,
    listing: "Rotana Amman 🌆",
    rating: 5,
    comment:
      "Perfect city center location with amazing views of Amman. The rooftop restaurant offers the best sunset views of the Citadel.",
    location: "Amman, Jordan",
  },
  {
    id: 2,
    listing: "Tala Bay Beach Club 🏖️",
    rating: 4.5,
    comment:
      "Beautiful private beach access and excellent water sports facilities. Great spot for a weekend getaway in Aqaba.",
    location: "Aqaba, Jordan",
  },
  {
    id: 3,
    listing: "Landmark Hotel 🌟",
    rating: 5,
    comment:
      "Excellent business hotel in Amman with great conference facilities and proximity to key business districts.",
    location: "Amman, Jordan",
  },
];

const UserProfilePage = () => {
  const [bioExpanded, setBioExpanded] = useState(false);
  const [bookingExpanded, setBookingExpanded] = useState(null);

  const handleBioToggle = () => setBioExpanded(!bioExpanded);
  const handleBookingToggle = (id) =>
    setBookingExpanded(bookingExpanded === id ? null : id);

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6 h-fit"
          >
            <div className="text-center">
              <div className="relative inline-block group">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-rose-500 dark:border-rose-400 transition-all duration-200 group-hover:scale-105 group-hover:border-rose-600 dark:group-hover:border-rose-300"
                />
                <button
                  className="absolute bottom-2 right-2 p-2 bg-rose-500 dark:bg-rose-400 rounded-full text-white hover:bg-rose-600 dark:hover:bg-rose-500 transition-all duration-200 shadow-lg"
                  onClick={() => alert("Update profile picture")}
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
              <h2 className="text-xl font-semibold mt-4 text-gray-900 dark:text-white">
                {user.name}
              </h2>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Contact
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Email:{" "}
                <a
                  href="mailto:ali@example.com"
                  className="text-rose-500 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300"
                >
                  ali@example.com
                </a>
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Location: Amman
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Social Media
              </h3>
              <div className="flex justify-around">
                {[
                  {
                    icon: <Facebook className="w-6 h-6" />,
                    link: user.socialLinks.facebook,
                    color: "text-rose-600 dark:text-rose-400",
                  },
                  {
                    icon: <Twitter className="w-6 h-6" />,
                    link: user.socialLinks.twitter,
                    color: "text-rose-500 dark:text-rose-400",
                  },
                  {
                    icon: <Instagram className="w-6 h-6" />,
                    link: user.socialLinks.instagram,
                    color: "text-rose-500 dark:text-rose-400",
                  },
                  {
                    icon: <Linkedin className="w-6 h-6" />,
                    link: user.socialLinks.linkedin,
                    color: "text-rose-600 dark:text-rose-500",
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${social.color} hover:opacity-75 transition-opacity duration-200`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.aside>

          {/* Main Content */}
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 space-y-8"
          >
            {/* About Section */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                About {user.name}
              </h2>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                {bioExpanded ? user.bio : `${user.bio.substring(0, 200)}...`}
              </p>
              <button
                onClick={handleBioToggle}
                className="mt-2 flex items-center text-rose-500 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300"
              >
                {bioExpanded ? (
                  <>
                    Show Less <ChevronUp className="ml-1 w-4 h-4" />
                  </>
                ) : (
                  <>
                    Read More <ChevronDown className="ml-1 w-4 h-4" />
                  </>
                )}
              </button>
            </section>

            {/* Bookings Section */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-6 h-6 text-gray-900 dark:text-white" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Your Bookings
                </h2>
              </div>

              <div className="mt-6 space-y-4">
                {bookings.map((booking) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {booking.listing}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {format(booking.checkIn, "MMMM dd, yyyy")} -{" "}
                          {format(booking.checkOut, "MMMM dd, yyyy")}
                        </p>
                        <span
                          className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
                            booking.status === "Confirmed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                      <Link
                        to="/manage-bookings"
                        className="bg-rose-500 dark:bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-600 dark:hover:bg-rose-700 transition-colors duration-200"
                      >
                        Manage Booking
                      </Link>
                    </div>

                    <button
                      onClick={() => handleBookingToggle(booking.id)}
                      className="mt-4 flex items-center text-rose-500 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300"
                    >
                      {bookingExpanded === booking.id ? (
                        <>
                          Hide Details <ChevronUp className="ml-1 w-4 h-4" />
                        </>
                      ) : (
                        <>
                          Show Details <ChevronDown className="ml-1 w-4 h-4" />
                        </>
                      )}
                    </button>

                    {bookingExpanded === booking.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <p className="text-gray-600 dark:text-gray-300">
                          Additional booking details and special requests will
                          be displayed here.
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Reviews Section */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2">
                <Star className="w-6 h-6 text-gray-900 dark:text-white" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Your Reviews
                </h2>
              </div>

              <div className="mt-6 space-y-4">
                {userReviews.map((review) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {review.listing}
                      </h3>
                      <div className="flex items-center">
                        <span className="text-yellow-400">
                          {"⭐".repeat(Math.floor(review.rating))}
                        </span>
                        {review.rating % 1 !== 0 && (
                          <span className="text-yellow-400">½</span>
                        )}
                      </div>
                    </div>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      {review.comment}
                    </p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Settings Section */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2">
                <Settings className="w-6 h-6 text-gray-900 dark:text-white" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Settings
                </h2>
              </div>

              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Update Profile",
                    "Privacy Settings",
                    "Notification Preferences",
                    "Payment Methods",
                  ].map((setting) => (
                    <button
                      key={setting}
                      onClick={() => alert(`Navigate to ${setting}`)}
                      className="flex items-center justify-between p-4 border dark:border-gray-700 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-colors duration-200"
                    >
                      <span className="text-gray-900 dark:text-white">
                        {setting}
                      </span>
                      <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>
            </section>
          </motion.main>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
