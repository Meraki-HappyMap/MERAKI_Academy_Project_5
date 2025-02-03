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

placesRouter.post("/", addPlace);
placesRouter.get("/", getAllPlaces);
placesRouter.get("/:id", getPlaceById);
placesRouter.get("/userName/:id", getPlaceByUser);
placesRouter.put("/:id", updatePlaceById);
placesRouter.delete("/:id", deletePlaceById);
placesRouter.delete("/userName/:id", deletePlaceByUser);

export default placesRouter;
