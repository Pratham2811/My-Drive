import express from "express"
import { readFile } from "fs/promises";
const port=80;
import {readdir}  from "fs/promises"
import  fs from "fs/promises"
import path from "path";
 const app=express();
app.use((req,res,next)=>{
res.set("access-control-allow-origin","*");
res.set("access-control-allow-Methods","*");
next();

})


app.use((req,res,next)=>{
   
  if(req.query.action==="download"){
    res.set("Content-Disposition","attachment")
    console.log("Reuest ");
    
  }
 
    const serveStatic=express.static("storage");
  serveStatic(req,res,next);
})



 app.get("/",async (req,res,next)=>{
   try{
    const directoryPath=`./storage/${req.url||""}`
    const fileList= await  readdir(directoryPath);
    // console.log(fileList);
    const fileListWithMetaData=await Promise.all(
      fileList.map(async (file)=>{
          const filePpath=path.join(directoryPath,file)
              const fileStat= await fs.stat(filePpath)
                 return {
                name: file,
                type: fileStat.isDirectory() ? "folder" : "file",
                size: fileStat.size
            };
      })
    )

    console.log(fileListWithMetaData);
    
    res.json(fileListWithMetaData)
   }catch(error){
  
      console.log("server Error",error);

      
   }
   
 })
 app.delete("",(req,res,next)=>{
  console.log("request has came");
  
         
 })
 
 app.listen(port,()=>{
    console.log(`server is listening on ${port}`);
    
 })