import { motion, AnimatePresence } from "framer-motion";
import { PlaceCard } from "./PlaceCard";
import { Link } from "react-router";

const PlaceListings = ({ placesList }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <motion.div
        className="space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {placesList.map((place, index) => (
              <Link to={`/place/${place.id}`} key={place.id}>
                <PlaceCard key={place.id} place={place} index={index} />
              </Link>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default PlaceListings;
