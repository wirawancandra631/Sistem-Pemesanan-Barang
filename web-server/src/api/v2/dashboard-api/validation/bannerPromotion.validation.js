const { body } = require("express-validator");
const handleFileUploadMiddleware = require("../../../../middleware/multer.middleware");
const validationMiddleware = require("../../../../middleware/validation.middleware");

const Store = [
    handleFileUploadMiddleware("image_banner"),
    body("image_banner").notEmpty(),
    validationMiddleware
]
module.exports = {
    StoreBannerPromotionValidation: Store
}