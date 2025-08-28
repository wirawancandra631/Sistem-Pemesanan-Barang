const { Op } = require("sequelize")
const { sequelize, ProductModels, ProductPriceGrosirModels } = require("../../../../sequelize/db/models/index")
const { getPaginateDataProductService, getDetailDataProductService, searchProductService, findProductService } = require("../../../../services/product.service")
async function index(req, res) {
    try {
        const { page } = req.query;
        const dataProduct = await getPaginateDataProductService(10, page)
        res.json({
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
async function show(req, res) {
    try {
        const { id } = req.params;
        const dataProduct = await getDetailDataProductService(id);
        if (dataProduct) {
            res.status(200).json({
                status: 200,
                message: "success",
                data: dataProduct
            })
        }
        else {
            res.status(404).json({
                status: 404,
                message: `Produk dengan id ${id} tidak ditemukan`
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
async function store(req, res) {
    try {
        const {
            sku_product,
            name_product,
            category_id,
            brand_id,
            price_sell,
            price_grosir,
            stock_product,
            image_product,
            description_product,
            display_product,
            display_stock,
            recomendation_product,
        } = req.body;
        let price_grosir_data = [];
        try {
            price_grosir_data = price_grosir ? JSON.parse(price_grosir) : [];
        } catch (m) {
            res.status(422).json({
                status: 422,
                message: "Invalid json format",
            });
        }
        await sequelize.transaction(async (t) => {
            //insert product 
            const product = await ProductModels.create(
                {
                    sku_product,
                    name_product,
                    category_id,
                    brand_id,
                    price_sell,
                    stock_product,
                    image_product,
                    description_product,
                    display_product,
                    display_stock,
                    recomendation_product,
                },
                {
                    transaction: t,
                }
            );
            //insert product grosir
            for (const grosir of price_grosir_data) {
                if (grosir.price_grosir && grosir.min_qty) {
                    await ProductPriceGrosirModels.create(
                        {
                            product_id: product.id_product,
                            price_grosir: grosir.price_grosir,
                            min_qty: grosir.min_qty,
                        },
                        {
                            transaction: t,
                        }
                    );
                }
            }
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
async function edit(req, res) {
    try {
        const { id } = req.params;
        const dataProduct = await getDetailDataProductService(id);
        if (dataProduct) {
            res.status(200).json({
                status: 200,
                message: "success",
                data: dataProduct
            })
        }
        else {
            res.status(404).json({
                status: 404,
                message: `Produk dengan id ${id} tidak ditemukan`
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
async function update(req, res) {
    try {
        const { id } = req.params;
        const {
            sku_product,
            name_product,
            category_id,
            brand_id,
            price_sell,
            price_grosir,
            stock_product,
            image_product,
            description_product,
            display_product,
            display_stock,
            recomendation_product,
        } = req.body;
        let price_grosir_data = [];
        try {
            price_grosir_data = price_grosir ? JSON.parse(price_grosir) : [];
        } catch (m) {
            res.status(422).json({
                status: 422,
                message: "Invalid json format",
            });
        }

        const product = await findProductService(id)
        if (product) {
            if (sku_product != product.sku_product) {
                const hasSku = await ProductModels.findOne({
                    where: {
                        sku_product,
                    },
                });
                if (hasSku) {
                    res.status(422).json({
                        status: 422,
                        message: `Produk dengan sku ${sku_product} sudah ada`,
                    });
                }
            }
            await sequelize.transaction(async (t) => {
                await product.update(
                    {
                        sku_product,
                        name_product,
                        category_id,
                        brand_id,
                        price_sell,
                        stock_product,
                        image_product: image_product
                            ? image_product
                            : product.image_product,
                        description_product,
                        display_product,
                        display_stock,
                        recomendation_product,
                    },
                    {
                        transaction: t,
                    }
                );
                for (const grosir of price_grosir_data) {
                    if (grosir.price_grosir && grosir.min_qty) {
                        const hasGrosir = await ProductPriceGrosirModels.findOne({
                            where: {
                                [Op.and]: [{ product_id: product.id_product }, { min_qty: grosir.min_qty }]
                            }
                        })
                        if (hasGrosir) {
                            await hasGrosir.update({
                                min_qty: grosir.min_qty,
                                price_grosir: grosir.price_grosir
                            }, {
                                transaction: t
                            })
                        }
                        else {
                            await ProductPriceGrosirModels.create({
                                product_id: product.id_product,
                                min_qty: grosir.min_qty,
                                price_grosir: grosir.price_grosir
                            }, {
                                transaction: t
                            })
                        }
                    }
                }
            });

            res.json({
                status: 200,
                message: "success",
            });
        }
        else {
            res.status(404).json({
                status: 404,
                message: `Product dengan id ${id} tidak ditemukan`,
            });
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
        await ProductModels.destroy({
            where: {
                id_product: id,
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
async function search(req, res) {
    try {
        const { keyword } = req.query;
        const products = await searchProductService(keyword)
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
    indexProductController: index,
    showProductController: show,
    storeProductController: store,
    editProductController: edit,
    updateProductController: update,
    destroyProductController: destroy,
    searchProductController: search
}