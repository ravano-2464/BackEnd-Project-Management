import express from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import roleRoutes from "./roleRoutes";
import teamRoutes from "./teamRoutes";
import projectRoutes from "./projectRoutes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/roles", roleRoutes);
router.use("/teams", teamRoutes);
router.use("/projects", projectRoutes);

export default router;
