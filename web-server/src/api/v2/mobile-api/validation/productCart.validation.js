const { body } = require("express-validator");
const validationMiddleware = require("../../../../middleware/validation.middleware");
const { ProductModels } = require(".././../../../sequelize/db/models/index")
const StoreProductCartValidation = [
    body("product_id").notEmpty().custom(async value => {
        const hasProduct = await ProductModels.findOne({
            where: {
                id_product: value
            }
        })
        if (!hasProduct) {
            throw Error(`Product with id ${value} not found`)
        }
    }),
    body("qty").notEmpty(),
    validationMiddleware
]
const IncrementProductCartValidation = [
    body("id_cart").notEmpty(),
    body("qty").notEmpty(),
    validationMiddleware
]
const DecrementProductCartValidation = [
    body("id_cart").notEmpty(),
    body("qty").notEmpty(),
    validationMiddleware
]
const DestroyProductCartValidation = [
    body("id_cart").notEmpty(),
    validationMiddleware
]


module.exports = {
    StoreProductCartValidation,
    IncrementProductCartValidation,
    DecrementProductCartValidation,
    DestroyProductCartValidation
}