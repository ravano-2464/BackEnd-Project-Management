import { Router } from "express";
import { findAll } from "../controllers/userController";

const router = Router();

router.get("/users", findAll);

export default router;
