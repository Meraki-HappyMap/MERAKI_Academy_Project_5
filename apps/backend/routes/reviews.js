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

reviewsRouter.get("/:place_id", getReviewsByPlace);

reviewsRouter.post("/", addReview);

reviewsRouter.put("/:id", updateReview);

reviewsRouter.delete("/:id", deleteReview);

export default reviewsRouter;
