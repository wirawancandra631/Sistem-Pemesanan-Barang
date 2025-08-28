const { getAllCategoryProductService } = require("../../../../services/categoryProduct.service")

async function index(req, res) {
    try {
        const dataCategory = await getAllCategoryProductService();
        res.status(200).json({
            status: 200,
            message: "success",
            data: dataCategory
        })
    }
    catch (m) {
        res.status(500).json({
            status: 500,
            message: m.message,
        })
    }
}
module.exports = {
    getCategoryProductController: index
}