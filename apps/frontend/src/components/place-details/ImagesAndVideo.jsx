import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
      ],
      videos: ["https://www.w3schools.com/html/mov_bbb.mp4"],
    },
  };

  const { images, videos } = place.data;
  const media = [...images, ...videos];

  return (
    <div className="max-w-5xl mx-auto p-4">
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {media.map((src, index) => (
            <CarouselItem
              key={index}
              className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-2">
                  {src.endsWith(".mp4") ? (
                    <video src={src} controls className="w-full h-full rounded-lg" />
                  ) : (
                    <img src={src} alt={`Media ${index}`} className="w-full h-full object-cover rounded-lg" />
                  )}
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <Dialog>
        <DialogTrigger className="mt-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium">
          Show all photos
        </DialogTrigger>
        <DialogContent className="w-full max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {media.map((src, index) => (
              <div key={index} className="relative">
                {src.endsWith(".mp4") ? (
                  <video src={src} controls className="w-full h-40 rounded-lg" />
                ) : (
                  <img src={src} alt={`Media ${index}`} className="w-full h-40 object-cover rounded-lg" />
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ImagesAndVideo;
