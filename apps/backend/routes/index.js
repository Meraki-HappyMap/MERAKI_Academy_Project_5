import express from "express";
import authRoutes from "./auth.js";
import placesRouter from "./place.js";
// import userRoutes from "./user.js";



import reviewsRouter from "./reviews.js"

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/places", placesRouter);
// router.use("/users", userRoutes);



router.use("/reviews", reviewsRouter);

export default router;
