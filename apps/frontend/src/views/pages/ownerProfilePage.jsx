import { useState } from "react";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ChevronDown,
  ChevronUp,
  Settings,
  Star,
} from "lucide-react";

// Sample host data
const host = {
  name: "Ahmad",
  bio: "Welcome to my profile! I'm a passionate host dedicated to providing unique stays across Jordan. With properties in prime locations, I strive to offer memorable experiences that showcase the best of our beautiful country.",
  image:
    "https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=200&h=200&auto=format&fit=crop",
  isSuperhost: true,
  socialLinks: {
    facebook: "https://facebook.com/ahmad",
    twitter: "https://twitter.com/ahmad",
    instagram: "https://instagram.com/ahmad",
    linkedin: "https://linkedin.com/in/ahmad",
  },
};

// Sample listings data
const listings = [
  {
    id: 1,
    title: "Petra View Villa 🏰",
    rating: 4.86,
    reviews: 741,
    image:
      "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
    description:
      "A luxurious villa with breathtaking views of Petra. Perfect for those seeking a unique stay near the ancient city. Modern amenities meet traditional Jordanian hospitality.",
  },
  {
    id: 2,
    title: "Dead Sea Retreat 🌊",
    rating: 4.81,
    reviews: 651,
    image:
      "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
    description:
      "Experience floating in the Dead Sea from your doorstep. This modern retreat offers private beach access and spa facilities for ultimate relaxation.",
  },
];

const OwnerProfilePage = () => {
  const [bioExpanded, setBioExpanded] = useState(false);
  const [listingExpanded, setListingExpanded] = useState(null);

  const handleBioToggle = () => setBioExpanded(!bioExpanded);
  const handleListingToggle = (id) =>
    setListingExpanded(listingExpanded === id ? null : id);

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                  src={host.image}
                  alt={host.name}
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
                {host.name}
              </h2>
              {host.isSuperhost && (
                <p className="text-rose-500 dark:text-rose-400 flex items-center justify-center gap-1 mt-2">
                  <Star className="w-4 h-4" />
                  Superhost
                </p>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Social Media
              </h3>
              <div className="flex justify-around">
                {[
                  {
                    icon: <Facebook className="w-6 h-6" />,
                    link: host.socialLinks.facebook,
                    color: "text-rose-600 dark:text-rose-400",
                  },
                  {
                    icon: <Twitter className="w-6 h-6" />,
                    link: host.socialLinks.twitter,
                    color: "text-rose-500 dark:text-rose-400",
                  },
                  {
                    icon: <Instagram className="w-6 h-6" />,
                    link: host.socialLinks.instagram,
                    color: "text-rose-500 dark:text-rose-400",
                  },
                  {
                    icon: <Linkedin className="w-6 h-6" />,
                    link: host.socialLinks.linkedin,
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
                About {host.name}
              </h2>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                {bioExpanded ? host.bio : `${host.bio.substring(0, 200)}...`}
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

            {/* Listings Section */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Your Listings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {listings.map((listing) => (
                  <motion.div
                    key={listing.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden shadow-md"
                  >
                    <div className="relative h-48 overflow-hidden group">
                      <img
                        src={listing.image}
                        alt={listing.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors duration-300" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {listing.title}
                        </h3>
                        <p className="text-sm text-rose-500 dark:text-rose-400 flex items-center gap-1">
                          <Star className="w-4 h-4" fill="currentColor" />
                          {listing.rating}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {listing.reviews} reviews
                      </p>
                      <p className="mt-2 text-gray-600 dark:text-gray-300">
                        {listingExpanded === listing.id
                          ? listing.description
                          : `${listing.description.substring(0, 100)}...`}
                      </p>
                      <button
                        onClick={() => handleListingToggle(listing.id)}
                        className="mt-2 flex items-center text-rose-500 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300"
                      >
                        {listingExpanded === listing.id ? (
                          <>
                            Show Less <ChevronUp className="ml-1 w-4 h-4" />
                          </>
                        ) : (
                          <>
                            Read More <ChevronDown className="ml-1 w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Contact Section */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Contact {host.name}
              </h2>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                If you&apos;d like to get in touch with me, feel free to email
                me directly at:
              </p>
              <a
                href="mailto:ahmad@example.com"
                className="mt-2 inline-block text-rose-500 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300"
              >
                ahmad@example.com
              </a>
            </section>
          </motion.main>
        </div>
      </div>
    </div>
  );
};

export default OwnerProfilePage;
