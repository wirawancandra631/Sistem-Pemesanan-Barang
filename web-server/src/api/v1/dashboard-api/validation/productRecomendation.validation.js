const { body } = require("express-validator");

const StoreProductRecomendationValidation = [
    body("id_product").notEmpty()
]

module.exports = {
    StoreProductRecomendationValidation,
}