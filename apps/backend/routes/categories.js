import express from "express";
import {
  addCategory,
  getAllCategory,
  getCategoryById,
  getPlacesByCategoryId,
  updateCategory,
  deleteCategoryById,
} from "../controllers/categories.js";

import { authenticateUser } from "../middleware/authN.js";

const categoriesRouter = express.Router();

// categoriesRouter.use(authenticateUser);

categoriesRouter.get("/", getAllCategory);
categoriesRouter.get("/:id", getCategoryById);

categoriesRouter.post("/", addCategory);
categoriesRouter.post("/places/:id", getPlacesByCategoryId);

categoriesRouter.put("/:id", updateCategory);

categoriesRouter.delete("/:id", deleteCategoryById);

export default categoriesRouter;
