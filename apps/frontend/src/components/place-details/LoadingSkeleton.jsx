import { motion } from "motion/react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

const LoadingSkeleton = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.5 },
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const shimmer = {
    animate: {
      background: ["hsl(0, 0%, 98%)", "hsl(0, 0%, 93%)", "hsl(0, 0%, 98%)"],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={stagger}
      className="max-w-7xl mx-auto p-6 space-y-8"
    >
      {/* Header Skeleton */}
      <motion.div variants={fadeIn} className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <Skeleton className="h-12 w-[300px] rounded-lg" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-5 w-32 rounded-md" />
            </div>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Skeleton className="h-9 w-24 rounded-md" />
            <Skeleton className="h-9 w-24 rounded-md" />
          </div>
        </div>
      </motion.div>

      {/* Image Gallery Skeleton */}
      <motion.div variants={fadeIn} className="relative">
        <Skeleton className="h-[500px] w-full rounded-xl" />
        <div className="absolute bottom-4 right-4 flex gap-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 w-16 rounded-lg" />
          ))}
        </div>
      </motion.div>

      {/* Content Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <motion.div variants={fadeIn} className="md:col-span-2 space-y-8">
          <Card className="p-6 space-y-6">
            <Skeleton className="h-8 w-48 rounded-lg" />
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-4 w-full rounded-md" />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-12 rounded-lg" />
              ))}
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <Skeleton className="h-8 w-32 rounded-lg" />
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-32 rounded-md" />
                    <Skeleton className="h-4 w-full rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <Skeleton className="h-8 w-32 rounded-lg" />
            <Skeleton className="h-[200px] w-full rounded-lg" />
          </Card>
        </motion.div>

        {/* Right Column */}
        <motion.div variants={fadeIn} className="space-y-8">
          <Card className="p-6 space-y-6">
            <Skeleton className="h-8 w-48 rounded-lg" />
            <div className="flex items-center gap-4">
              <div className="relative">
                <Skeleton className="h-16 w-16 rounded-full" />
                <Skeleton className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full" />
              </div>
              <div className="space-y-2 flex-1">
                <Skeleton className="h-5 w-32 rounded-md" />
                <Skeleton className="h-4 w-24 rounded-md" />
              </div>
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-md" />
                  <Skeleton className="h-4 flex-1 rounded-md" />
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-4">
              <Skeleton className="h-8 w-32 rounded-lg" />
              <Skeleton className="h-[300px] w-full rounded-lg" />
              <div className="flex justify-end">
                <Skeleton className="h-10 w-32 rounded-md" />
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-24 rounded-md" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-md" />
              </div>
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      variants={shimmer}
                      className="h-full w-full"
                      style={{
                        width: `${100 - i * 20}%`,
                      }}
                    />
                  </div>
                  <Skeleton className="h-4 w-4 rounded-md" />
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export { LoadingSkeleton };
