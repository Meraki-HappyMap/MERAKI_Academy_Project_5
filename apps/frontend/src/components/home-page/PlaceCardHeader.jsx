import { motion } from "motion/react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

export const PlaceCardHeader = ({ place, index }) => (
  <CardHeader className="flex-none p-4 space-y-2">
    <div className="flex items-center justify-between gap-2">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.15 }}
      >
        <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-1">
          {place.name}
        </CardTitle>
      </motion.div>
      <Badge
        variant="secondary"
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
      >
        {place.category}
      </Badge>
    </div>
    <CardDescription className="text-sm text-gray-500 flex items-center gap-2 mt-2 dark:text-gray-400">
      <MapPin className="h-4 w-4 text-primary" />
      <span className="line-clamp-1">{place.location}</span>
    </CardDescription>
  </CardHeader>
);
