import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";

const Logo = ({ className, size = "default" }) => {
  const sizes = {
    small: {
      container: "h-6",
      icon: "h-5 w-5",
      iconSizeValue: 20,
      text: "text-lg",
    },
    default: {
      container: "h-8",
      icon: "h-6 w-6",
      iconSizeValue: 24,
      text: "text-xl",
    },
    large: {
      container: "h-10",
      icon: "h-8 w-8",
      iconSizeValue: 32,
      text: "text-2xl",
    },
  };

  const currentSizes = sizes[size] || sizes.default;

  return (
    <div
      role="img"
      aria-label="HappyMap logo"
      className={cn(
        "flex items-center gap-2 group cursor-pointer transition-transform duration-300 hover:shadow-2xl hover:scale-105",
        className
      )}
    >
      <span
        className={cn(
          "font-bold tracking-wide text-gray-900 dark:text-gray-100 font-['Righteous',system-ui] antialiased",
          currentSizes.text
        )}
      >
        <span className="text-rose-500">Happy</span>Map
      </span>
      <div className="relative">
        <MapPin
          className={cn(
            "text-rose-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-15",
            currentSizes.icon
          )}
          strokeWidth={2.5}
        />
      </div>
    </div>
  );
};

export default Logo;
