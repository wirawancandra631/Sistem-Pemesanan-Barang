const multer = require("multer");
const path = require("node:path")
const App = require("./app")
const MulterDiskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(App.MULTERDESTINATION))
    },
    filename: function (req, file, cb) {
        const filename = file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        req.body[file.fieldname] = filename
        cb(null, filename)
    }

})
module.exports = MulterDiskStorage