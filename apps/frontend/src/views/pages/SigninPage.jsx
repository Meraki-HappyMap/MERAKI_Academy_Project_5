import Logo from "@/components/logo.jsx";

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
// import { AuroraBackground } from "@/components/ui/aurora-background";

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
    <div className="h-screen w-screen">
      <div className="z-10 flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-2xl flex-col items-center gap-6">
          <Logo />
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
