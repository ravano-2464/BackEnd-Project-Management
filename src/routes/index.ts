import { Router } from "express";
import * as UserController from "../controllers/userController";
import * as RoleController from "../controllers/roleController";

const router = Router();

router.get("/users", UserController.findAll);
router.post("/users", UserController.create);
router.get("/users/:id", UserController.findOne);
router.put("/users/:id", UserController.update);
router.delete("/users/:id", UserController.remove);

router.get("/roles", RoleController.findAll);
router.post("/roles", RoleController.create);
router.get("/roles/:id", RoleController.findOne);
router.put("/roles/:id", RoleController.update);
router.delete("/roles/:id", RoleController.remove);

export default router;
