import { motion } from "motion/react";
import { Star, CreditCard } from "lucide-react";

export const PlaceCardStats = ({ rating, reviews, price }) => (
  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center gap-2">
    <motion.div
      className="flex items-center bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg hover:shadow-xl dark:shadow-[0_2px_8px_0px_rgba(255,255,255,0.08)] dark:hover:shadow-[0_4px_12px_0px_rgba(255,255,255,0.12)] transition-all duration-300"
      whileHover={{ scale: 1.05 }}
    >
      <Star className="h-4 w-4 text-yellow-500 mr-1" />
      <span className="font-bold dark:text-gray-200">{rating}</span>
      <span className="text-gray-500 ml-1 dark:text-gray-400 text-sm">
        ({reviews})
      </span>
    </motion.div>

    <motion.div
      className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg hover:shadow-xl dark:shadow-[0_2px_8px_0px_rgba(255,255,255,0.08)] dark:hover:shadow-[0_4px_12px_0px_rgba(255,255,255,0.12)] transition-all duration-300"
      whileHover={{ scale: 1.05 }}
    >
      <span className="flex items-center">
        <CreditCard className="h-4 w-4 text-green-500 mr-1" />
        <span className="font-bold dark:text-gray-200">${price}</span>
        <span className="text-gray-500 ml-1 dark:text-gray-400 text-sm">
          /night
        </span>
      </span>
    </motion.div>
  </div>
);
