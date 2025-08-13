
const { getProductRecomendation, getSearchProduct, getDetailProduct, getProductByCategory } = require("../service/product.service")
async function getProductRecomendationController(req, res) {
    try {
        const products = await getProductRecomendation()
        res.json({
            status: 200,
            message: "success",
            data: products
        })
    }
    catch (m) {
        res.status(500).json({
            status: 500,
            message: m.message
        })
    }
}
async function getSearchProductController(req, res) {
    try {
        const { keyword } = req.query;
        let products = []
        if (keyword) {
            products = await getSearchProduct(keyword)
        }
        res.json({
            status: 200,
            message: "success",
            data: products
        })
    }
    catch (m) {
        res.status(500).json({
            status: 500,
            message: m.message
        })
    }
}
async function getDetailProductController(req, res) {
    try {
        const { id } = req.params;
        const product = await getDetailProduct(id)
        if (product) {
            res.json({
                status: 200,
                message: "success",
                data: product
            })
        }
        else {
            res.status(404).json({
                status: 404,
                message: `Produk tidak ditemukan`,
            })
        }
    }
    catch (m) {
        res.status(500).json({
            status: 500,
            message: m.message
        })
    }
}
async function getProductByCategoryController(req, res) {
    try {
        const { id } = req.params;
        const product = await getProductByCategory(id)
        res.json({
            status: 200,
            message: "success",
            data: product
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
    getProductRecomendationController,
    getSearchProductController,
    getDetailProductController,
    getProductByCategoryController
}