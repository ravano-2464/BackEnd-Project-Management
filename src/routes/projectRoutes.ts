import { Router } from "express";

import * as ProjectController from "../controllers/projectController";
import { authentication } from "../middlewares/authentication";

const router = Router();

router.use(authentication);
router.get("/", ProjectController.findAll);
router.get("/user", ProjectController.findAllByUser);
router.get("/:projectId/user", ProjectController.findOneByUser);
router.get("/:id", ProjectController.findOne);
router.post("/", ProjectController.create);
router.put("/:id", ProjectController.update);
router.delete("/:id", ProjectController.remove);

export default router;
