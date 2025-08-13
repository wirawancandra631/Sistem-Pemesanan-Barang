const { Op } = require("sequelize");
const { ProductReviewModel, CustomerModel } = require("../../../../database/loader")
async function getProductReviewController(req, res) {
    try {
        const { id } = req.params;
        const productReview = await ProductReviewModel.findAll({
            where: {
                product_id: id
            },
            order: [["id_review", "DESC"]],
            include: {
                model: CustomerModel,
                as: "customer",
                attributes: ["name_customer"]
            }
        })
        res.json({
            status: 200,
            message: "success",
            data: productReview
        })
    }
    catch (m) {
        res.status(500).json({
            status: 500,
            message: m.message
        })
    }
}
async function postProductReviewController(req, res) {
    try {
        const { customer_id } = req;
        const { product_id, review } = req.body;
        const getYear = new Date().getFullYear();
        const getMonth = new Date().getMonth();
        const getDate = new Date().getDate()
        const hasReview = await ProductReviewModel.findOne({
            where: {
                [Op.and]: [{ product_id }, { customer_id }]
            }
        })
        if (hasReview) {
            await hasReview.update({
                review: review
            })
        }
        else {
            await ProductReviewModel.create({
                product_id,
                customer_id,
                review: review,
                publish_at: `${getYear}-${getMonth}-${getDate}`
            })
        }

        res.json({
            status: 200,
            message: "success",
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
    getProductReviewController,
    postProductReviewController
}