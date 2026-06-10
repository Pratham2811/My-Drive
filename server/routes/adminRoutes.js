import express from "express";
import { getAllUsersController } from "../controllers/Admin/getAllUsers.controller.js";
import {
  LogoutUserController,
  reactivateUserController,
  softDeleteUserController,
  suspendUserController,
} from "../controllers/Admin/adminAction.controller.js";
import checkAuth from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router = express.Router();

router.get("/users", checkAuth, authorize("USER_VIEW"), getAllUsersController);
router.post(
  "/logout-users",
  checkAuth,
  authorize(),
  LogoutUserController,
);
router.put(
  "/suspend-users",
  checkAuth,
  authorize(),
  suspendUserController,
);
router.put(
  "/reactivate-user",
  checkAuth,
  authorize(),
  reactivateUserController,
);
router.delete(
  "/soft-delete/:userId",
  checkAuth,
  authorize(),
  softDeleteUserController,
);
export default router;
