import { useState } from "react";
import { Link } from "react-router";
import { Search, MapPin, Menu, User } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ThemeToggle } from "../theme/theme-toggle";
import Logo from "../logo";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll event listener
  useState(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md dark:bg-gray-900" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center">
            <Logo size={isScrolled ? "small" : "default"} />
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <div className="flex items-center border rounded-full p-2 shadow-sm hover:shadow-md transition-all dark:border-gray-700">
                <input
                  type="text"
                  placeholder="Search places..."
                  className="w-full bg-transparent border-none focus:outline-none px-4 dark:text-gray-100"
                />
                <Button size="icon" variant="ghost" className="rounded-full">
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center space-x-4">
            {/* TODO: Explore Button Feature */}
            <Button
              variant="ghost"
              className="hidden md:flex items-center gap-2"
            >
              <MapPin className="h-5 w-5" />
              Explore
            </Button>

            <ThemeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-full p-3">
                  <Menu className="h-5 w-5" />
                  <User className="h-5 w-5 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <Link to="/signin">
                  <DropdownMenuItem className="cursor-pointer">
                    Sign In
                  </DropdownMenuItem>
                </Link>

                {/* TODO: alter two menu items to show only if user is logged in */}
                <Link to="/bookings">
                  <DropdownMenuItem className="cursor-pointer">
                    My Bookings (todo)
                  </DropdownMenuItem>
                </Link>
                {/* TODO: Add a logout button */}
                <DropdownMenuItem className="cursor-pointer" onClick={() => {}}>
                  Logout (todo)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
