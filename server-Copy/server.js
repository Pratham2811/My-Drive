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
res.set({
"access-control-allow-origin":"*",
"access-control-allow-Methods":"*",

})
next();

})

app.use("/",(error,req,res,next)=>{
  console.log("Error has:",error);
  
})

//serviing trash folder 
app.get("/trash", async (req,res,next)=>{
  try{
   const directoryPath="trash"
    const fileList= await  readdir("trash");
   console.log(fileList);
    const fileListWithMetaData=await Promise.all(
      fileList.map(async (file)=>{
          const filePpath=path.join(directoryPath,file)
              const fileStat= await fs.stat(filePpath);
                 return {
                name: file,
                type: fileStat.isDirectory() ? "folder" : "file",
                size: fileStat.size
            };
      })
    )
    
    res.json(fileListWithMetaData)
 
   
  }catch(err){
   console.log("Server error:",err);
   res.status(500).send("error from server")
   
  }
 })

//serving file

const _filename=fileURLToPath(import.meta.url);
const _dirname=dirname(_filename);
app.get('/:filename',(req,res)=>{
  const url=decodeURIComponent(req.url);
  console.log(url);
 const filename=req.params.filename;

 
  const filePath=path.join(_dirname,"storage",filename);
   console.log(filePath);
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
app.delete("/:filename",(req,res)=>{
  console.log("FIle delete request has come");
  
  const {filename}=req.params;
  
  
 const filePath=path.join(_dirname,'storage',filename);
 console.log(filePath);
 
 try{
   
  rm(filePath);
  console.log("file deleted sucessfully");

  res.json({
    message:"File deleted sucessfully",
  })
 }catch(err){
  res.status(400).json({message:"File Not Found"})
  console.log("Not file found to delete");
  
 }
})
//serving directory content
 app.get("/",async (req,res,next)=>{
   try{
    const directoryPath=`./storage/${req.url||""}`
    const fileList= await  readdir(directoryPath);
    // console.log(fileList);
    const fileListWithMetaData=await Promise.all(
      fileList.map(async (file)=>{
          const filePpath=path.join(directoryPath,file)
              const fileStat= await fs.stat(filePpath);
                 return {
                name: file,
                type: fileStat.isDirectory() ? "folder" : "file",
                size: fileStat.size
            };
      })
    )
    // console.log(fileListWithMetaData);
    res.json(fileListWithMetaData)
   }catch(error){
      console.log("server Error",error);  
   }
   
 })

 
 app.listen(port,()=>{
    console.log(`server is listening on ${port}`);
    
 })

