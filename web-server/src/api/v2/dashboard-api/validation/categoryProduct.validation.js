const { body } = require("express-validator")
const handleFileUploadMiddleware = require("../../../../middleware/multer.middleware")
const ValidationMiddleware = require("../../../../middleware/validation.middleware")
const Store = [
    handleFileUploadMiddleware("icon_category"),
    body("name_category").notEmpty(),
    ValidationMiddleware,
]
const Update = [
    handleFileUploadMiddleware("icon_category"),
    body("name_category").notEmpty(),
    ValidationMiddleware,
]

module.exports = {
    StoreCategoryProductValidation: Store,
    UpdateCategoryProductValidation: Update
}