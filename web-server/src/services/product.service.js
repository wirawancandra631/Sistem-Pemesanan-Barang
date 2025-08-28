const { Op } = require("sequelize");
const App = require("../config/app");
const {
    ProductModels,
    BrandProductModels,
    CategoryProductModels,
    ProductPriceGrosirModels,
    ProductDiscountModels,
} = require("../sequelize/db/models/index");

// relations
const PRODUCTRELATIONSMODEL = [
    {
        model: BrandProductModels,
        as: "brand",
    },
    {
        model: CategoryProductModels,
        as: "category",
    },
    {
        model: ProductPriceGrosirModels,
        as: "grosir",
        separate: true,
        order: [["min_qty", "DESC"]],
    },
    {
        model: ProductDiscountModels,
        as: "discount",
    },
];
const ProductObjectMapping = (product) => {
    return {
        ...product,
        price_sell: Number(product.price_sell),
        image_product: product.image_product
            ? `${App.BASEURL}/${product.image_product}`
            : null,
        discount: product.discount
            ? {
                ...product.discount,
                amount_discount: Number(product.discount.amount_discount),
                price_discount: Number(product.discount.price_discount),
            }
            : null,
        grosir: product.grosir
            ? product.grosir.map((grosir) => ({
                ...grosir,
                min_qty: Number(grosir.min_qty),
                price_grosir: Number(grosir.price_grosir)
            }))
            : null,
    };
};
// service helper
const findProductService = async (id) => {
    return await ProductModels.findOne({
        where: {
            id_product: id,
        },
    });
};
const getProductRecomendationDataService = async () => {
    const dataProduct = await ProductModels.findAll({
        order: [["id_product", "DESC"]],
        where: {
            recomendation_product: true,
        },
        include: PRODUCTRELATIONSMODEL
    });
    return dataProduct.map((product) => {
        const plainData = product.get({ plain: true });
        return ProductObjectMapping(plainData)
    });
};
const getAllProductDataService = async () => {
    const dataProduct = await ProductModels.findAll({
        order: [["id_product", "DESC"]],
        include: PRODUCTRELATIONSMODEL
    });
    return dataProduct.map((product) => {
        const plainData = product.get({ plain: true });
        return ProductObjectMapping(plainData)
    });
};

const getPaginateDataProductService = async (limit = 10, currentPage = 1) => {
    const countData = await getAllProductDataService();
    const offset = currentPage > 1 ? limit * (currentPage - 1) : 0;
    let dataProduct = await ProductModels.findAll({
        order: [["id_product", "DESC"]],
        limit: limit,
        offset: offset,
        include: PRODUCTRELATIONSMODEL
    });
    dataProduct = dataProduct.map((product) => {
        const plainData = product.get({ plain: true });
        return ProductObjectMapping(plainData);
    });
    const nextPage =
        dataProduct.length > 1
            ? `${App.BASEURL}/dashboard-api/v2/product?page=${Number(currentPage) + 1}`
            : `${App.BASEURL}/dashboard-api/v2/product`;
    const prevPage =
        dataProduct.length > 1
            ? `${App.BASEURL}/dashboard-api/v2/product?page=${Number(currentPage) - 1}`
            : `${App.BASEURL}/dashboard-api/v2/product`;

    return {
        data: dataProduct,
        meta: {
            perPage: limit,
            count: countData.length,
        },
        link: {
            prevPage: prevPage,
            nextPage: nextPage,
        },
    };
};
const getDetailDataProductService = async (id) => {
    const dataProduct = await ProductModels.findOne({
        where: {
            id_product: id,
        },
        include: PRODUCTRELATIONSMODEL,
    });
    if (dataProduct) {
        const plainData = dataProduct.get({ plain: true });
        return ProductObjectMapping(plainData);
    }
    return null;
};
const getProductByCategoryService = async (id_category) => {
    const dataProduct = await ProductModels.findAll({
        order: [["id_product", "DESC"]],
        where: {
            category_id: id_category,
        },
        include: PRODUCTRELATIONSMODEL
    });
    return dataProduct.map((product) => {
        const plainData = product.get({ plain: true });
        return ProductObjectMapping(plainData)
    });
}
const getProductDiscountService = async () => {
    const dataProduct = await ProductModels.findAll({
        order: [["id_product", "DESC"]],
        include: [
            {
                model: BrandProductModels,
                as: "brand",
            },
            {
                model: CategoryProductModels,
                as: "category",
            },
            {
                model: ProductPriceGrosirModels,
                as: "grosir",
                separate: true,
                order: [["min_qty", "DESC"]],
            },
            {
                model: ProductDiscountModels,
                as: "discount",
                required: true
            },
        ]
    });
    return dataProduct.map((product) => {
        const plainData = product.get({ plain: true });
        return ProductObjectMapping(plainData)
    });
}
const searchProductService = async (keyword) => {
    const dataProduct = await ProductModels.findAll({
        order: [["id_product", "DESC"]],
        where: {
            name_product: {
                [Op.like]: `%${keyword}%`,
            },
        },
        include: PRODUCTRELATIONSMODEL
    });
    return dataProduct.map((product) => {
        const plainData = product.get({ plain: true });
        return ProductObjectMapping(plainData)
    });
};
const searchProductRecomendationService = async (keyword) => {
    const dataProduct = await ProductModels.findAll({
        order: [["id_product", "DESC"]],
        where: {
            [Op.and]: [
                {
                    name_product: {
                        [Op.like]: `%${keyword}%`,
                    },
                },
                {
                    recomendation_product: true,
                },
            ],
        },
        include: PRODUCTRELATIONSMODEL
    });
    return dataProduct.map((product) => {
        const plainData = product.get({ plain: true });
        return ProductObjectMapping(plainData)
    });
};

module.exports = {
    findProductService,
    getProductRecomendationDataService,
    getAllProductDataService,
    getPaginateDataProductService,
    getProductByCategoryService,
    getProductDiscountService,
    getDetailDataProductService,
    searchProductService,
    searchProductRecomendationService,
};
