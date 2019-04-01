//import external modules
const fs = require("fs")

//import internal modules
const s3Service = require("../service/s3")

//Functions
let fileOp={}

fileOp.listFiles = async (req)=>{
    let payload = req.payload;
    let resObj ={}
    try{
        let listRes = await s3Service.listObjects(payload)
        resObj ={
            statusCode :200,
            message:"success",
            list:listRes
        }
        return resObj
    }catch(e){
        console.log(e)
        return e
    }

}
//get file
fileOp.getFile = async (req)=>{
    let params = req.params;
    try{
        let getObjRes = await s3Service.getObject(params)
        return getObjRes;
    }catch(e){
        console.log(e)
        return e
    }

}

//delete file
fileOp.deleteFile = async (req)=>{
    let params = req.params;
    try{
        await s3Service.deleteObject(params)
        return {statusCode:200,message:"Success"};
    }catch(e){
        console.log(e)
        return e
    }

}

//create a file
fileOp.createFile = async (req)=>{
    let payload = req.payload;
    let file = payload.file;
    try{
        let readData = await fs.readFileSync(file.path)
        payload["data"] = readData;
        await s3Service.putObject(payload)
        fs.unlinkSync(file.path);
        return {statusCode:200,message:"Success"};
    }catch(e){
        console.log(e)
        return e
    }

}
module.exports = fileOp