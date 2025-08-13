const handleFileUploadMiddleware = require("./multer.middleware")
const { StoreCategoryProductValidation, UpdateCategoryProductValidation } = require("../api/v1/dashboard-api/validation/categoryProduct.validation")
const validationMiddleware = require("./validation.middleware")
const CategoryProductMiddleware = {
    Store: [
        handleFileUploadMiddleware("icon_category"),
        StoreCategoryProductValidation,
        validationMiddleware

    ],
    Update: [
        handleFileUploadMiddleware("icon_category"),
        UpdateCategoryProductValidation,
        validationMiddleware
    ]
}
module.exports = CategoryProductMiddleware