const App = require("../../../../config/app");
const { CustomerModel } = require("../../../../database/loader")
const { Op } = require("sequelize");

async function getAllDataCustomer() {
    const customers = await CustomerModel.findAll({
        order: [["name_customer", "ASC"]],
        attributes: ["id_customer", "name_customer", "number_phone", "image_profil"],
        raw: true
    });
    return customers.map(c => ({ ...c, image_profil: c.image_profil ? `${App.BaseUrl}/image/${c.image_profil}` : null }))


}
async function getSearchDataCustomer(keyword) {
    const customers = await CustomerModel.findAll({
        where: {
            name_customer: {
                [Op.like]: `%${keyword}%`,
            },
        },
        order: [["name_customer", "ASC"]],
        attributes: ["id_customer", "name_customer", "number_phone", "image_profil"],
        raw: true
    });
    return customers.map(c => ({ ...c, image_profil: c.image_profil ? `${App.BaseUrl}/image/${c.image_profil}` : null }))


}

module.exports = {
    getAllDataCustomer,
    getSearchDataCustomer
}