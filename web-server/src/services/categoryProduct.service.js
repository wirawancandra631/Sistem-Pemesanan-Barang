const App = require("../config/app")
const { CategoryProductModels } = require("../sequelize/db/models/index")

const getAllCategoryProductService = async () => {
    const dataCategoryProduct = await CategoryProductModels.findAll({
        raw: true
    });
    return dataCategoryProduct.map(category => ({ ...category, icon_category: (category.icon_category) ? `${App.BASEURL}/${category.icon_category}` : null }))

}
const getDetailCategoryProductService = async (id_category) => {
    const dataCategoryProduct = await CategoryProductModels.findOne({
        where: {
            id_category
        },
        raw: true
    });
    return { ...dataCategoryProduct, icon_category: (dataCategoryProduct.icon_category) ? `${App.BASEURL}/${dataCategoryProduct.icon_category}` : null };


}
module.exports = {
    getAllCategoryProductService,
    getDetailCategoryProductService
}