import { Router } from "express";
import * as UserController from "../controllers/userController";
import { authentication } from "../middlewares/authentication";
import { authorization } from "../middlewares/authorization";

const router = Router();

router.use(authentication);
router.get("/", UserController.findAll);
router.post("/", authorization("admin"), UserController.create);
router.get("/:id", authorization("admin"), UserController.findOne);
router.put("/:id", authorization("admin"), UserController.update);
router.delete("/:id", authorization("admin"), UserController.remove);

export default router;
