const { Op } = require("sequelize")
const {
    sequelize,
    ProductModel,
    ProductPriceGrosirModel,
} = require("../../../../database/loader");
const {
    getDetailDataProductService,
    searchProductService,
    getPaginateDataProductService
} = require("../service/product.service");

async function index(req, res) {
    try {
        const { page } = req.query
        const products = await getPaginateDataProductService(10, page);
        res.json(products)
    } catch (m) {
        res.status(500).json({
            status: 500,
            message: m.message,
        });
    }
}
async function show(req, res) {
    try {
        const { id } = req.params;
        const product = await getDetailDataProductService(id);
        if (product) {
            res.json({
                status: 200,
                message: "success",
                data: product,
            });
        } else {
            res.status(404).json({
                status: 404,
                message: `Produk dengan id ${id} tidak ditemukan`,
            });
        }
    } catch (m) {
        res.status(500).json({
            status: 500,
            message: m.message,
        });
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
            const product = await ProductModel.create(
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
            for (const grosir of price_grosir_data) {
                if (grosir.price_grosir && grosir.min_qty) {
                    await ProductPriceGrosirModel.create(
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
        const product = await getDetailDataProductService(id);
        if (product) {
            res.json({
                status: 200,
                message: "success",
                data: product,
            });
        } else {
            res.status(404).json({
                status: 404,
                message: `Produk dengan id ${id} tidak ditemukan`,
            });
        }
    } catch (m) {
        res.status(500).json({
            status: 500,
            message: m.message,
        });
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

        const product = await ProductModel.findOne({
            where: {
                id_product: id,
            },
        });
        if (product) {
            if (sku_product != product.sku_product) {
                const hasSku = await ProductModel.findOne({
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
                        const hasGrosir = await ProductPriceGrosirModel.findOne({
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
                            await ProductPriceGrosirModel.create({
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
        const product = await ProductModel.findOne({
            where: {
                id_product: id,
            },
        });
        if (product) {
            await product.destroy();
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
    searchProductController: search,
};
