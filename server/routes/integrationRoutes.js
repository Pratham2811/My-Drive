import express from "express";
import { googleAuthCallbackController } from "../controllers/auth/googleAuth.controller.js";
import {
  googleDriveIntegrationCallbackController,
  googleDriveIntegrationController,
} from "../controllers/integration/googleDriveIntegration.controller.js";
import checkAuth from "../middlewares/authMiddleware.js";
import { getIntegrations } from "../controllers/integration/getIntegrationsInfo.controller.js";
import {
  getGoogleDriveFileController,
  getGoogleDriveFilesController,
} from "../controllers/integration/getIntegrationFiles.controller.js";

const router = express.Router();

router.post(
  "/google-drive/connect",
  checkAuth,
  googleDriveIntegrationController,
);
router.get(
  "/google-drive/callback",
  checkAuth,
  googleDriveIntegrationCallbackController,
);
router.get("/all", checkAuth, getIntegrations);
router.get(
  "/google-drive/files{/:folderId}",
  checkAuth,
  getGoogleDriveFilesController,
);
router.get(
  "/google-drive/file{/:fileId}",
  checkAuth,
  getGoogleDriveFileController,
);
export default router;
