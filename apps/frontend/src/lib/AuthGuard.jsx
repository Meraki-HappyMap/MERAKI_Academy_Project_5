import Logo from "../components/Logo";
import { AnimatedShinyText } from "../components/ui/Loaders/AnimatedShinyText";
import { MirageLoader } from "../components/ui/Loaders/mirageLoader";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { setLoading } from "@/lib/redux/slices/authSlice";

export const AuthGuard = ({ children }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
      dispatch(setLoading(false));
      if (!isAuthenticated) {
        navigate("/signin");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isAuthenticated, isLoading, navigate, dispatch]);

  if (isLoading || showLoading) {
    return (
      <div className="fixed inset-0 bg-background flex flex-col gap-8 items-center justify-center z-50">
        <AnimatedShinyText>
          <div className="flex items-center text-5xl">
            <Logo className="text-5xl" />
          </div>
        </AnimatedShinyText>
        <MirageLoader />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
