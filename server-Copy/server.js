import { error } from "console";
import express from "express"
import { rm } from "fs/promises";
const port=80;
import {readdir}  from "fs/promises"
import  fs from "fs/promises"
import path, { dirname ,join} from "path";
import { fileURLToPath } from "url";


 const app=express();

 //enabling cors 
app.use((req,res,next)=>{
res.set("access-control-allow-origin","*");
res.set("access-control-allow-Methods","*");
next();

})

app.use("/",(error,req,res,next)=>{
  console.log("Error has:",error);
  
})

//serving file

const _filename=fileURLToPath(import.meta.url);
const _dirname=dirname(_filename);
app.get('/:filename',(req,res)=>{
  const url=decodeURIComponent(req.url);
  console.log(url);
 const filename=req.params.filename;
  const filePath=path.join(_dirname,"storage",filename);
  console.log(req.query.action);
  res.setHeader("content-Disposition","inline");
  if(req.query.action==="download"){
    res.setHeader("content-Disposition","attachment");
        console.log("sending file");
     res.sendFile(filePath);
     
  }
  
  res.sendFile(filePath);

  

  
})
//delete file
app.delete("/:filename",async (req,res)=>{
  console.log(req.params);
  console.log(req.params.filename);
  const filePath=path.join("storage",req.params.filename)
  await rm(filePath);

  
 res.send("File deleted sucessfully")
  
})
//serving directory content
app.get("/*", async (req, res) => {
  try {
    // Get subpath after "/"
    const subPath = decodeURIComponent(req.params[0] || "");
    const directoryPath = join(storageDir, subPath);

    console.log("Listing:", directoryPath);

    const fileList = await readdir(directoryPath);

    const fileListWithMetaData = await Promise.all(
      fileList.map(async (file) => {
        const filePath = join(directoryPath, file);
        const fileStat = await stat(filePath);

        return {
          name: file,
          type: fileStat.isDirectory() ? "folder" : "file",
          size: fileStat.size,
        };
      })
    );

    res.json(fileListWithMetaData);
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).send("Failed to read directory");
  }
});

 
 app.listen(port,()=>{
    console.log(`server is listening on ${port}`);
    
 })