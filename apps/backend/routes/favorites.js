import express from "express";
import {
  addToFavorites,
  removeFromFavorites,
  getUserFavorites,
  isPlaceFavorite,
} from "../controllers/favorites.js";

import { authenticateUser } from "../middleware/authN.js";

const favoriteRouter = express.Router();

// favoriteRouter.use(authenticateUser);

favoriteRouter.get("/user/:user_id", getUserFavorites);
favoriteRouter.get("/check/:user_id/:palce_id", isPlaceFavorite);

favoriteRouter.post("/add", addToFavorites);

favoriteRouter.put("/remove", removeFromFavorites);

export default favoriteRouter;
