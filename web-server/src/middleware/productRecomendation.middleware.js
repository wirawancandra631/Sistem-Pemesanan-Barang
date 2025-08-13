const { StoreProductRecomendationValidation } = require("../api/v1/dashboard-api/validation/productRecomendation.validation");
const ValidationMiddleware = require("./validation.middleware");

const ProductRecomendationMiddleware = {
    Store: [
        StoreProductRecomendationValidation,
        ValidationMiddleware
    ],

}
module.exports = ProductRecomendationMiddleware