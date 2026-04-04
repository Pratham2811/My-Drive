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
  authorize("USER_FORCE_LOGOUT"),
  LogoutUserController,
);
router.put(
  "/suspend-users",
  checkAuth,
  authorize("USER_SUSPEND"),
  suspendUserController,
);
router.put(
  "/reactivate-user",
  checkAuth,
  authorize("USER_UPDATE"),
  reactivateUserController,
);
router.delete(
  "/soft-delete/:userId",
  checkAuth,
  authorize("USER_DELETE"),
  softDeleteUserController,
);
export default router;
