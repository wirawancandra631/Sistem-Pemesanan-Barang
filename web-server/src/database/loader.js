//file untuk menginisialisasi query dan relasi database
const sequelize = require("./sequelize")
const BrandProductModel = require("./models/brand-product.models")
const CategoryProductModel = require("./models/category-product.models")
const ProductModel = require("./models/product.models")
const ProductPriceGrosirModel = require("./models/product-price-grosir.models")
const CustomerModel = require("./models/customer.models")
const UserModel = require("./models/user.models")
const ProductReviewModel = require("./models/productReview.models")
const ProductCartModel = require("./models/productCart.models")
ProductModel.belongsTo(CategoryProductModel, {
    foreignKey: "category_id",
    as: "category"
})
ProductModel.belongsTo(BrandProductModel, {
    foreignKey: "brand_id",
    as: "brand"
})

ProductPriceGrosirModel.belongsTo(ProductModel, {
    foreignKey: "product_id",
    as: "grosir"
})
ProductModel.hasMany(ProductPriceGrosirModel, {
    foreignKey: "product_id",
    as: "grosir"
})

CustomerModel.hasMany(ProductCartModel, {
    foreignKey: "customer_id",
    as: "product_cart"
})
ProductReviewModel.belongsTo(ProductModel, {
    foreignKey: "product_id",
    as: "reviews"
})
ProductReviewModel.belongsTo(CustomerModel, {
    foreignKey: "customer_id",
    as: "customer"
})
ProductModel.hasMany(ProductReviewModel, {
    foreignKey: "product_id",
    as: "reviews"
})
ProductCartModel.belongsTo(ProductModel, {
    foreignKey: "product_id",
    as: "products"
})
module.exports = {
    sequelize,
    CategoryProductModel,
    BrandProductModel,
    ProductModel,
    ProductPriceGrosirModel,
    CustomerModel,
    UserModel,
    ProductCartModel,
    ProductReviewModel
}