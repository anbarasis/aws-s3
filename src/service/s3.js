
//import external modules
const AWS = require('aws-sdk');

//import external modules
const appConfig = require('../config/app')

//assign aws configuration 
AWS.config = appConfig.aws.config

//create instance for AWS s3 to access the functions
const s3 = new AWS.S3();

//create object to assign the functions
let s3Svc ={}

/**
 * list Object from S3
 */
s3Svc.listObjects = (input)=> {
    return new Promise((resolve,reject)=>{
        try {
            const params = { 
                Bucket: appConfig.aws.bucketName,
                // Prefix :"CHART/image/", //list object from the particular folder path
                MaxKeys:input.limit
            }
            
            //get all the objects from s3  
            s3.listObjects(params, function(err, data) {
                data ={
                    Contents :[{Key :"ssssssssssss"}]
                }
                err = null
                if (!err) {
                    resolve(data.Contents)
                }else if(data && data.Contents && data.Contents){
                    reject({statusCode:"404",message:"No Data Found"})
                }else {
                    reject(err)
                }
            });
        } catch (ex) {
            reject(ex)
        }
    })
    
};

/**
 * Get Object from S3
 */
s3Svc.getObject = (input)=> {
    return new Promise((resolve,reject)=>{
        try {
            const params = { 
                Bucket: appConfig.aws.bucketName, 
                Key: input.key
            }
            //get particular from s3  
            s3.getObject(params, function(err, data) {
                if (!err) {
                    resolve(data)
                }else {
                    reject(err)
                }
            });
        } catch (ex) {
            reject(ex)
        }
    })
    
};

/**
 * Get Object from S3
 */
s3Svc.getObject = (input)=> {
    return new Promise((resolve,reject)=>{
        try {
            const params = { 
                Bucket: appConfig.aws.bucketName, 
                Key: input.key
            }
            //get particular from s3  
            s3.getObject(params, function(err, data) {
                if (!err) {
                    resolve(data)
                }else {
                    reject(err)
                }
            });
        } catch (ex) {
            reject(ex)
        }
    })
};

/**
 * Delete Object from S3
 */
s3Svc.deleteObject = (input)=> {
    return new Promise((resolve,reject)=>{
        try {
            const params = { 
                Bucket: appConfig.aws.bucketName, 
                Key: input.key
            }
            s3.deleteObject(params, function(err, data) {
                if (!err) {
                    resolve(data)
                }else {
                    reject(err)
                }
            });
        } catch (ex) {
            reject(ex)
        }
    })
};

/*******put object******* */
s3Svc.putObject =(input)=>{
    return new Promise((resolve,reject)=>{
        try {
            s3.putObject({
                Bucket: appConfig.aws.bucketName, 
                Key: input.key,
                ContentType: 'binary',
                ACL: "public-read",
                ContentEncoding: 'utf8',
                Body: input.data
            }, function(err, data) {
                if (!err) {
                    resolve(data)
                }else {
                    reject(err)
                }
            });
        } catch (ex) {
            reject(ex)
        }
    })

}
module.exports = s3Svc