import { motion } from "motion/react";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const PlaceCardFooter = ({ username }) => (
  <CardFooter className="flex-none flex flex-col sm:flex-row justify-between items-center gap-4 p-4 border-t dark:border-zinc-800/50">
    <motion.div className="flex items-center" whileHover={{ scale: 1.02 }}>
      <Avatar className="h-8 w-8 mr-2 ring-2 ring-offset-2 ring-primary/20 dark:ring-white/30 dark:ring-offset-zinc-900 dark:shadow-[0_2px_8px_0px_rgba(255,255,255,0.08)]">
        <AvatarImage
          src={`https://placehold.co/40x40/EEE/31343C/png?text=${username.substring(0, 2)}`}
          alt={username}
        />
        <AvatarFallback className="bg-primary/10 dark:bg-primary/20">
          {username.substring(0, 2)}
        </AvatarFallback>
      </Avatar>
      <span className="text-sm text-gray-600 dark:text-gray-400">
        Listed by{" "}
        <span className="font-semibold hover:text-primary transition-colors dark:text-gray-300">
          {username}
        </span>
      </span>
    </motion.div>

    <Button
      variant="default"
      size="sm"
      className="w-full sm:w-auto font-semibold shadow-lg hover:shadow-xl dark:shadow-[0_2px_8px_0px_rgba(255,255,255,0.08)] dark:hover:shadow-[0_4px_12px_0px_rgba(255,255,255,0.12)] transition-all duration-300 bg-gradient-to-r from-primary to-primary/90"
    >
      View Details
    </Button>
  </CardFooter>
);
