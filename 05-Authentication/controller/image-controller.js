const fs = require('fs')
const Image = require('../models/Image')
const {uploadToCloudinary} = require('../helper/cloudinaryHelper')
const uploadImageController = async (req , res) => {

    try {
        if(!req.file){
            return res.json({
                success : false,
                message : 'Upload an Image!'
            })
        }

        const {url , publicId} = uploadToCloudinary(req.file.path)
        const uploadedBy = req.userInfo.userId

        const newImage = await Image.create({
            url,
            publicId,
            uploadedBy
        })
        fs.unlinkSync(req.file.path)//to remove from our disk
        res.status(201).json({
            success : true,
            message : 'Image uploaded sucessfully to DB',
            image : newImage
        })

    }catch(err){
        console.log('error')
        res.status(500).json({
            success : false,
            message : 'Internal server error'
        })
    }
}

const fetchImageController = async (req ,res) => {
    try{
        const images = await Image.find({})
        if(images){
             res.status(200).json({
            success : true ,
            data : images
        })
        }
    }catch(err){
        console.log(err)
        res.status(500).json({
            success : false ,
            message : "Internal server error"
        })
    }
}

module.exports = {uploadImageController, fetchImageController}