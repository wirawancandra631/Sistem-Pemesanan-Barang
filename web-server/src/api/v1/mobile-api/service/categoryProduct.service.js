const App = require("../../../../config/app");
const { CategoryProductModel } = require("../../../../database/loader");

async function getCategoryProduct() {
    const category = await CategoryProductModel.findAll({
        raw: true
    })
    const finalResult = category.map(c => ({ ...c, icon_category: (c.icon_category) ? `${App.BaseUrl}/image/${c.icon_category}` : null }))
    return finalResult;
}
module.exports = {
    getCategoryProduct
}