
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { AlertTriangle } from "lucide-react";

const OopsPage=()=> {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 dark:bg-red-900 text-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1}}
        transition={{ duration: 0.5}}
        className="flex flex-col items-center"
      >
        <AlertTriangle className="w-20 h-20 text-red-500 dark:text-red-400 animate-bounce" />
        <h1 className="text-6xl font-bold text-red-800 dark:text-white mt-4">Oops!</h1>
        <p className="text-lg text-red-600 dark:text-red-300 mt-2 max-w-md">
          Something went wrong. Please try again later.
        </p>
        <Link to="/">
        <Button className="mt-6" >
          Go Back Home
        </Button>
        </Link>
      </motion.div>
    </div>
  );
}

export default OopsPage;
