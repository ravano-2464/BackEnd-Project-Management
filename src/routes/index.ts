import express from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import roleRoutes from "./roleRoutes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/roles", roleRoutes);

export default router;
