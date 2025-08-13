const { StoreBrandProductValidation, UpdateBrandProductValidation } = require("../api/v1/dashboard-api/validation/brandProduct.validation")
const validationMiddleware = require("./validation.middleware")
const BrandProductMiddleware = {
    Store: [
        StoreBrandProductValidation,
        validationMiddleware
    ],
    Update: [
        UpdateBrandProductValidation,
        validationMiddleware
    ]
}

module.exports = BrandProductMiddleware