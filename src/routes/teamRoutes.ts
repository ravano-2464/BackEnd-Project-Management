import { Router } from "express";

import * as TeamController from "../controllers/teamController";
import { authentication } from "../middlewares/authentication";
import { authorization } from "../middlewares/authorization";

const router = Router();

router.use(authentication);
router.get("/", TeamController.findAll);
router.post(
  "/",
  authorization("admin", "manager", "project manager"),
  TeamController.create
);
router.get("/:id", TeamController.findOne);
router.put(
  "/:id",
  authorization("admin", "manager", "project manager"),
  TeamController.update
);
router.delete(
  "/:id",
  authorization("admin", "manager", "project manager"),
  TeamController.remove
);

export default router;
