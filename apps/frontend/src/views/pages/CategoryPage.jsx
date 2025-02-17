import { useParams, Navigate } from "react-router";
import { motion } from "motion/react";
import { getCategoryBySlug } from "@/lib/constants/categories";
import PlaceListings from "@/components/home-page/PlaceListings";
import placesApi from "@/services/places";

const CategoryPage = () => {
  const { categorySlug } = useParams();

  const categoryId = getCategoryBySlug(categorySlug);

  if (!categoryId) {
    return <Navigate to="/404" replace />;
  }

  const { data: places, isLoading: isPlacesLoading } =
    placesApi.useCategoryPlaces(categoryId);

  if (isPlacesLoading) {
    return (
      <div className="w-full h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (places?.length === 0 || !places) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full h-[50vh] flex flex-col items-center justify-center space-y-4 px-4 text-center"
      >
        <h2 className="text-2xl font-semibold">No Places Found</h2>
        <p className="text-muted-foreground max-w-md">
          We couldn&apos;t find any places in the {categorySlug} category.
          Please try another category or check back later.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col">
      <PlaceListings placesList={places} />
    </div>
  );
};

export default CategoryPage;
