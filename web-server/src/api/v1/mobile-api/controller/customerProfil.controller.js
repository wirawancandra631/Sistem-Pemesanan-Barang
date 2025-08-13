const App = require("../../../../config/app");
const { CustomerModel } = require("../../../../database/loader")
const bcrypt = require("bcrypt")
async function getProfilCustomerController(req, res) {
    try {
        const { customer_id } = req;
        const customer = await CustomerModel.findOne({
            where: {
                id_customer: customer_id
            },
            attributes: ["id_customer", "name_customer", "number_phone", "image_profil"]
        })
        let finalResult = null;
        if (customer) {
            finalResult = customer.get({ plain: true });
            finalResult = { ...finalResult, image_profil: (finalResult.image_profil) ? `${App.BaseUrl}/image/${finalResult.image_profil}` : null }
        }
        res.json({
            status: 200,
            message: "success",
            data: finalResult
        })
    }
    catch (m) {
        res.status(500).json({
            status: 500,
            message: m.message,
        })
    }
}
async function updateProfilCustomerController(req, res) {
    try {
        const { customer_id } = req;
        const { name_customer, number_phone, password } = req.body
        const customer = await CustomerModel.findOne({
            where: {
                id_customer: customer_id
            },
        })

        const hasCustomerWithNumberPhone = await CustomerModel.findOne({
            where: {
                number_phone
            },
        })

        if (number_phone != customer.number_phone && hasCustomerWithNumberPhone) {
            res.status(422).json({
                status: 422,
                message: "Gunakan nomor lain"
            })
        }

        let newPassword = null;
        if (password) {
            newPassword = await bcrypt.hash(String(password), 10);
        }
        await customer.update({
            name_customer,
            number_phone,
            password: (password) ? newPassword : customer.password
        })
        res.json({
            status: 200,
            message: "success"
        })

    }
    catch (m) {
        res.status(500).json({
            status: 500,
            message: m.message,
        })
    }
}
module.exports = {
    getProfilCustomerController,
    updateProfilCustomerController
}