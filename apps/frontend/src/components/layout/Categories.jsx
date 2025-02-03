import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Gamepad2,
  Coffee,
  Dumbbell,
  Music2,
  Palette,
  Volleyball,
  UtensilsCrossed,
  Trees,
  ShoppingBag,
  PartyPopper,
  Bike,
  Tent,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";

const categories = [
  {
    label: "Gaming",
    icon: Gamepad2,
    path: "/category/gaming",
  },
  {
    label: "Cafes",
    icon: Coffee,
    path: "/category/cafes",
  },
  {
    label: "Fitness",
    icon: Dumbbell,
    path: "/category/fitness",
  },
  {
    label: "Music",
    icon: Music2,
    path: "/category/music",
  },
  {
    label: "Art",
    icon: Palette,
    path: "/category/art",
  },
  {
    label: "Sports",
    icon: Volleyball,
    path: "/category/sports",
  },
  {
    label: "Restaurants",
    icon: UtensilsCrossed,
    path: "/category/restaurants",
  },
  {
    label: "Parks",
    icon: Trees,
    path: "/category/parks",
  },
  {
    label: "Shopping",
    icon: ShoppingBag,
    path: "/category/shopping",
  },
  {
    label: "Events",
    icon: PartyPopper,
    path: "/category/events",
  },
  {
    label: "Cycling",
    icon: Bike,
    path: "/category/cycling",
  },
  {
    label: "Camping",
    icon: Tent,
    path: "/category/camping",
  },
];

const Categories = () => {
  const [selected, setSelected] = useState("");
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();

  const handleSelect = (path) => {
    setSelected(path);
    navigate(path);
  };

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === "left" ? -200 : 200;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setShowLeftScroll(scrollLeft > 0);
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      // Initial check
      checkScroll();
      return () => container.removeEventListener("scroll", checkScroll);
    }
  }, []);

  return (
    <div className="w-full border-t border-b dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-20 z-40">
      <div className="max-w-screen-xl mx-auto">
        <div className="relative flex justify-center px-4 py-2">
          {/* Scroll Buttons */}
          {showLeftScroll && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
          {showRightScroll && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}

          {/* Categories Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth px-8 max-w-full mx-auto touch-pan-x"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((item) => (
              <Button
                key={item.label}
                onClick={() => handleSelect(item.path)}
                variant="ghost"
                className={cn(
                  "flex flex-col items-center justify-center gap-1 py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 min-w-[80px] h-[70px]",
                  selected === item.path &&
                    "border-b-2 border-primary rounded-none hover:bg-transparent dark:hover:bg-transparent"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs font-medium whitespace-nowrap">
                  {item.label}
                </span>
              </Button>
            ))}
          </div>

          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white dark:from-gray-900 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white dark:from-gray-900 to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default Categories;
