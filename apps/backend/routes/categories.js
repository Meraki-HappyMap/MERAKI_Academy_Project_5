import express from "express";
import {
  addCategory,
  getAllCategory,
  getCategoryById,
  getPlacesByCategoryId,
  updateCategory,
  deleteCategoryById,
} from "../controllers/categories";

import { authenticateUser } from "../middleware/authN.js";

const categoriesRouter = express.Router();

categoriesRouter.use(authenticateUser);

categoriesRouter.post("/", addCategory);
categoriesRouter.get("/", getAllCategory);
categoriesRouter.get("/:id", getCategoryById);
categoriesRouter.post("/places/:id", getPlacesByCategoryId);
categoriesRouter.put("/", updateCategory);
categoriesRouter.delete("/", deleteCategoryById);

export default categoriesRouter
