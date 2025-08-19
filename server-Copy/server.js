import express from "express"
const port=80;
import {readdir}  from "fs/promises"
import  fs from "fs/promises"
import path from "path";
 const app=express();

 //enabling cors 
app.use((req,res,next)=>{
res.set("access-control-allow-origin","*");
res.set("access-control-allow-Methods","*");
next();

})

//serving file


app.get('/:filename',(req,res)=>{
  const url=decodeURIComponent(req.url)
  console.log(url);
  console.log(req.params);
  
  res.end("Hello")
  
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