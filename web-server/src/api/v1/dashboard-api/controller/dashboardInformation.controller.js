const { ProductModel, CustomerModel } = require("../../../../database/loader");

async function index(req, res) {
    try {
        const data = {
            count_product: await ProductModel.count(),
            count_product_recomendation: await ProductModel.count({ where: { recomendation_product: true } }),
            count_customer: await CustomerModel.count()
        }
        res.status(200).json({
            status: 200,
            message: "success",
            data
        });

    }
    catch (m) {
        res.status(500).json({
            status: 500,
            message: m.message
        })
    }
}
module.exports = {
    getDashboardInformation: index
}