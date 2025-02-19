import React, { useState } from 'react';

// Sample host data
const host = {
  name: "Ahmad 🏞️",
  bio: "",
  image: "https://via.placeholder.com/150",
  isSuperhost: true,
};

// Sample listings data
const listings = [
  {
    id: 1,
    title: "Cozy Mountain Cabin 🏡",
    rating: 4.86,
    reviews: 741,
    image: "https://via.placeholder.com/400x300",
    description: "A cozy cabin nestled in the mountains of Colorado. Perfect for a winter getaway ❄️. Snow-capped peaks, warm fires, and peaceful surroundings await you!",
  },
  {
    id: 2,
    title: "Riverside Retreat 🌊",
    rating: 4.81,
    reviews: 651,
    image: "https://via.placeholder.com/400x300",
    description: "A peaceful retreat by the Mississippi River. Ideal for summer vacations 🌞. Enjoy water activities and evening bonfires under the stars.",
  },
];

const OwnerProfilePage = () => {
  const [bioExpanded, setBioExpanded] = useState(false);
  const [listingExpanded, setListingExpanded] = useState(null);

  const handleBioToggle = () => setBioExpanded(!bioExpanded);
  const handleListingToggle = (id) => setListingExpanded(listingExpanded === id ? null : id);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <div className="flex mt-20">
        <aside className="bg-white shadow-lg w-64 p-6 space-y-6">
          <div className="text-center">
            <img
              src={host.image}
              alt="Host"
              className="w-32 h-32 rounded-full mx-auto border-4 border-blue-500"
            />
            <h2 className="text-xl font-semibold mt-4">{host.name}</h2>
            {host.isSuperhost && <p className="text-blue-500">Superhost ⭐</p>}
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Social Media</h3>
            <div className="flex justify-around">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-square text-2xl"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-600"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter-square text-2xl"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-700"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram text-2xl"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin text-2xl"></i>
              </a>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 space-y-12">
          {/* About Section */}
          <section id="about">
            <h2 className="text-3xl font-semibold">About {host.name}</h2>
            <p className="text-lg mt-4">
              {bioExpanded ? host.bio : `${host.bio.substring(0, 200)}...`}
            </p>
            <button
              onClick={handleBioToggle}
              className="text-blue-500 hover:text-blue-700 mt-2"
            >
              {bioExpanded ? "Show Less" : "Read More"}
            </button>
          </section>

          {/* Listings Section */}
          <section id="listings">
            <h2 className="text-3xl font-semibold">Your Listings 🏡</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
              {listings.map((listing) => (
                <div key={listing.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-48 object-cover"
                    aria-label={listing.title}
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{listing.title}</h3>
                    <p className="text-sm text-gray-600">
                      {listing.rating} ⭐ ({listing.reviews} reviews)
                    </p>
                    <p className="mt-2 text-gray-700">
                      {listingExpanded === listing.id
                        ? listing.description
                        : `${listing.description.substring(0, 100)}...`}
                    </p>
                    <button
                      onClick={() => handleListingToggle(listing.id)}
                      className="text-blue-500 hover:text-blue-700 mt-2"
                    >
                      {listingExpanded === listing.id ? "Show Less" : "Read More"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact">
            <h2 className="text-3xl font-semibold">Contact {host.name}</h2>
            <p className="mt-4">
              If you'd like to get in touch with me, feel free to email me directly at:
            </p>
            <a
              href="mailto:ahmad@example.com"
              className="text-blue-500 hover:text-blue-700 mt-2 inline-block"
              aria-label="Email Ahmad"
            >
              ahmad@example.com
            </a>
          </section>
        </main>
      </div>
    </div>
  );
};

export default OwnerProfilePage;
