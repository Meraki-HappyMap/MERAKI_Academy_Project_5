import express from "express";
import {
  addReview,
  getReviewsByPlace,
  updateReview,
  deleteReview,
} from "../controllers/reviews.js";

import { authenticateUser } from "../middleware/authN.js";

const reviewsRouter = express.Router();

// placesRouter.use(authenticateUser);

reviewsRouter.post("/", addReview);
reviewsRouter.get("/:place_id", getReviewsByPlace);
reviewsRouter.put("/:id", updateReview);
reviewsRouter.delete("/:id", deleteReview);

export default reviewsRouter;
