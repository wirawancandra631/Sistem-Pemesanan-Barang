const { findProductService } = require("../../../../services/product.service")
const { ProductDiscountModels } = require("../../../../sequelize/db/models/index")
async function store(req, res) {
    try {
        const { product_id, amount_discount, end_time } = req.body;
        const dataProduct = await findProductService(product_id);
        if (dataProduct) {
            const priceDiscount = Number(dataProduct.price_sell) - (Number(Number(amount_discount) * Number(dataProduct.price_sell) / 100))
            await ProductDiscountModels.create({
                product_id,
                amount_discount,
                price_discount: priceDiscount,
                end_time
            })
            res.status(200).json({
                status: 200,
                message: "success"
            })
        }
        else {
            res.status(404).json({
                status: 404,
                message: `Produk dengan id ${product_id} tidak ditemukan`
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
        await ProductDiscountModels.destroy({
            where: {
                product_id: id
            }
        })
        res.status(200).json({
            status: 200,
            message: "success"
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
    storeProductDiscountController: store,
    destoryProductDiscountController: destroy
}