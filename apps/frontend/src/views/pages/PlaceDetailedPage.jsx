// import { useParams } from "react-router";
import { motion } from "motion/react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertCircle,
  MapPin,
  Star,
  Clock,
  Phone,
  Mail,
  Share2,
} from "lucide-react";
import Features from "@/components/place-details/Features";
import BookingWidget from "@/components/place-details/BookingSystem";
import ImagesAndVideo from "@/components/place-details/ImagesAndVideo";
import Reviews from "@/components/place-details/Reviews";
import LocationMap from "@/components/place-details/LocationMap";
import placesApi from "@/services/places";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

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
  // const { id } = useParams();
  const id = 7;

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

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-4 space-y-8">
        <Skeleton className="h-16 w-2/3 rounded-lg" />
        <Skeleton className="h-[500px] w-full rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Skeleton className="h-80 w-full rounded-xl" />
          </div>
          <Skeleton className="h-80 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (error || !id) {
    return (
      <Alert variant="destructive" className="max-w-7xl mx-auto m-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error?.message ||
            "Failed to load place details. Please try again later."}
        </AlertDescription>
      </Alert>
    );
  }

  if (!place) {
    return (
      <Alert variant="destructive" className="max-w-7xl mx-auto m-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Place Not Found</AlertTitle>
        <AlertDescription>
          The place you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={stagger}
      className="max-w-7xl mx-auto p-6 dark:bg-gray-900 dark:text-white space-y-8"
    >
      {/* Header Section */}
      <motion.div variants={fadeIn} className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-sm">
                {place.category_name || "Entertainment"}
              </Badge>
              <Badge variant="outline" className="text-sm">
                ID: #{place.id}
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
              {place.name}
            </h1>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <MapPin className="h-4 w-4" />
              <p>{place.location}</p>
            </div>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button variant="default" size="sm">
              Book Now
            </Button>
          </div>
        </div>
      </motion.div>

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
            <BookingWidget placeId={place.id} />
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
