const { body } = require("express-validator");
const { BrandProductModel, CategoryProductModel, ProductModel } = require("../../../../database/loader")

const StoreProductValidation = [
    body("sku_product").notEmpty().custom(async value => {
        const hasData = await ProductModel.findOne({
            where: {
                sku_product: value
            }
        })
        if (hasData) {
            throw Error(`Product dengan sku ${value} sudah ada`)
        }
    }),
    body("name_product").notEmpty(),
    body("category_id").notEmpty().custom(async value => {
        const hasData = await CategoryProductModel.findOne({
            where: {
                id_category: value
            }
        })
        if (!hasData) {
            throw Error(`Kategori dengan id ${value} tidak ada`)
        }
    }),
    body("brand_id").notEmpty().custom(async value => {
        const hasData = await BrandProductModel.findOne({
            where: {
                id_brand: value
            }
        })
        if (!hasData) {
            throw Error(`Brand dengan id ${value} tidak ada`)
        }
    }),
    body("price_sell").notEmpty(),
    body("stock_product").notEmpty(),
    body("description_product").notEmpty()
];
const UpdateProductValidation = [
    body("sku_product").notEmpty(),
    body("name_product").notEmpty(),
    body("category_id").notEmpty().custom(async value => {
        const hasData = await CategoryProductModel.findOne({
            where: {
                id_category: value
            }
        })
        if (!hasData) {
            throw Error(`Category dengan id ${value} tidak ada`)
        }
    }),
    body("brand_id").notEmpty().custom(async value => {
        const hasData = await BrandProductModel.findOne({
            where: {
                id_brand: value
            }
        })
        if (!hasData) {
            throw Error(`Brand dengan id ${value} tidak ada`)
        }
    }),
    body("price_sell").notEmpty(),
    body("stock_product").notEmpty(),
    body("description_product").notEmpty()
];

module.exports = {
    StoreProductValidation,
    UpdateProductValidation
};