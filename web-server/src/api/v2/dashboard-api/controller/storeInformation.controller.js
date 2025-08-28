const App = require("../../../../config/app");
const { ProductModels, CustomerModels, BannerPromotionModels } = require("../../../../sequelize/db/models/index")
async function index(req, res) {
    try {
        const dataInformation = {
            count_product: await ProductModels.count(),
            count_product_recomendation: await ProductModels.count({ where: { recomendation_product: true } }),
            count_customer: await CustomerModels.count()
        }
        res.status(200).json({
            status: 200,
            message: "success",
            data: dataInformation
        })
    }
    catch (m) {
        res.status(500).json({
            status: 500,
            message: m.message
        })
    }
}
async function storeBannerPromotion(req, res) {
    try {
        const { image_banner } = req.body;
        await BannerPromotionModels.create({
            image_banner
        })
        res.status(200).json({
            status: 200,
            message: "success",
        })
    }
    catch (m) {
        res.status(500).json({
            status: 500,
            message: m.message
        })
    }
}
async function showBannerPromotion(req, res) {
    try {
        const dataBanner = await BannerPromotionModels.findAll()
        res.status(200).json({
            status: 200,
            message: "success",
            data: dataBanner.map(banner => {
                const plainData = banner.get({ plain: true });
                return { ...plainData, image_banner: `${App.BASEURL}/${plainData.image_banner}` }
            })
        })
    }
    catch (m) {
        res.status(500).json({
            status: 500,
            message: m.message
        })
    }
}
async function destroyBannerPromotion(req, res) {
    try {
        const { id } = req.params;
        await BannerPromotionModels.destroy({
            where: {
                id_banner: id
            }
        })
        res.status(200).json({
            status: 200,
            message: "success",
        })
    }
    catch (m) {
        res.status(500).json({
            status: 500,
            message: m.message
        })
    }
}
module.exports = {
    getDashboardInformationController: index,
    storeBannerPromotionController: storeBannerPromotion,
    showBannerPromotionController: showBannerPromotion,
    destroyBannerPromotioncontroller: destroyBannerPromotion
}