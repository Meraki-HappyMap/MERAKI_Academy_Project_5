
 import React from "react";
import {Link} from "react-router"
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Ghost } from "lucide-react";

const NotFoundPage =()=>{
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <Ghost className="w-20 h-20 text-gray-500 dark:text-gray-400 animate-pulse" />
        <h1 className="text-6xl font-bold text-gray-800 dark:text-white mt-4">404</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
          Oops! The page you are looking for does not exist.
        </p>
        <Link to="/" >
        <Button className="mt-6" >Return Home</Button>
        </Link>
      </motion.div>
    </div>
  );
}
 export default NotFoundPage;