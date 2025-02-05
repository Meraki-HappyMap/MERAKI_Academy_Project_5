import express from "express";
import authRoutes from "./auth.js";
import placesRouter from "./place.js";
import categoriesRouter from "./categories.js"
import favoriteRouter from "./favorites.js";
import bookingRouter from "./booking.js";



import reviewsRouter from "./reviews.js"

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/places", placesRouter);
router.use("/favorites", favoriteRouter);
router.use("/booking", bookingRouter)
router.use("/categories", categoriesRouter);



router.use("/reviews", reviewsRouter);

export default router;
