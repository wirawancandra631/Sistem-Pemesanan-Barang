const { body } = require("express-validator")
const validationMiddleware = require("../../../../middleware/validation.middleware");
const Store = [
    body("product_id").notEmpty(),
    body("amount_discount").notEmpty().isNumeric(),
    body("end_time").notEmpty(),
    validationMiddleware

]
module.exports = {
    StoreProductDiscountValidation: Store
}