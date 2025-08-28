const { getProductRecomendationDataService, searchProductService, getDetailDataProductService, getProductByCategoryService, getProductDiscountService } = require("../../../../services/product.service")

async function getProductRecomendationController(req, res) {
    try {
        const dataProduct = await getProductRecomendationDataService();
        res.status(200).json({
            status: 200,
            message: "success",
            data: dataProduct
        })
    }
    catch (m) {
        res.status(500).json({
            status: 500,
            message: m.message
        })
    }
}
async function getProductSearchController(req, res) {
    try {
        const { keyword } = req.query;
        let products = []
        if (keyword) {
            products = await searchProductService(keyword)
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
async function getProductDetailController(req, res) {
    try {
        const { id } = req.params;
        const product = await getDetailDataProductService(id)
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
        const product = await getProductByCategoryService(id)
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
async function getProductDiscountController(req, res) {
    try {
        const product = await getProductDiscountService()
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
    getProductSearchController,
    getProductDetailController,
    getProductByCategoryController,
    getProductDiscountController
}
