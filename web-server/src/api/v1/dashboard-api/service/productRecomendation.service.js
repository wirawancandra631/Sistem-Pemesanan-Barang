const App = require("../../../../config/app");
const { ProductModel } = require("../../../../database/loader");
const { Op } = require("sequelize")

async function getAllDataProductRecomendationService() {
    const products = await ProductModel.findAll({
        where: {
            recomendation_product: true
        },
        raw: true
    })
    return products.map(product => ({ ...product, image_product: (product.image_product) ? `${App.BaseUrl}/image/${product.image_product}` : null }))
}
async function getSearchDataProductRecomendationService(keyword) {
    const products = await ProductModel.findAll({
        where: {
            [Op.and]: [{ recomendation_product: true }, {
                name_product: {
                    [Op.like]: `%${keyword}%`
                }
            }]
        },
        raw: true
    })
    return products.map(product => ({ ...product, image_product: (product.image_product) ? `${App.BaseUrl}/image/${product.image_product}` : null }))
}
module.exports = {
    getAllDataProductRecomendationService,
    getSearchDataProductRecomendationService
}