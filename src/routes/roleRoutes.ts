import { Router } from "express";
import * as RoleController from "../controllers/roleController";
import { authentication } from "../middlewares/authentication";
import { authorization } from "../middlewares/authorization";

const router = Router();

router.use(authentication);
router.get("/", authorization("admin", "manager"), RoleController.findAll);
router.post("/", authorization("admin"), RoleController.create);
router.get("/:id", authorization("admin"), RoleController.findOne);
router.put("/:id", authorization("admin"), RoleController.update);
router.delete("/:id", authorization("admin"), RoleController.remove);

export default router;
