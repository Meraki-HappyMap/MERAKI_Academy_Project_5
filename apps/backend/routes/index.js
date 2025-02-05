import express from "express";
import authRoutes from "./auth.js";
import placesRouter from "./place.js";
// import userRoutes from "./user.js";

import favoriteRouter from "./favorites.js";
import bookingRouter from "./booking.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/places", placesRouter);

router.use("/favorites", favoriteRouter);
router.use("/booking", bookingRouter)
// router.use("/users", userRoutes);

export default router;
