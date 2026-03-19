import IntegratedAppsModel from "../../models/IntegratedAppsModel.js";
import { providerRegistery } from "../../providers/providerRegister.js";
import { AppError } from "../../utils/AppError.js";

export async function getGoogleDriveFilesService(userId,folderId) {
  const googleDriveIntegration = await IntegratedAppsModel.findOne({
    userId,
    provider: "google-drive",
    status:"connected"
  });

  const provider = providerRegistery["google-drive"];
  const files = await provider.listFiles(googleDriveIntegration,folderId);
  if(!files){
    throw new AppError(500,"Internal Server Error")
  }
 return files;
}
