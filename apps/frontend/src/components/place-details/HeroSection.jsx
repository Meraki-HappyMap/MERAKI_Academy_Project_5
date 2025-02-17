import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Share2, Check } from "lucide-react";

const HeroSection = ({ place, handleShare, isCopied, fadeIn }) => {
  return (
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
          <Button
            variant="outline"
            size="sm"
            className="gap-2 relative"
            onClick={handleShare}
          >
            {isCopied ? (
              <>
                <Check className="h-4 w-4 text-green-500" />
                Copied!
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4" />
                Share
              </>
            )}
          </Button>
          <Button variant="default" size="sm">
            Book Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroSection;
