import { Router } from "express";
import * as UserController from "../controllers/userController";
import * as RoleController from "../controllers/roleController";

const router = Router();

router.get("/users", UserController.findAll);
router.post("/users", UserController.createUser);
router.get("/users/:id", UserController.findOne);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);

router.get("/roles", RoleController.findAll);
export default router;
