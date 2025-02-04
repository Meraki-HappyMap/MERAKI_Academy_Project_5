import { useState, useEffect } from "react";
import { useLocation, Outlet } from "react-router";
import { AnimatePresence, motion } from "motion/react";

const ContentWrapper = ({ onLoaded, children }) => {
  useEffect(() => {
    onLoaded();
  }, [onLoaded]);
  return children;
};

const PageTransition = () => {
  const location = useLocation();
  const [displayedLocation, setDisplayedLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("idle");
  const [startAnimationDone, setStartAnimationDone] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(true);

  useEffect(() => {
    if (location.pathname !== displayedLocation.pathname) {
      setTransitionStage("start");
      setStartAnimationDone(false);
      setContentLoaded(false);
      console.log(location);
    }
  }, [location, displayedLocation]);

  useEffect(() => {
    if (transitionStage === "start" && startAnimationDone && contentLoaded) {
      setDisplayedLocation(location);
      setTransitionStage("end");
    }
  }, [transitionStage, startAnimationDone, contentLoaded, location]);

  const handleAnimationComplete = () => {
    if (transitionStage === "start") {
      setStartAnimationDone(true);
      if (contentLoaded) {
        setDisplayedLocation(location);
        setTransitionStage("end");
      }
    } else if (transitionStage === "end") {
      setTransitionStage("idle");
    }
  };

  return (
    <>
      <ContentWrapper onLoaded={() => setContentLoaded(true)}>
        <Outlet key={displayedLocation.pathname} />
      </ContentWrapper>

      <AnimatePresence>
        {transitionStage !== "idle" && (
          <motion.div
            key="transition-overlay"
            initial={{ x: "-100%" }}
            animate={transitionStage === "start" ? { x: "0%" } : { x: "100%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onAnimationComplete={handleAnimationComplete}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "#000",
              zIndex: 9999,
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default PageTransition;
