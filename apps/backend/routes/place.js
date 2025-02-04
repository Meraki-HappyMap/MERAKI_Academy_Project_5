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

placesRouter.post("/", addPlace);
placesRouter.get("/", getAllPlaces);
placesRouter.get("/:id", getPlaceById);
placesRouter.get("/user/:id", getPlaceByUser);
placesRouter.put("/:id", updatePlaceById);
placesRouter.delete("/:id", deletePlaceById);
placesRouter.delete("/user/:id", deletePlaceByUser);

export default placesRouter;
