const { Op } = require("sequelize");
const { ReviewProductModels, CustomerModels } = require("../../../../sequelize/db/models/index")
async function index(req, res) {
    try {
        const { id } = req.params;
        const productReview = await ReviewProductModels.findAll({
            where: {
                product_id: id
            },
            order: [["id_review", "DESC"]],
            include: {
                model: CustomerModels,
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
async function store(req, res) {
    try {
        const { customer_id } = req;
        const { product_id, review } = req.body;
        const getYear = new Date().getFullYear();
        const getMonth = new Date().getMonth() + 1;
        const getDate = new Date().getDate()
        const hasReview = await ReviewProductModels.findOne({
            where: {
                [Op.and]: [{ product_id }, { customer_id }]
            }
        })
        if (hasReview) {
            await hasReview.update({
                publish_at: `${getYear}-${getMonth}-${getDate}`,
                review: review
            })
        }
        else {
            await ReviewProductModels.create({
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
    getProductReviewController: index,
    storeProductReviewController: store
}