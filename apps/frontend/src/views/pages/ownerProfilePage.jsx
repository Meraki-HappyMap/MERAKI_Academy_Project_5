import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const sampleOwner = {
  name: "Ahmad Wafa",
  bio: "",
  location: "New York, USA",
  email: "ahmadwafa020@gmail.com",
  socialLink: "https://instagram.com/ahmadwafa",
  profileImage: "https://via.placeholder.com/150",
};

const samplePlaces = [
  {
    id: 1,
    name: "Cozy Apartment in NYC",
    location: "Manhattan, New York",
    image: "https://via.placeholder.com/400",
  },
  {
    id: 2,
    name: "Beach House Retreat",
    location: "Malibu, California",
    image: "https://via.placeholder.com/400",
  },
];

const OwnerProfilePage = ({ owner = sampleOwner, places = samplePlaces }) => {
  const [editMode, setEditMode] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState(owner);

  const handleProfileUpdate = useCallback(() => {
    console.log("Profile updated:", updatedProfile);
    setEditMode(false);
  }, [updatedProfile]);

  const handleBookPlace = (place) => {
    console.log(`Booking requested for: ${place.name}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      {/* Profile Header */}
      <div className="flex items-center space-x-6">
        <img
          src={owner.profileImage || "https://via.placeholder.com/150"}
          alt="Owner"
          className="w-24 h-24 rounded-full object-cover border-4 border-gray-300"
        />

        {/* Editable Profile Info */}
        {editMode ? (
          <div className="flex flex-col">
            <Label>Name</Label>
            <Input
              value={updatedProfile.name}
              onChange={(e) => setUpdatedProfile({ ...updatedProfile, name: e.target.value })}
            />
            <Label className="mt-2">Bio</Label>
            <Input
              value={updatedProfile.bio}
              onChange={(e) => setUpdatedProfile({ ...updatedProfile, bio: e.target.value })}
            />
            <Label className="mt-2">Location</Label>
            <Input
              value={updatedProfile.location}
              onChange={(e) => setUpdatedProfile({ ...updatedProfile, location: e.target.value })}
            />
            <div className="mt-2 flex space-x-2">
              <Button onClick={handleProfileUpdate}>Save</Button>
              <Button variant="outline" onClick={() => setEditMode(false)}>Cancel</Button>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-semibold">{owner.name}</h1>
            <p className="text-gray-600">{owner.bio}</p>
            <p className="text-sm text-gray-500">📍 {owner.location}</p>
            <Button variant="outline" className="mt-2" onClick={() => setEditMode(true)}>
              ✏️ Edit Profile
            </Button>
          </div>
        )}
      </div>

      {/* Contact & Socials */}
      <div className="mt-4 flex space-x-4">
        {owner.email && (
          <Button asChild>
            <a href={`mailto:${owner.email}`}>✉️ Contact</a>
          </Button>
        )}
        {owner.socialLink && (
          <Button variant="outline" asChild>
            <a href={owner.socialLink} target="_blank" rel="noopener noreferrer">
              🌍 View Social
            </a>
          </Button>
        )}
      </div>

      {/* Hosted Places */}
      <h2 className="mt-6 text-xl font-semibold">Hosted Places</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {places.length > 0 ? (
          places.map((place) => (
            <div
              key={place.id}
              className="border rounded-lg overflow-hidden shadow-md bg-gray-50"
            >
              <img
                src={place.image || "https://via.placeholder.com/400"}
                alt={place.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{place.name}</h3>
                <p className="text-sm text-gray-600">{place.location}</p>

                {/* Booking Button */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="mt-2 w-full">Book Now</Button>
                  </DialogTrigger>
                  <DialogContent className="p-6">
                    <h3 className="text-xl font-semibold">Book {place.name}</h3>
                    <p>Enter your details to request a booking.</p>
                    <Label className="mt-2">Your Name</Label>
                    <Input placeholder="Your Name" className="mt-1" />
                    <Label className="mt-2">Email</Label>
                    <Input type="email" placeholder="Your Email" className="mt-1" />
                    <Button
                      className="mt-4 w-full"
                      onClick={() => handleBookPlace(place)}
                    >
                      Confirm Booking
                    </Button>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No places hosted yet.</p>
        )}
      </div>
    </div>
  );
};

export default OwnerProfilePage;
