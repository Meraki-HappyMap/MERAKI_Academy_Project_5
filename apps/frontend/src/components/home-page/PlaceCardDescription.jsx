import { CardContent } from "@/components/ui/card";

export const PlaceCardDescription = ({ description }) => (
  <CardContent className="flex-1 p-4">
    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 leading-relaxed">
      {description}
    </p>
  </CardContent>
);
