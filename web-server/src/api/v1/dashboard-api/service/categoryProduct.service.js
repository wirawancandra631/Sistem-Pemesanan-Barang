const App = require("../../../../config/app");
const { CategoryProductModel } = require("../../../../database/loader");

async function getAllDataCategoryService() {
    const category = await CategoryProductModel.findAll({
        order: [
            ["id_category", "DESC"]
        ],
        raw: true

    })
    return category.map(c => ({ ...c, icon_category: (c.icon_category) ? `${App.BaseUrl}/image/${c.icon_category}` : null }));
}
async function getDetailDataCategoryService(id) {
    const category = await CategoryProductModel.findOne({
        where: {
            id_category: id
        },
        raw: true

    })
    if (category) {
        return { ...category, icon_category: (category.icon_category) ? `${App.BaseUrl}/image/${category.icon_category}` : null }
    }
    return null
}

module.exports = {
    getAllDataCategoryService,
    getDetailDataCategoryService
}