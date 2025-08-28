const { Op } = require("sequelize");
const App = require("../../../../config/app");
const { ProductCartModels, ProductModels, ProductPriceGrosirModels, ProductDiscountModels, CustomerMemberModels } = require("../../../../sequelize/db/models/index")
async function getProductCartController(req, res) {
    try {
        const { customer_id } = req;
        let MemberState = null;
        const getCustomerMemberState = await CustomerMemberModels.findOne({
            where: {
                customer_id
            },
            raw: true
        })
        if (getCustomerMemberState && getCustomerMemberState.member_type == "MITRA") {
            MemberState = "MITRA";
        }
        else if (getCustomerMemberState && getCustomerMemberState.member_type == "GOLD") {
            MemberState = "GOLD"
        }
        const productCarts = await ProductCartModels.findAll({
            where: {
                customer_id: customer_id,
            },
            include: {
                model: ProductModels,
                as: "products",
                include: [
                    {
                        model: ProductPriceGrosirModels,
                        as: "grosir",
                        separate: true,
                        order: [
                            [
                                "min_qty",
                                "DESC",
                            ],
                        ],
                    },
                    {
                        model: ProductDiscountModels,
                        as: "discount"
                    }
                ]

            },

        });
        let finalResponse = [];
        for (const cart of productCarts) {
            let finalPrice = cart.products.price_sell;
            if (cart.products.discount) {
                finalPrice = cart.products.discount.price_discount;
            }
            else {
                if (cart.products.grosir) {
                    if (MemberState == "MITRA") {
                        finalPrice = cart.products.grosir[0].price_grosir
                    }
                    else {
                        for (const priceG of cart.products.grosir) {
                            if (cart.qty == 1) {
                                break
                            }
                            else if (cart.qty >= priceG.min_qty) {
                                finalPrice = priceG.price_grosir;
                                break
                            }
                        }
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
                image_product: (cart.products.image_product) ? `${App.BASEURL}/${cart.products.image_product}` : null
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
        const hasCart = await ProductCartModels.findOne({
            where: {
                [Op.and]: [{ product_id, customer_id }],
            },
        });
        if (hasCart) {
            await hasCart.update({
                qty: hasCart.qty + qty,
            });
        } else {
            await ProductCartModels.create({
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
        const hasCart = await ProductCartModels.findOne({
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
        const hasCart = await ProductCartModels.findOne({
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
        await ProductCartModels.destroy({
            where: {
                [Op.and]: [{ id_cart, customer_id }],
            },
        });
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
module.exports = {
    getProductCartController,
    storeProductCartController,
    incrementProductCartController,
    decrementProductCartController,
    destroyProductCartController
}