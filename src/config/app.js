/**
 * Configuration for the application
 */


module.exports = {
    server: {
        host: "0.0.0.0",
        port: 8000,
        routes: {
            response: { modify: true, options: { stripUnknown: true } },
        }
    },
    aws:{
        config:{
            "accessKeyId": process.env.S3_ACCESSKEY,
            "secretAccessKey": process.env.S3_SECRETKEY,
            "region": process.env.S3_REGION
        },
        bucketName:process.env.S3_BUCKETNAME
        
    }
}
