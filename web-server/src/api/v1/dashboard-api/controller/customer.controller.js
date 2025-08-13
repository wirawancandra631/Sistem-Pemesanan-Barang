const { Op } = require("sequelize");
const { CustomerModel } = require("../../../../database/loader");
const { getAllDataCustomer, getSearchDataCustomer } = require("../service/customer.service");

async function index(req, res) {
    try {
        const customers = await getAllDataCustomer()
        res.json({
            status: 200,
            message: "success",
            data: customers,
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
        const customers = await getSearchDataCustomer(keyword)
        res.json({
            status: 200,
            message: "success",
            data: customers,
        });
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
        const customer = await CustomerModel.findOne({
            where: {
                id_customer: id,
            },
        });
        if (customer) {
            await customer.destroy();
            res.json({
                status: 200,
                message: "success",
            });
        }
        else {
            res.status(404).json({
                status: 404,
                message: `Customer dengan id ${id} tidak ditemukan`,
            });
        }
    } catch (m) {
        res.status(500).json({
            status: 500,
            message: m.message,
        });
    }
}

module.exports = {
    indexCustomerController: index,
    searchCustomerController: search,
    destroyCustomerController: destroy
};
