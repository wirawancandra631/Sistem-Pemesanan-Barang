const App = require("../../../../config/app");
const { ProductModel, CategoryProductModel, BrandProductModel, ProductPriceGrosirModel } = require("../../../../database/loader");
const { Op } = require("sequelize")
async function getProductRecomendation() {
    const products = await ProductModel.findAll({
        where: {
            recomendation_product: true
        },
        order: [["id_product", "DESC"]],
        include: [
            {
                model: CategoryProductModel,
                as: "category"
            },
            {
                model: BrandProductModel,
                as: "brand"
            },
            {
                model: ProductPriceGrosirModel,
                as: "grosir"
            }
        ]
    })
    return products.map(product => {
        const plainData = product.get({ plain: true });
        return { ...plainData, image_product: (plainData.image_product) ? `${App.BaseUrl}/image/${plainData.image_product}` : null }
    })
}
async function getProductByCategory(id) {
    const products = await ProductModel.findAll({
        where: {
            category_id: id
        },
        order: [["id_product", "DESC"]],
        include: [
            {
                model: CategoryProductModel,
                as: "category"
            },
            {
                model: BrandProductModel,
                as: "brand"
            },
            {
                model: ProductPriceGrosirModel,
                as: "grosir"
            }
        ]
    })
    return products.map(product => {
        const plainData = product.get({ plain: true });
        return { ...plainData, image_product: (plainData.image_product) ? `${App.BaseUrl}/image/${plainData.image_product}` : null }
    })
}

async function getSearchProduct(keyword) {
    const products = await ProductModel.findAll({
        where: {
            name_product: {
                [Op.like]: `%${keyword}%`
            }
        },
        order: [["id_product", "DESC"]],
        include: [
            {
                model: CategoryProductModel,
                as: "category"
            },
            {
                model: BrandProductModel,
                as: "brand"
            },
            {
                model: ProductPriceGrosirModel,
                as: "grosir"
            }
        ]
    })
    return products.map(product => {
        const plainData = product.get({ plain: true });
        return { ...plainData, image_product: (plainData.image_product) ? `${App.BaseUrl}/image/${plainData.image_product}` : null }
    })
    return finalResult;
}
async function getDetailProduct(id) {
    const product = await ProductModel.findOne({
        where: {
            id_product: id
        },
        include: [
            {
                model: BrandProductModel,
                as: "brand"
            }, {
                model: CategoryProductModel,
                as: "category"
            },
            {
                model: ProductPriceGrosirModel,
                as: "grosir"
            }
        ]
    })
    if (product) {
        const plainData = product.get({ plain: true })
        return { ...plainData, image_product: (plainData.image_product) ? `${App.BaseUrl}/image/${plainData.image_product}` : null }
    }
    return null
}
module.exports = {
    getProductRecomendation,
    getSearchProduct,
    getDetailProduct,
    getProductByCategory
}