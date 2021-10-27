const multer = require('multer')
const path = require('path')
// setup multer
let upload = multer({
    storage: multer.diskStorage({
        destination: './public/uploads',
        filename: function(req, file, cb){
            cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        }
        
    }),
    // limit:{},
    // fileFilter: function(req,file,cb){
    //     const reFileType = /jpeg|jpg|png/
    //     const extentionName = reFileType.test(path.extname(file.originalname))
    //     if( extentionName ){
    //         return cb(null,true)
    //     } else {
    //         cb('Error in image')
    //     }
    // }
}).single('image')
module.exports = upload
