const { body } = require("express-validator");
const validationMiddleware = require("../../../../middleware/validation.middleware");
const { ProductModels } = require("../../../../sequelize/db/models/index")
const Store = [
    body("product_id").notEmpty().custom(async value => {
        const hasProduct = await ProductModels.findOne({ where: { id_product: value } });
        if (!hasProduct) {
            throw Error(`Produk dengan id ${value} tidak ditemukan`)
        }
    }),
    body("review").notEmpty(),
    validationMiddleware
]
module.exports = {
    StoreProductReviewValidation: Store
}