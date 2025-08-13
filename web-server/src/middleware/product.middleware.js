const { StoreProductValidation, UpdateProductValidation } = require("../api/v1/dashboard-api/validation/product.validation");
const handleFileUploadMiddleware = require("./multer.middleware");
const validationMiddleware = require("./validation.middleware");

const ProductMiddleware = {
    Store: [
        handleFileUploadMiddleware("image_product"),
        StoreProductValidation,
        validationMiddleware
    ],
    Update: [
        handleFileUploadMiddleware("image_product"),
        UpdateProductValidation,
        validationMiddleware
    ]
}
module.exports = ProductMiddleware