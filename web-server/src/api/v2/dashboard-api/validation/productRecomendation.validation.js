const { body } = require("express-validator");
const validationMiddleware = require("../../../../middleware/validation.middleware");

const Store = [
    body("id_product").notEmpty(),
    validationMiddleware
]
module.exports = {
    StoreProductRecomendationValidation: Store
}