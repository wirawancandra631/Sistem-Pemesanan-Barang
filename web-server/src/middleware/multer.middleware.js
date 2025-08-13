const multer = require("multer")
const MulterDiskStorage = require("../config/multer")
const path = require("node:path")
const handleFileUploadMiddleware = (fieldname) => {
    return (req, res, next) => {
        const upload = multer({
            storage: MulterDiskStorage,
            fileFilter: (req, file, cb) => {
                const allowedType = /jpeg|jpg|png/;
                const extName = allowedType.test(path.extname(file.originalname).toLowerCase())
                if (extName) {
                    cb(null, true)
                }
                else {
                    // cb(null, false)
                    return cb(new multer.MulterError("Image wajib bertipe jpeg , jpg , atau png"), false)
                }
            }
        }).single(fieldname)
        upload(req, res, (error) => {
            if (error) {
                res.status(422).json({
                    status: 422,
                    message: "Upload file gagal",
                    error: error.code
                })
            }
            else {
                next()
            }
        })

    }
}

module.exports = handleFileUploadMiddleware