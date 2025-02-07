import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { SparklesCore } from "@/components/ui/sparkles";
import {
  Home,
  Search,
  Building2,
  MapPin,
  Calendar,
  CreditCard,
  Users2,
  X,
} from "lucide-react";
import {
  setFirstTimeLogin,
  updateUserRole,
} from "@/lib/redux/slices/authSlice";

import { updateUserRole as updateUserRoleAPI } from "@/lib/api/authAPI";
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogContainer,
  MorphingDialogClose,
} from "@/components/ui/morphing-dialog";
import { cn } from "@/lib/utils";

const RoleSelectionPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { token } = useSelector((state) => state.auth);

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      await updateUserRoleAPI(token, selectedRole);
      dispatch(updateUserRole(selectedRole));
      dispatch(setFirstTimeLogin(false));
      toast({
        title: "Role selected successfully!",
        description: `You are now a ${selectedRole === "owner" ? "Property Owner" : "Property Explorer"}`,
      });
      navigate("/");
    } catch {
      toast({
        title: "Error",
        description: "Failed to update role. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const roleDetails = {
    owner: {
      title: "Property Owner",
      icon: (
        <Home className="w-20 h-20 text-white drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
      ),
      gradient: "from-blue-500 to-purple-600",
      cardGradient:
        "hover:bg-gradient-to-br hover:from-blue-500/10 hover:to-purple-600/10",
      iconColor: "text-blue-500 group-hover:text-purple-600",
      description:
        "List your properties and earn by renting them out to explorers looking for unique experiences.",
      features: [
        {
          icon: <Building2 className="w-6 h-6" />,
          text: "List multiple properties",
        },
        {
          icon: <CreditCard className="w-6 h-6" />,
          text: "Set your own pricing",
        },
        { icon: <Calendar className="w-6 h-6" />, text: "Manage bookings" },
        {
          icon: <Users2 className="w-6 h-6" />,
          text: "Connect with explorers",
        },
      ],
    },
    user: {
      title: "Property Explorer",
      icon: (
        <Search className="w-20 h-20 text-white drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
      ),
      gradient: "from-green-500 to-teal-600",
      cardGradient:
        "hover:bg-gradient-to-br hover:from-green-500/10 hover:to-teal-600/10",
      iconColor: "text-green-500 group-hover:text-teal-600",
      description:
        "Discover and book amazing properties for your next adventure or gathering.",
      features: [
        {
          icon: <MapPin className="w-6 h-6" />,
          text: "Explore unique locations",
        },
        { icon: <Calendar className="w-6 h-6" />, text: "Easy booking system" },
        { icon: <Users2 className="w-6 h-6" />, text: "Connect with owners" },
        { icon: <CreditCard className="w-6 h-6" />, text: "Secure payments" },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-zinc-950 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="tsparticlesfullscreen"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
          speed={0.5}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full space-y-8 relative z-10"
      >
        <div className="text-center space-y-4">
          <motion.h1
            className="text-4xl font-bold text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Welcome to{" "}
            <span className="text-rose-500 inline-block hover:scale-110 transition-transform cursor-default">
              Happy
            </span>
            Map{" "}
            <span className="text-rose-500 animate-bounce inline-block">!</span>
          </motion.h1>
          <motion.p
            className="text-zinc-400 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Choose how you&apos;d like to use our platform
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <AnimatePresence mode="wait">
            {Object.entries(roleDetails).map(([role, details], index) => (
              <motion.div
                key={role}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: openDialog === null || openDialog === role ? 1 : 0,
                  scale: openDialog === null || openDialog === role ? 1 : 0.8,
                  y: 0,
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <MorphingDialog
                  key={role}
                  transition={{ duration: 0.3 }}
                  onOpenChange={(open) => setOpenDialog(open ? role : null)}
                >
                  <MorphingDialogTrigger className="w-full">
                    <Card
                      className={cn(
                        "p-6 cursor-pointer transition-all duration-300 w-full",
                        "hover:shadow-2xl hover:-translate-y-1",
                        "border border-zinc-200 dark:border-zinc-800",
                        "hover:border-primary/50 dark:hover:border-primary/50",
                        details.cardGradient
                      )}
                    >
                      <div className="space-y-4">
                        <div
                          className={cn(
                            "h-40 bg-gradient-to-br rounded-lg",
                            "flex items-center justify-center",
                            "transition-transform duration-300 group-hover:scale-105",
                            details.gradient
                          )}
                        >
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 10,
                            }}
                          >
                            {details.icon}
                          </motion.div>
                        </div>
                        <motion.h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400">
                          {details.title}
                        </motion.h2>
                        <p className="text-zinc-500 line-clamp-2">
                          {details.description}
                        </p>
                      </div>
                    </Card>
                  </MorphingDialogTrigger>

                  <MorphingDialogContainer>
                    <MorphingDialogContent
                      className={cn(
                        "bg-white dark:bg-zinc-950 rounded-lg p-6 max-w-2xl w-full mx-4",
                        "shadow-[0_0_50px_-12px] shadow-zinc-700/10",
                        "border border-zinc-200 dark:border-zinc-800"
                      )}
                    >
                      <div className="relative">
                        <div
                          className={cn(
                            "h-48 bg-gradient-to-br rounded-lg",
                            "flex items-center justify-center mb-6",
                            "transition-all duration-500",
                            details.gradient
                          )}
                        >
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 10,
                            }}
                          >
                            {details.icon}
                          </motion.div>
                        </div>
                        <motion.h2
                          className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                        >
                          {details.title}
                        </motion.h2>
                        <motion.p
                          className="text-zinc-500 mb-6"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          {details.description}
                        </motion.p>

                        <div className="space-y-6">
                          <div>
                            <motion.h3
                              className="text-xl font-semibold mb-4"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.2 }}
                            >
                              Key Features
                            </motion.h3>
                            <div className="grid grid-cols-2 gap-4">
                              {details.features.map((feature, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.2 + index * 0.1 }}
                                  className="flex items-center space-x-3 text-zinc-600 dark:text-zinc-400 group"
                                  whileHover={{ x: 5 }}
                                >
                                  <span
                                    className={cn(
                                      "transition-all duration-300 group-hover:scale-110",
                                      details.iconColor
                                    )}
                                  >
                                    {feature.icon}
                                  </span>
                                  <span
                                    className={cn(
                                      "transition-colors",
                                      details.iconColor
                                    )}
                                  >
                                    {feature.text}
                                  </span>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          <div className="flex justify-end space-x-2">
                            <MorphingDialogClose asChild>
                              <Button
                                variant="outline"
                                disabled={isLoading}
                                size="icon"
                                className="hover:bg-rose-50 dark:hover:bg-rose-950 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </MorphingDialogClose>
                            <Button
                              onClick={() => {
                                setSelectedRole(role);
                                handleConfirm();
                              }}
                              disabled={isLoading}
                              className={cn(
                                "relative overflow-hidden transition-all",
                                "hover:shadow-lg",
                                isLoading && "animate-pulse"
                              )}
                            >
                              <motion.span
                                initial={false}
                                animate={{
                                  opacity: isLoading ? 0 : 1,
                                  y: isLoading ? 20 : 0,
                                }}
                              >
                                {isLoading ? "Confirming..." : "Confirm"}
                              </motion.span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </MorphingDialogContent>
                  </MorphingDialogContainer>
                </MorphingDialog>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default RoleSelectionPage;
