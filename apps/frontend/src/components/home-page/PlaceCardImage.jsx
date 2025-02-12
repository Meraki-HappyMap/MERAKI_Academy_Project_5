import { motion } from "motion/react";
import { Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";


export const PlaceCardImage = ({ place, imageLoaded, setImageLoaded }) => (
  <div className="aspect-video overflow-hidden rounded-md mx-4">
    {!imageLoaded && (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-zinc-800 animate-pulse">
        <ImageIcon className="w-8 h-8 text-gray-400 dark:text-gray-600" />
      </div>
    )}
    <motion.img
      src={place.images[0]}
      alt={place.name}
      className={cn(
        "w-full h-full object-cover transition-all duration-700",
        "group-hover:scale-105",
        !imageLoaded && "opacity-0",
        imageLoaded && "opacity-100"
      )}
      onLoad={() => setImageLoaded(true)}
      initial={{ scale: 1.1 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    />
  </div>
);
