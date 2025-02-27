import express from "express";
import {
  toggleFavorite,
  getUserFavorites,
  isPlaceFavorite,
} from "../controllers/favorites.js";

import { authenticateUser } from "../middleware/authN.js";

const favoriteRouter = express.Router();

favoriteRouter.use(authenticateUser);

favoriteRouter.post("/toggleFavorite/:place_id", toggleFavorite);
favoriteRouter.get("/user", getUserFavorites);
favoriteRouter.get("/check/:place_id", isPlaceFavorite);


export default favoriteRouter;
