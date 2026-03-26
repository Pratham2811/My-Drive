import {
  getGoogleDriveFileService,
  getGoogleDriveFilesService,
} from "../../services/integration/getIntegrationFiles.service.js";

export async function getGoogleDriveFilesController(req, res, next) {
  try {
    const { folderId } = req.params;

    const userId = req.user.id;
    const googleDriveFiles = await getGoogleDriveFilesService(userId, folderId);
    res.status(200).json({
      success: true,
      message: "files fetched successfully",
      googleDriveFiles,
    });
  } catch (error) {
    next(error);
  }
}
export async function getGoogleDriveFileController(req, res, next) {
  try {
    const { fileId } = req.params;
    const userId = req.user.id;
    const range = req.headers.range;

    const { stream, headers } = await getGoogleDriveFileService(
      userId,
      fileId,
      range,
    );

    // Core headers
    res.setHeader(
      "Content-Type",
      headers["content-type"] || "application/octet-stream",
    );

    res.setHeader("Content-Disposition", "inline");
    res.setHeader("Accept-Ranges", "bytes");

    if (headers["content-length"]) {
      res.setHeader("Content-Length", headers["content-length"]);
    }

    if (headers["content-range"]) {
      res.setHeader("Content-Range", headers["content-range"]);
      res.status(206);
    } else {
      res.status(200);
    }

    // Optional performance
    res.setHeader("Cache-Control", "public, max-age=3600");

    // Stream error handling
    stream.on("error", (err) => {
      console.error("Stream error:", err);
      if (!res.headersSent) {
        res.status(500).end("Stream error");
      } else {
        res.destroy();
      }
    });

    // Pipe stream
    stream.pipe(res);
  } catch (err) {
    next(err);
  }
}
