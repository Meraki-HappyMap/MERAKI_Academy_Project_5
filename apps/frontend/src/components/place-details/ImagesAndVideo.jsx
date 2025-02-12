import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

function ImagesAndVideo() {
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



  const { images, videos } = place.data;
  const media = [...images, ...videos];

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="grid grid-cols-5 gap-2 relative">
        <div className="col-span-3">
          <img
            src={images[0]}
            alt="Main"
            className="w-full h-80 object-cover rounded-lg"
          />
        </div>

        <div className="col-span-2 grid grid-cols-2 gap-2 relative">
          {images.slice(1, 4).map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Thumbnail ${index}`}
              className="w-full h-40 object-cover rounded-lg"
            />
          ))}

          {videos.length > 0 && (
            <video
              src={videos[0]}
              controls
              className="w-full h-40 rounded-lg"
            />
          )}

          <Dialog>
            <DialogTrigger className="absolute bottom-0 right-0 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium">
              Show all photos
            </DialogTrigger>
            <DialogContent className="w-full max-w-5xl">
              <div className="grid grid-cols-3 gap-2">
                {media.map((src, index) => (
                  <div key={index} className="relative">
                    {src.endsWith(".mp4") ? (
                      <video
                        src={src}
                        controls
                        className="w-full h-40 rounded-lg"
                      />
                    ) : (
                      <img
                        src={src}
                        alt={`Media ${index}`}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                    )}
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default ImagesAndVideo;
