const App = require("../../../../config/app");
const { BannerPromotionModels } = require("../../../../sequelize/db/models/index")
async function getBannerPromotionController(req, res) {
    try {
        const dataBannerPromotion = await BannerPromotionModels.findAll()
        const finalResult = dataBannerPromotion.map(banner => {
            const plainData = banner.get({ plain: true });
            return {
                ...plainData,
                image_banner: `${App.BASEURL}/${plainData.image_banner}`
            }
        })
        res.json({
            status: 200,
            message: "success",
            data: finalResult
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
    getBannerPromotionController
}