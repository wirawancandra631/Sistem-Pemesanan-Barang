const App = require("../../../../config/app");
const customerModels = require("../../../../sequelize/db/models/customerModels");
const { CustomerModels, CustomerMemberModels } = require("../../../../sequelize/db/models/index")
async function index(req, res) {
    try {
        const { customer_id } = req;
        const customer = await CustomerModels.findOne({
            where: {
                id_customer: customer_id
            },
            include: {
                model: CustomerMemberModels,
                as: "member"
            },
            attributes: ["id_customer", "name_customer", "number_phone", "address", "profil_picture"]
        })
        let finalResult = null;
        if (customer) {
            finalResult = customer.get({ plain: true });
            finalResult = { ...finalResult, profil_picture: (finalResult.profil_picture) ? `${App.BaseUrl}/image/${finalResult.profil_picture}` : null }
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

async function update(req, res) {
    try {
        const { customer_id } = req;
        const { name_customer, number_phone, password, address } = req.body
        const customer = await CustomerModels.findOne({
            where: {
                id_customer: customer_id
            },
        })

        const hasCustomerWithNumberPhone = await CustomerModels.findOne({ where: { number_phone } });

        if (number_phone != customer.number_phone && hasCustomerWithNumberPhone) {
            res.status(422).json({
                status: 422,
                message: "Nomor Handphone Sudah Terdaftar"
            })
        }

        let newPassword = null;
        if (password) {
            newPassword = await bcrypt.hash(String(password), 10);
        }
        await customer.update({
            name_customer,
            number_phone,
            password: (password) ? newPassword : customer.password,
            address: (address) ? address : customer.address
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
    getCustomerProfilController: index,
    updateCustomerProfilController: update
}