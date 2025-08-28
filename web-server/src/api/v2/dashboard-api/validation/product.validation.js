const { body } = require("express-validator");
const handleFileUploadMiddleware = require("../../../../middleware/multer.middleware");
const validationMiddleware = require("../../../../middleware/validation.middleware");
const {
    ProductModels,
    CategoryProductModels,
    BrandProductModels,
} = require("../../../../sequelize/db/models/index");
const Store = [
    handleFileUploadMiddleware("image_product"),
    body("sku_product")
        .notEmpty()
        .custom(async (value) => {
            const hasData = await ProductModels.findOne({
                where: {
                    sku_product: value,
                },
            });
            if (hasData) {
                throw Error(`Product dengan sku ${value} sudah ada`);
            }
        }),
    body("name_product").notEmpty(),
    body("category_id")
        .notEmpty()
        .custom(async (value) => {
            const hasData = await CategoryProductModels.findOne({
                where: {
                    id_category: value,
                },
            });
            if (!hasData) {
                throw Error(`Kategori dengan id ${value} tidak ada`);
            }
        }),
    body("brand_id")
        .notEmpty()
        .custom(async (value) => {
            const hasData = await BrandProductModels.findOne({
                where: {
                    id_brand: value,
                },
            });
            if (!hasData) {
                throw Error(`Brand dengan id ${value} tidak ada`);
            }
        }),
    body("price_sell").notEmpty(),
    body("stock_product").notEmpty(),
    body("description_product").notEmpty(),
    validationMiddleware,
];
const Update = [
    handleFileUploadMiddleware("image_product"),

    body("sku_product").notEmpty(),
    body("name_product").notEmpty(),
    body("category_id")
        .notEmpty()
        .custom(async (value) => {
            const hasData = await CategoryProductModels.findOne({
                where: {
                    id_category: value,
                },
            });
            if (!hasData) {
                throw Error(`Category dengan id ${value} tidak ada`);
            }
        }),
    body("brand_id")
        .notEmpty()
        .custom(async (value) => {
            const hasData = await BrandProductModels.findOne({
                where: {
                    id_brand: value,
                },
            });
            if (!hasData) {
                throw Error(`Brand dengan id ${value} tidak ada`);
            }
        }),
    body("price_sell").notEmpty(),
    body("stock_product").notEmpty(),
    body("description_product").notEmpty(),
    validationMiddleware,
];
module.exports = {
    StoreProductValidation: Store,
    UpdateProductValidation: Update,
};
