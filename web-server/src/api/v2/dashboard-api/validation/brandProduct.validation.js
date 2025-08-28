const { body } = require("express-validator");
const validationMiddleware = require("../../../../middleware/validation.middleware");

const Store = [
    body("name_brand").notEmpty(),
    validationMiddleware
]
const Update = [
    body("name_brand").notEmpty(),
    validationMiddleware
]


module.exports = {
    StoreBrandProductValidation: Store,
    UpdateBrandProductValidation: Update
}