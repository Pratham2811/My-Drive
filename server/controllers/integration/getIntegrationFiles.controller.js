import { getGoogleDriveFilesService } from "../../services/integration/getIntegrationFiles.service.js";

export async function getGoogleDriveFilesController(req, res, next) {
  try {
    const { folderId } = req.params;
   

    const userId = req.user.id;
    const googleDriveFiles = await getGoogleDriveFilesService(userId,folderId);
    res.status(200).json({
      success: true,
      message: "files fetched successfully",
      googleDriveFiles,
    });
  } catch (error) {
    next(error);
  }
}
