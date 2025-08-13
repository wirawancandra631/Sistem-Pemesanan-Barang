const { BrandProductModel } = require("../../../../database/loader");

async function getAllDataBrandProductService() {
    return await BrandProductModel.findAll({
        order: [
            ["id_brand", "DESC"]
        ]
    })
}
async function getDetailDataBrandProductService(id) {
    return await BrandProductModel.findOne({
        where: {
            id_brand: id
        }
    })
}


module.exports = {
    getAllDataBrandProductService,
    getDetailDataBrandProductService
}