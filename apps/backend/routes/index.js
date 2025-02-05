import express from "express";
import authRoutes from "./auth.js";
import placesRouter from "./place.js";
import categoriesRouter from "./categories.js"

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/places", placesRouter);
router.use("/categories", categoriesRouter);

export default router;
