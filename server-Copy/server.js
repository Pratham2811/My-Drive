import { error, log } from "console";
import express from "express";
import { createWriteStream } from "fs";
import { rename, rm } from "fs/promises";
const port = 80;
import { readdir } from "fs/promises";
import fs from "fs/promises";
import path, { dirname, join } from "path";
import { fileURLToPath } from "url";

const app = express();

//parsing request
app.use(express.json());
const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);
//enabling cors
app.use((req, res, next) => {
  res.set({
    "access-control-allow-origin": "*",
    "access-control-allow-Methods": "*",
    "access-control-allow-Headers": "*",
  });
  next();
});

app.use("/", (error, req, res, next) => {
  console.log("Error has:", error);
});

//serviing trash folder
app.get("/trash", async (req, res, next) => {
  try {
    const directoryPath = "trash";
    const fileList = await readdir("trash");
    console.log(fileList);
    const fileListWithMetaData = await Promise.all(
      fileList.map(async (file) => {
        const filePpath = path.join(directoryPath, file);
        const fileStat = await fs.stat(filePpath);
        return {
          name: file,
          type: fileStat.isDirectory() ? "folder" : "file",
          size: fileStat.size,
        };
      })
    );

    res.json(fileListWithMetaData);
  } catch (err) {
    console.log("Server error:", err);
    res.status(500).send("error from server");
  }
});

//serving file

app.get("/:filename", (req, res) => {
  const url = decodeURIComponent(req.url);
  console.log(url);
  const filename = req.params.filename;

  const filePath = path.join(_dirname, "storage", filename);
  console.log(filePath);
  console.log(req.query.action);
  res.setHeader("content-Disposition", "inline");
  if (req.query.action === "download") {
    res.setHeader("content-Disposition", "attachment");
    console.log("sending file");
    res.sendFile(filePath);
  }

  res.sendFile(filePath);
});
//move file to trash
app.delete("/:filename", async (req, res) => {
  const { filename } = req.params;
  const sourcePath = path.join(_dirname, "storage", filename); // old folder
  const destPath = path.join(_dirname, "trash", filename);

  const filePath = path.join(_dirname, "storage", filename);

  try {
    await fs.rename(sourcePath, destPath);

    console.log("file moved to trash sucessfully");

    res.json({
      message: "File deleted sucessfully",
    });
  } catch (err) {
    res.status(400).json({ message: "File Not Found" });
    console.log("Not file found to delete");
  }
});

app.post("/upload", (req, res, next) => {
  const filename = req?.headers?.filename;
  console.log(`./storage/${filename}`);

  const writeStream = createWriteStream(`./storage/${filename}`);
  req.on("data", (chunk) => {
    writeStream.write(chunk);
  });
  console.log("post request");
  req.on("end", () => {
    console.log("Ended writing file ");
    res.end("File uplaoded sucessfully");
  });

});
app.patch("/:filename", async (req, res) => {
  try {
    const oldName = path.join(_dirname, "storage", req.params.filename); // use params
    const newFileName = path.join(_dirname, "storage", req.body.fileName); // use body

    await fs.rename(oldName, newFileName);

    console.log(`Renamed ${req.params.filename} -> ${req.body.fileName}`);
    res.status(200).json({ message: "File renamed successfully" });
  } catch (err) {
    console.error("Rename error:", err);
    res.status(400).json({ message: "File not found or rename failed" });
  }
});

//restoring
app.patch("/restore-file/:filename", async (req, res, next) => {
  console.log("request came");
  const { filename } = req.params;

  const sourcePath = `./trash/${filename}`;
  const destPath = `./storage/${filename}`;
  console.log(sourcePath);
  try {
    await rename(sourcePath, destPath);
    res.send("file restored sucessfully");
  } catch (err) {
    res.status(500).send("Error Restoring file due to wrong path");
  }
});

//serving directory content
app.get("/", async (req, res, next) => {
  try {
    const directoryPath = `./storage/${req.url || ""}`;
    const fileList = await readdir(directoryPath);
    // console.log(fileList);
    const fileListWithMetaData = await Promise.all(
      fileList.map(async (file) => {
        const filePpath = path.join(directoryPath, file);
        const fileStat = await fs.stat(filePpath);
        return {
          name: file,
          type: fileStat.isDirectory() ? "folder" : "file",
          size: fileStat.size,
        };
      })
    );
    // console.log(fileListWithMetaData);
    res.json(fileListWithMetaData);
  } catch (error) {
    console.log("server Error", error);
  }
});

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
