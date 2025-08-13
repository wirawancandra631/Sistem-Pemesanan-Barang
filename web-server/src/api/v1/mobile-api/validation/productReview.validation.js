const { body } = require("express-validator");
const { ProductModel } = require("../../../../database/loader");

const StoreProductReviewValidation = [
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
    body("review").notEmpty()
]
module.exports = {
    StoreProductReviewValidation
}