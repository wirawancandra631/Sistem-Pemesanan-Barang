const {
    getProductRecomendationDataService,
    findProductService,
    searchProductRecomendationService,
} = require("../../../../services/product.service");
async function index(req, res) {
    try {
        const products = await getProductRecomendationDataService();
        res.json({
            status: 200,
            message: "success",
            data: products,
        });
    } catch (m) {
        res.status(500).json({
            status: 500,
            message: m.message,
        });
    }
}

async function store(req, res) {
    try {
        const { id_product } = req.body;
        const product = await findProductService(id_product);
        if (product) {
            await product.update({
                recomendation_product: true,
            });
            res.json({
                status: 200,
                message: "success",
            });
        } else {
            res.status(404).json({
                status: 404,
                message: `Product dengan id ${id_product} tidak ditemukan`,
            });
        }
    } catch (m) {
        res.status(500).json({
            status: 500,
            message: m.message,
        });
    }
}

async function destroy(req, res) {
    try {
        const { id } = req.params;
        const product = await findProductService(id);
        if (product) {
            await product.update({
                recomendation_product: false,
            });
            res.json({
                status: 200,
                message: "success",
            });
        } else {
            res.status(404).json({
                status: 404,
                message: `Product dengan id ${id} tidak ditemukan`,
            });
        }
    } catch (m) {
        res.status(500).json({
            status: 500,
            message: m.message,
        });
    }
}
async function search(req, res) {
    try {
        const { keyword } = req.query;
        const products = await searchProductRecomendationService(keyword);

        res.json({
            status: 200,
            message: "success",
            data: products,
        });
    } catch (m) {
        res.status(500).json({
            status: 500,
            message: m.message,
        });
    }
}

module.exports = {
    indexProductRecomendationController: index,
    storeProductRecomendationController: store,
    destroyProductRecomendationController: destroy,
    searchProductRecomendationController: search,
};
