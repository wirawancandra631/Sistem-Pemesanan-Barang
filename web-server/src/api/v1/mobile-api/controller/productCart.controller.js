const { Op } = require("sequelize");
const {
    ProductCartModel,
    ProductModel,
    ProductPriceGrosirModel,
} = require("../../../../database/loader");
const App = require("../../../../config/app")

async function getProductCartController(req, res) {
    try {
        const { customer_id } = req;
        const productCarts = await ProductCartModel.findAll({
            where: {
                customer_id: customer_id,
            },
            include: {
                model: ProductModel,
                as: "products",
                include: {
                    model: ProductPriceGrosirModel,
                    as: "grosir",
                    separate: true,
                    order: [
                        [
                            "min_qty",
                            "DESC",
                        ],
                    ],
                },

            },

        });
        let finalResponse = [];
        for (const cart of productCarts) {
            let finalPrice = cart.products.price_sell;
            if (cart.products.grosir) {
                for (const priceG of cart.products.grosir) {
                    if (cart.qty == 1) {
                        break
                    }
                    else if (cart.qty >= priceG.min_qty) {
                        finalPrice = priceG.price_grosir;
                        break
                    }
                    else {
                        finalPrice = finalPrice;
                    }
                }

            }
            let mapping = {
                id_cart: cart.id_cart,
                sku_product: cart.products.sku_product,
                name_product: cart.products.name_product,
                product_id: cart.product_id,
                qty: cart.qty,
                price_sell: Number(finalPrice),
                final_price: Number(finalPrice * cart.qty),
                image_product: (cart.products.image_product) ? `${App.BaseUrl}/image/${cart.products.image_product}` : null
            }
            finalResponse.push(mapping)
        }

        res.json({
            status: 200,
            message: "success",
            data: finalResponse,
        });
    } catch (m) {
        res.status(500).json({
            status: 500,
            message: m.message,
        });
    }
}
async function storeProductCartController(req, res) {
    try {
        const { customer_id } = req;
        const { product_id, qty } = req.body;
        const hasCart = await ProductCartModel.findOne({
            where: {
                [Op.and]: [{ product_id, customer_id }],
            },
        });
        if (hasCart) {
            await hasCart.update({
                qty: hasCart.qty + qty,
            });
        } else {
            await ProductCartModel.create({
                product_id,
                customer_id,
                qty,
            });
        }
        res.json({
            status: 200,
            message: "success",
        });
    } catch (m) {
        res.status(500).json({
            status: 500,
            message: m.message,
        });
    }
}
async function incrementProductCartController(req, res) {
    try {
        const { customer_id } = req;
        const { id_cart, qty } = req.body;
        const hasCart = await ProductCartModel.findOne({
            where: {
                [Op.and]: [{ id_cart, customer_id }],
            },
        });
        if (hasCart) {
            await hasCart.update({
                qty: hasCart.qty + qty,
            });
            res.json({
                status: 200,
                message: "success",
            });
        } else {
            res.status(404).json({
                status: 404,
                message: "Cart product not found",
            });
        }
    } catch (m) {
        res.status(500).json({
            status: 500,
            message: m.message,
        });
    }
}
async function decrementProductCartController(req, res) {
    try {
        const { customer_id } = req;
        const { id_cart, qty } = req.body;
        const hasCart = await ProductCartModel.findOne({
            where: {
                [Op.and]: [{ id_cart, customer_id }],
            },
        });
        if (hasCart) {
            const qtyUpdated = hasCart.qty - qty;
            if (qtyUpdated <= 0) {
                await hasCart.destroy();
            } else {
                await hasCart.update({
                    qty: qtyUpdated,
                });
            }
            res.json({
                status: 200,
                message: "success",
            });
        } else {
            res.status(404).json({
                status: 404,
                message: "Cart product not found",
            });
        }
    } catch (m) {
        res.status(500).json({
            status: 500,
            message: m.message,
        });
    }
}
async function destroyProductCartController(req, res) {
    try {
        const { customer_id } = req;
        const { id_cart } = req.body;
        const hasCart = await ProductCartModel.findOne({
            where: {
                [Op.and]: [{ id_cart, customer_id }],
            },
        });
        if (hasCart) {
            await hasCart.destroy();
            res.json({
                status: 200,
                message: "success",
            });
        } else {
            res.status(404).json({
                status: 404,
                message: "Cart product not found",
            });
        }
    } catch (m) {
        res.status(500).json({
            status: 500,
            message: m.message,
        });
    }
}
module.exports = {
    getProductCartController,
    storeProductCartController,
    incrementProductCartController,
    decrementProductCartController,
    destroyProductCartController,
};
