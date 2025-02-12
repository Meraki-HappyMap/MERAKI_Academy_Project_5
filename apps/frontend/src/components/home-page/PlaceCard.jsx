import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { PlaceCardHeader } from "./PlaceCardHeader";
import { PlaceCardImage } from "./PlaceCardImage";
import { PlaceCardStats } from "./PlaceCardStats";
import { PlaceCardDescription } from "./PlaceCardDescription";
import { PlaceCardFooter } from "./PlaceCardFooter";

export const PlaceCard = ({ place, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.1,
      }}
      className="h-full"
      whileHover={{ y: -5 }}
    >
      <Card className="h-full flex flex-col group hover:shadow-xl transition-all duration-500 dark:bg-zinc-900/50 dark:hover:bg-zinc-900 dark:border-zinc-800 dark:shadow-[0_4px_12px_0px_rgba(255,255,255,0.05)] dark:hover:shadow-[0_8px_24px_0px_rgba(255,255,255,0.1)] backdrop-blur-sm">
        <PlaceCardHeader place={place} index={index} />

        <CardContent className="flex-none p-0 relative">
          <PlaceCardImage
            place={place}
            imageLoaded={imageLoaded}
            setImageLoaded={setImageLoaded}
          />
          <PlaceCardStats
            rating={place.average_rating}
            reviews={place.total_reviews}
            price={place.price_per_night}
          />
        </CardContent>

        <PlaceCardDescription description={place.description} />
        <PlaceCardFooter username={place.owner_username} />
      </Card>
    </motion.div>
  );
};
