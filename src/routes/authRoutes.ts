import { Router } from "express";
import * as AuthController from "../controllers/authController";
import { authentication } from "../middlewares/authentication";

const router = Router();

router.post("/login", AuthController.login);
router.use(authentication);
router.get("/me", AuthController.me);

export default router;
