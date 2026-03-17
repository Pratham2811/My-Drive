export const googleDriveProvider = {
  async listFiles(integration, driveParentId) {
    const drivereadEndpointUrl = `https://www.googleapis.com/drive/v3/files`;
    const currentTime = Math.round(Date.now() / 1000);
    // console.log(currentTime>integration.tokenExpiry);
    const files = [];
    const directories = [];

    const expiryTime = Math.round(
      new Date(integration.tokenExpiry).getTime() / 1000,
    );
    console.log(currentTime > expiryTime);

    const response = await fetch(drivereadEndpointUrl, {
      headers: {
        Authorization: `Bearer ${integration.accessToken}`,
      },
    });
    const googleFiles = await response.json();
    googleFiles.forEach((file) => {
      if (file.mimeType === "application/vnd.google-apps.folder") {
        directories.push({
          id: file.id,
          name: file.name,
          provider: "google-drive",
          createdAt: file.createdTime,
        });
      } else {
        files.push({
          id: file.id,
          name: file.name,
          mimeType: file.mimeType,
          provider: "google-drive",
          size: file.size,
        });
      }
    });
  },
  downloadFiles() {},
};
