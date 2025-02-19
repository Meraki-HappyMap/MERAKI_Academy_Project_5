import { Navigate, useParams } from "react-router";
import { motion } from "motion/react";
import { Star, Clock, Phone, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { LoadingSkeleton } from "@/components/place-details/LoadingSkeleton";
import { useToast } from "@/hooks/use-toast";

import Features from "@/components/place-details/Features";
import BookingWidget from "@/components/place-details/BookingSystem";
import ImagesAndVideo from "@/components/place-details/ImagesAndVideo";
import Reviews from "@/components/place-details/Reviews";
import LocationMap from "@/components/place-details/LocationMap";
import placesApi from "@/services/places";
import HeroSection from "@/components/place-details/HeroSection";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { duration: 0.5 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const PlaceDetailedPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);

  const {
    data: place,
    isLoading,
    error,
    refetch,
  } = placesApi.useOne(id, {
    enabled: !!id,
    retry: 2,
    onError: (err) => {
      console.error("Failed to fetch place:", err);
    },
  });

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id, refetch]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      toast({
        title: "Link Copied!",
        description: "The URL has been copied to your clipboard.",
        duration: 2000,
      });

      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <Navigate to="/oops" />;
  }

  if (!place || !id) {
    return <Navigate to="/404" />;
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={stagger}
      className="max-w-7xl mx-auto p-6 dark:bg-gray-900 dark:text-white space-y-8"
    >
      <HeroSection
        place={place}
        handleShare={handleShare}
        isCopied={isCopied}
        fadeIn={fadeIn}
      />

      {/* Images Section */}
      <motion.div
        variants={fadeIn}
        className="rounded-xl overflow-hidden shadow-xl"
      >
        <ImagesAndVideo place={place} />
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <motion.div variants={fadeIn} className="md:col-span-2 space-y-8">
          <Card className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold">About this place</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {place.description}
            </p>
            <Features place={place} />
          </Card>

          <Card className="p-6">
            <Reviews placeId={place.id} />
          </Card>

          <Card className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold">Location</h2>
            <div className="rounded-lg overflow-hidden">
              <LocationMap location={place.location} />
            </div>
          </Card>
        </motion.div>

        {/* Right Column */}
        <motion.div variants={fadeIn} className="space-y-8">
          <Card className="p-6 space-y-6">
            <h2 className="text-xl font-semibold">Owner Information</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={place.avatar_url}
                    alt={place.owner_username}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-primary ring-offset-2"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white" />
                </div>
                <div>
                  <p className="font-medium text-lg">{place.owner_username}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Verified Owner
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Mail className="h-4 w-4" />
                  <p className="text-sm">{place.owner_email}</p>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Phone className="h-4 w-4" />
                  <p className="text-sm">{place.phone_number}</p>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Clock className="h-4 w-4" />
                  <p className="text-sm">Usually responds within 1 hour</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden">
            <BookingWidget place={place} />
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Rating</h3>
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">4.8</span>
                <span className="text-gray-500 text-sm">(124 reviews)</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-400 h-2 rounded-full w-[90%]" />
                </div>
                <span className="text-sm text-gray-600">5</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-400 h-2 rounded-full w-[70%]" />
                </div>
                <span className="text-sm text-gray-600">4</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-400 h-2 rounded-full w-[20%]" />
                </div>
                <span className="text-sm text-gray-600">3</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PlaceDetailedPage;
