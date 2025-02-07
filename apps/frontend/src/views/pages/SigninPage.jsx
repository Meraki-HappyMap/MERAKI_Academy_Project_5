import Logo from "@/components/logo.jsx";
import { motion } from "framer-motion";

import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  checkAuthUser,
  clearError,
  setFirstTimeLogin,
} from "@/lib/redux/slices/authSlice";
import { LoginForm } from "@/components/signin-page/LoginForm";
import { useToast } from "@/hooks/use-toast";
import { Spotlight } from "@/components/ui/Spotlight";

const SigninPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, user, error, firstTimeLogin } = useSelector(
    (state) => state.auth
  );
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const searchError = searchParams.get("error");

    if (searchError === "auth_failed") {
      toast({
        variant: "destructive",
        title: "Authentication Failed",
        description: "Failed to sign in. Please try again.",
      });
      return;
    }

    if (token) {
      dispatch(setFirstTimeLogin(true));
      localStorage.setItem("token", token);
    }
  }, [searchParams, dispatch, toast]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isAuthenticated) {
      dispatch(checkAuthUser(token));
    }
    if (isAuthenticated) {
      if (firstTimeLogin && user) {
        toast({
          variant: "success",
          title: "Welcome!",
          description: `Welcome back ${user.fullName}!`,
        });
        dispatch(setFirstTimeLogin(false));
        setTimeout(() => {
          navigate("/");
        }, 1500);
        return;
      }
      navigate("/");
    }
  }, [isAuthenticated, firstTimeLogin, user, dispatch, navigate, toast]);

  // Handle error notifications
  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Please try again.",
        description: "Failed to sign in or session expired.",
      });
      dispatch(clearError());
    }
  }, [error, dispatch, toast]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-b from-slate-950 to-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,65,105,0.05),transparent)] animate-pulse-slow" />

      <div className="relative w-full h-full flex flex-col items-center">
        <Spotlight
          fill="#f43f5e"
          className="-top-16 left-0 md:left-40 md:-top-40 lg:left-[15%] lg:-top-52"
        />
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full flex justify-center mt-20"
        >
          <Logo className="transform-gpu scale-125 hover:scale-110 transition-transform duration-300" />
        </motion.div>

        <div className="mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-full max-w-md mx-auto px-4 pt-4"
          >
            <LoginForm className="w-full backdrop-blur-3xl" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute bottom-6 text-center text-sm text-gray-400"
        >
          <p>Experience the joy of discovering new places</p>
        </motion.div>
      </div>
    </div>
  );
};

export default SigninPage;
