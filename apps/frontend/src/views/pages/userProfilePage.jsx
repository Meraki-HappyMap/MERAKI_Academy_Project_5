import React, { useState } from 'react';
import { format } from 'date-fns';
// Sample user data
const user = {
  name: "Ali 🌍",
  bio: "Hi there! I love traveling and staying in unique places around the world. I enjoy hiking, photography, and exploring new cultures. Always looking for my next adventure.",
  image: "https://via.placeholder.com/150",
  socialLinks: {
    facebook: "https://facebook.com/ali",
    twitter: "https://twitter.com/ali",
    instagram: "https://instagram.com/ali",
    linkedin: "https://linkedin.com/in/ali",
  }
};

// Sample bookings data (for the user)
const bookings = [
  {
    id: 1,
    listing: "Cozy Mountain Cabin 🏡",
    checkIn: new Date(2025, 2, 10),
    checkOut: new Date(2025, 2, 15),
    status: "Confirmed",
  },
  {
    id: 2,
    listing: "Riverside Retreat 🌊",
    checkIn: new Date(2025, 6, 15),
    checkOut: new Date(2025, 6, 20),
    status: "Pending",
  },
];

// Sample user reviews (left by the user)
const userReviews = [
  { id: 1, listing: "Cozy Mountain Cabin 🏡", rating: 5, comment: "Wonderful stay! Very peaceful and beautiful scenery." },
  { id: 2, listing: "Riverside Retreat 🌊", rating: 4.5, comment: "Great place to relax by the river. Will return!" },
];

const UserProfilePage = () => {
  const [bioExpanded, setBioExpanded] = useState(false);
  const [bookingExpanded, setBookingExpanded] = useState(null);

  const handleBioToggle = () => setBioExpanded(!bioExpanded);
  const handleBookingToggle = (id) => setBookingExpanded(bookingExpanded === id ? null : id);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <div className="flex mt-20">
        <aside className="bg-white shadow-lg w-64 p-6 space-y-6">
          <div className="text-center">
            <img
              src={user.image}
              alt="User"
              className="w-32 h-32 rounded-full mx-auto border-4 border-blue-500"
            />
            <h2 className="text-xl font-semibold mt-4">{user.name}</h2>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Contact</h3>
            <p>Email: <a href="mailto:ali@example.com" className="text-blue-500 hover:text-blue-700">ali@example.com</a></p>
            <p>Location: San Francisco, CA</p>
          </div>

          {/* Social Media Links */}
          <div className="space-y-4 mt-6">
            <h3 className="font-semibold">Social Media</h3>
            <div className="flex justify-around">
              <a href={user.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                <i className="fab fa-facebook-square text-2xl"></i>
              </a>
              <a href={user.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                <i className="fab fa-twitter-square text-2xl"></i>
              </a>
              <a href={user.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700">
                <i className="fab fa-instagram text-2xl"></i>
              </a>
              <a href={user.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">
                <i className="fab fa-linkedin text-2xl"></i>
              </a>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 space-y-12">
          {/* About Section */}
          <section id="about">
            <h2 className="text-3xl font-semibold">About {user.name}</h2>
            <p className="text-lg mt-4">
              {bioExpanded ? user.bio : `${user.bio.substring(0, 200)}...`}
            </p>
            <button
              onClick={handleBioToggle}
              className="text-blue-500 hover:text-blue-700 mt-2"
            >
              {bioExpanded ? "Show Less" : "Read More"}
            </button>
          </section>

     {/* Bookings Section */}
<section id="bookings">
  <h2 className="text-3xl font-semibold">Your Bookings 🗓️</h2>

  <div className="space-y-6 mt-6">
    {bookings.map((booking) => (
      <div key={booking.id} className="bg-white p-4 rounded-lg shadow-md">
        {/* Listing Header with Manage Booking Button */}
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">{booking.listing}</h3>
          <button
            onClick={() => alert(`Managing booking for ${booking.listing}`)} // Add your manage booking logic here
            className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Manage Booking
          </button>
        </div>
        
        <p className="text-sm text-gray-600">
          {format(booking.checkIn, "MMMM dd, yyyy")} to {format(booking.checkOut, "MMMM dd, yyyy")}
        </p>
        <p className="text-gray-700">Status: {booking.status}</p>

        <div className="mt-2 flex space-x-4">
          <button
            onClick={() => handleBookingToggle(booking.id)}
            className="text-blue-500 hover:text-blue-700"
          >
            {bookingExpanded === booking.id ? "Show Less" : "Show Details"}
          </button>
        </div>

        {bookingExpanded === booking.id && (
          <div className="mt-2">
            <p className="text-gray-700">Additional details about the booking, such as special requests, can go here.</p>
          </div>
        )}
      </div>
    ))}
  </div>
</section>





          {/* Reviews Section */}
          <section id="reviews">
            <h2 className="text-3xl font-semibold">Your Reviews 📝</h2>
            <div className="space-y-4 mt-6">
              {userReviews.map((review) => (
                <div key={review.id} className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex items-center">
                    <div className="text-xl font-semibold">{review.listing}</div>
                    <div className="ml-2 text-yellow-500">
                      {'⭐'.repeat(review.rating)}
                    </div>
                  </div>
                  <p className="mt-2 text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </section>

       {/* User Settings Section */}
<section id="settings">
  <h2 className="text-3xl font-semibold">User Settings ⚙️</h2>
  <div className="bg-white p-4 rounded-lg shadow-md">
    <p className="text-gray-700">You can update your profile and other settings here.</p>
    <button className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 mt-2">
      Update Profile
    </button>
  </div>
</section>


        </main>
      </div>
    </div>
  );
};

export default UserProfilePage;
