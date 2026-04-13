import axios from "axios";
import IntegratedAppsModel from "../models/IntegratedAppsModel.js";
import { AppError } from "../utils/AppError.js";
import { refreshAccessToken } from "../utils/refreshAccessToken.js";

export const googleDriveProvider = {
  async listFiles(integration, folderId) {
    try {
      const parentId = folderId || "root";

      let accessToken = integration.accessToken;

      const url = `https://www.googleapis.com/drive/v3/files?q='${parentId}' in parents and trashed=false&fields=files(id,name,mimeType,size,createdTime,webViewLink)`;

      let response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

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
        console.log(err);

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
    } catch (error) {
      console.log("this is the error coming the files", error);

      next(error);
    }
  },
  async getFile(integration, fileId, range) {
    let accessToken = integration.accessToken;

    // 🔥 Step 1: get metadata
    const meta = await axios.get(
      `https://www.googleapis.com/drive/v3/files/${fileId}?fields=mimeType`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    const mimeType = meta.data.mimeType;

    // 🔥 Step 2: choose endpoint
    let url;

    if (mimeType.includes("google-apps")) {
      url = `https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=application/pdf`;
    } else {
      url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
    }

    // 🔥 Step 3: forward range
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    if (range) {
      headers.Range = range;
    }

    // 🔥 Step 4: stream request
    const response = await axios.get(url, {
      responseType: "stream",
      headers,
    });

    return {
      stream: response.data,
      headers: response.headers,
    };
  },
};
