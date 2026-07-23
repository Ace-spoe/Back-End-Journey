const path = require('path')
const multer = require('multer')
 
const storage = multer.diskStorage({
    destination : function (req , file , cb){
        cb(null , './uploads')
    },
    filename :  function (req , file , cb) {
        cb(null , 
           file.fieldname + "-" + Date.now() + path.extname(file.originalname) 
        )}
})

const checkFileType = (req , file , cb) => {
    if(file.mimetype.startsWith('image')){
        cb(null , true)
    }else{
        cb(new Error('Only image allowed') ,false)
    }
}

module.exports = multer({
    storage : storage,
    fileFilter : checkFileType,
    limits : {
        fileSize : 5 * 1024 * 1024 // 5MB
    }
})
    



