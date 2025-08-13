const { ProductModel } = require("../../../../database/loader")
const { getAllDataProductRecomendationService, getSearchDataProductRecomendationService } = require("../service/productRecomendation.service")
async function index(req, res) {
    try {
        const products = await getAllDataProductRecomendationService()
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

async function store(req, res) {
    try {
        const { id_product } = req.body;
        const product = await ProductModel.findOne({
            where: {
                id_product: id_product
            }
        })
        if (product) {
            await product.update({
                recomendation_product: true
            })
            res.json({
                status: 200,
                message: "success",
            })
        }
        else {
            res.status(404).json({
                status: 404,
                message: `Product dengan id ${id_product} tidak ditemukan`,
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



async function destroy(req, res) {
    try {
        const { id } = req.params;
        const product = await ProductModel.findOne({
            where: {
                id_product: id
            }
        })
        if (product) {
            await product.update({
                recomendation_product: false
            })
            res.json({
                status: 200,
                message: "success",
            })
        }
        else {
            res.status(404).json({
                status: 404,
                message: `Product dengan id ${id} tidak ditemukan`,
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
async function search(req, res) {
    try {
        const { keyword } = req.query;
        const products = await getSearchDataProductRecomendationService(keyword)

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



module.exports = {
    indexProductRecomendationController: index,
    storeProductRecomendationController: store,
    destroyProductRecomendationController: destroy,
    searchProductRecomendationController: search
}