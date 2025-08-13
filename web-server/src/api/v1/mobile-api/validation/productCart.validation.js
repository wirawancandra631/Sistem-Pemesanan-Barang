const { body } = require("express-validator");
const { ProductModel } = require("../../../../database/loader");

const StoreProductCartValidation = [
    body("product_id").notEmpty().custom(async value => {
        const hasProduct = await ProductModel.findOne({
            where: {
                id_product: value
            }
        })
        if (!hasProduct) {
            throw Error(`Product with id ${value} not found`)
        }
    }),
    body("qty").notEmpty()
]
const IncrementProductCartValidation = [
    body("id_cart").notEmpty(),
    body("qty").notEmpty()
]
const DecrementProductCartValidation = [
    body("id_cart").notEmpty(),
    body("qty").notEmpty()
]
const DestroyProductCartValidation = [
    body("id_cart").notEmpty(),
]


module.exports = {
    StoreProductCartValidation,
    IncrementProductCartValidation,
    DecrementProductCartValidation,
    DestroyProductCartValidation
}