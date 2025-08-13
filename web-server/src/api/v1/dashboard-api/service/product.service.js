const { Op } = require("sequelize");
const App = require("../../../../config/app");
const {
    ProductModel,
    CategoryProductModel,
    BrandProductModel,
    ProductPriceGrosirModel,
} = require("../../../../database/loader");

async function getAllDataProductService() {
    const products = await ProductModel.findAll({
        order: [["id_product", "DESC"]],
        raw: true,
    });
    return products.map((product) => ({
        ...product,
        image_product: product.image_product
            ? `${App.BaseUrl}/image/${product.image_product}`
            : null,
    }));
}
async function getPaginateDataProductService(limit = 10, currentPage = 1) {
    let countData = await getAllDataProductService();
    countData = countData.length
    let offset = 0;
    if (currentPage > 1) {
        offset = limit * (currentPage - 1)
    }
    const products = await ProductModel.findAll({
        order: [["id_product", "DESC"]],
        limit: limit,
        offset: offset,
        raw: true,
    });
    const finalResult = products.map((product) => ({
        ...product,
        image_product: product.image_product
            ? `${App.BaseUrl}/image/${product.image_product}`
            : null,
    }));
    const nextPage = (finalResult.length > 1) ? `${App.BaseUrl}/dashboard-api/product?page=${Number(currentPage) + 1}` : `${App.BaseUrl}/dashboard-api`;
    const prevPage = (finalResult.length > 1) ? `${App.BaseUrl}/dashboard-api/product?page=${Number(currentPage) - 1}` : `${App.BaseUrl}/dashboard-api`;

    return {
        "status": 200,
        "message": "success",
        "data": finalResult,
        "link": {
            "nextPage": nextPage,
            "prevPage": prevPage
        },
        "meta": {
            "perPage": limit,
            "count": countData
        }
    }
}

async function getDetailDataProductService(id) {
    const product = await ProductModel.findOne({
        where: {
            id_product: id,
        },
        include: [
            {
                model: CategoryProductModel,
                as: "category",
            },
            {
                model: BrandProductModel,
                as: "brand",
            },
            {
                model: ProductPriceGrosirModel,
                as: "grosir",
            },
        ],
    });
    if (product) {
        const plainData = product.get({ plain: true })
        return {
            ...plainData,
            image_product: plainData.image_product
                ? `${App.BaseUrl}/image/${plainData.image_product}`
                : null,
        };
    }
    return null;
}
async function searchProductService(keyword) {
    const products = await ProductModel.findAll({
        where: {
            name_product: {
                [Op.like]: `%${keyword}%`,
            },
        },
        raw: true
    });
    return products.map((product) => ({
        ...product,
        image_product: product.image_product
            ? `${App.BaseUrl}/image/${product.image_product}`
            : null,
    }));
}
module.exports = {
    getAllDataProductService,
    getDetailDataProductService,
    searchProductService,
    getPaginateDataProductService
};
