//external modules
const joi = require("joi")

//internal modules
const handler = require('../handlers/file')

let routes =[
    {        
        method:'GET',
        path:'/ping',
        handler:function(request,h) {
            return'pong';
        }
    },
    {
        method: 'POST',
        path: '/file/list',
        config: {
            handler: handler.listFiles,
            description: 'List files in s3 bucket',
            validate : {
                payload:joi.object({
                    limit : joi.number().default(20)
                })
            },
            response: {
                schema:  joi.object({
                    statusCode : joi.number().required(),
                    message:joi.string().required(),
                    list :joi.array().items(joi.object({
                        Key : joi.string().required()
                    }))
                })
            }
        }
    },
    {
        method: 'GET',
        path: '/file/{key}/{type}',
        config: {
            handler: async (req,reply)=>{
                let params = req.params;
                let data = handler.getFile(fileKey);
                return reply(data.Body).header("Content-Disposition", "attachment; filename="+`${params.key}.${params.type}`).header('Content-Type', 'image/jpeg' );
            },
            description: 'Download file from s3 bucket',
            validate : {
                params: joi.object({
                    key : joi.string().description("key name which stored in s3"),
                    type : joi.string().description("jpeg")
                })
            },
        }
    },
    {
        method: 'DELETE',
        path: '/file/delete/{key}',
        config: {
            handler: handler.deleteFile,
            description: 'Delete file from s3 bucket',
            validate : {
                params: joi.object({
                    key : joi.string().description("key name which stored in s3"),
                })
            },
            response: {
                schema:  joi.object({
                    statusCode : joi.number().required(),
                    message:joi.string().required()
                })
            }
        }
    },
    {
        method: 'POST',
        path: '/file/add',
        config: {
            handler: handler.createFile(request, h),
            payload: {
                output: 'file',
                maxBytes: 209715200,
                parse: true,
                allow: 'multipart/form-data'
            },
            validate: {
                payload: joi.object({
                    file : joi.any()
                }) 
            },
            response: {
                schema:  joi.object({
                    statusCode : joi.number().required(),
                    message:joi.string().required()
                })
            }
        }
    }
]

module.exports = routes;
