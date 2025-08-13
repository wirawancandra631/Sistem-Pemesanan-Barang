const { getCategoryProduct } = require("../service/categoryProduct.service");

async function getCategoryProductController(req, res) {
    try {
        const category = await getCategoryProduct();
        res.json({
            status: 200,
            message: "success",
            data: category
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
    getCategoryProductController
}