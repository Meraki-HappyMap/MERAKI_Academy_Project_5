import express from "express";
import authRoutes from "./auth.js";
import userRoutes from "./user.js";
import placeRoutes from "./place.js";
import bookingRoutes from "./booking.js";
import reviewsRoutes from "./reviews.js";
import favoritesRoutes from "./favorites.js";
import categoriesRoutes from "./categories.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/places", placeRoutes);
router.use("/bookings", bookingRoutes);
router.use("/reviews", reviewsRoutes);
router.use("/favorites", favoritesRoutes);
router.use("/categories", categoriesRoutes);

export default router;
