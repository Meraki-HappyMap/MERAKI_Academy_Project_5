import express from "express";
import { updateRole, getProfile } from "../controllers/user.js";
import { authenticateUser } from "../middleware/authN.js";

const userRoutes = express.Router();
userRoutes.use(authenticateUser);

userRoutes.get("/profile", getProfile);

userRoutes.put("/role", updateRole);

export default userRoutes;
