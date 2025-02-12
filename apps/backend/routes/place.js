import express from "express";
import {
  addPlace,
  getAllPlaces,
  getPlaceById,
  getPlaceByUser,
  updatePlaceById,
  deletePlaceById,
  deletePlaceByUser,
} from "../controllers/place.js";

import { authenticateUser } from "../middleware/authN.js";

const placesRouter = express.Router();

placesRouter.use(authenticateUser);

placesRouter.get("/", getAllPlaces);
placesRouter.get("/user", getPlaceByUser);
placesRouter.get("/:placeId", getPlaceById);

placesRouter.post("/", addPlace);

placesRouter.put("/:placeId", updatePlaceById);

placesRouter.delete("/:id", deletePlaceById);
placesRouter.delete("/user/:id", deletePlaceByUser);

export default placesRouter;
