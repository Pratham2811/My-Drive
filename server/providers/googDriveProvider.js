import IntegratedAppsModel from "../models/IntegratedAppsModel.js";
import { refreshAccessToken } from "../utils/refreshAccessToken.js";

export const googleDriveProvider = {
  async listFiles(integration, folderId) {
    console.log("folderID it is", folderId);

    const parentId = folderId || "root";

    let accessToken = integration.accessToken;

    const url = `https://www.googleapis.com/drive/v3/files?q='${parentId}' in parents and trashed=false&fields=files(id,name,mimeType,size,createdTime,webViewLink)`;

    let response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // 🔥 Retry on 401
    if (response.status === 401) {
      const refreshed = await refreshAccessToken(integration);

      accessToken = refreshed.accessToken;

      await IntegratedAppsModel.findByIdAndUpdate(integration.id, {
        accessToken,
        tokenExpiry: new Date(Date.now() + refreshed.expiresIn * 1000),
      });

      response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Google API Error: ${err}`);
    }

    const data = await response.json();

    const items = data.files || [];
    

    const files = [];
    const directories = [];

    items.forEach((file) => {
      if (file.mimeType === "application/vnd.google-apps.folder") {
        directories.push({
          id: file.id,
          name: file.name,
          provider: "google-drive",
        });
      } else {
        files.push({
          id: file.id,
          name: file.name,
          mimeType: file.mimeType,
          provider: "google-drive",
          size: file.size,
          createdAt: file.createdAt,
          viewLink: file.webViewLink,
        });
      }
    });

    return { files, directories };
  },
  async getFile(fileId){
       
  }
};
