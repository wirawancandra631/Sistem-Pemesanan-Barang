const bcrypt = require("bcrypt");
const customerMemberModels = require("../../../../sequelize/db/models/customerMemberModels");
const {
    sequelize,
    CustomerModels,
    CustomerMemberModels,
} = require("../../../../sequelize/db/models/index");
const {
    getCustomerData,
    searchCustomerData,
    getCustomerPaginateDataService,
} = require("../../../../services/customer.service");
async function index(req, res) {
    try {
        const { page } = req.query;
        const dataCustomer = await getCustomerPaginateDataService(20, page);
        res.status(200).json({
            status: 200,
            message: "success",
            data: dataCustomer,
        });
    } catch (m) {
        res.status(500).json({
            status: 500,
            message: m.message,
        });
    }
}
async function update(req, res) {
    try {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const { customer_id, member_type } = req.body;
        const hasCustomer = await CustomerModels.findOne({ where: { id_customer: customer_id } });
        if (hasCustomer) {
            const memberData = await CustomerMemberModels.findOne({
                where: {
                    customer_id,
                },
            });

            if (memberData) {
                await memberData.update({
                    member_type,
                });
            } else {
                await CustomerMemberModels.create({
                    customer_id,
                    member_type,
                    member_point: 0,
                    last_updated: `${year}-${month + 1}-${day}`,
                });
            }

        }

        res.status(200).json({
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
async function destroy(req, res) {
    try {
        const { id } = req.params;
        await CustomerModels.destroy({ where: { id_customer: id } });
        res.status(200).json({
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
        const dataCustomer = await searchCustomerData(keyword);
        res.status(200).json({
            status: 200,
            message: "success",
            data: dataCustomer,
        });
    } catch (m) {
        res.status(500).json({
            status: 500,
            message: m.message,
        });
    }
}
async function importData(req, res) {
    try {
        const { NOMORHANDPHONE, PASSWORD, NAMACUSTOMER, JENISMEMBER } = req.body;
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const dateNow = `${year}-${month}-${day}`;
        const hasCustomer = await CustomerModels.findOne({
            where: {
                number_phone: NOMORHANDPHONE,
            },
        });
        if (!hasCustomer) {
            await sequelize.transaction(async (t) => {
                const customer = await CustomerModels.create(
                    {
                        number_phone: NOMORHANDPHONE,
                        password: await bcrypt.hash(PASSWORD, 10),
                        name_customer: NAMACUSTOMER,
                    },
                    {
                        transaction: t,
                    }
                );
                await CustomerMemberModels.create(
                    {
                        customer_id: customer.id_customer,
                        member_type: JENISMEMBER,
                        member_point: 0,
                        last_updated: dateNow,
                    },
                    {
                        transaction: t,
                    }
                );
            });
        }
        res.status(200).json({
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
async function syncData(req, res) {
    try {
        const { NOMORHANDPHONE, POINTAKHIR } = req.body;
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const dateNow = `${year}-${month}-${day}`;
        const hasCustomer = await CustomerModels.findOne({
            where: {
                number_phone: NOMORHANDPHONE,
            },
        });

        if (hasCustomer) {
            const dataCustomerMember = await CustomerMemberModels.findOne({
                where: {
                    customer_id: hasCustomer.id_customer,
                },
            });
            if (dataCustomerMember) {
                await dataCustomerMember.update({
                    member_point: POINTAKHIR,
                    last_updated: dateNow,
                });
            }
        }


        res.status(200).json({
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
async function exportData(req, res) {
    try {

        const customers = await CustomerModels.findAll({
            include: {
                model: CustomerMemberModels
                , as: "member"
            }
        })
        const finalCustomers = [];
        for (const data of customers) {
            const plainData = data.get({ plain: true });
            const mapping = {
                "NOMORHANDPHONE": plainData.number_phone,
                "NAMACUSTOMER": plainData.name_customer,
                "TOTALPOINT": plainData.member ? plainData.member.member_point : null,
                "LASTUPDATED": plainData.member ? plainData.member.last_updated : null
            }
            finalCustomers.push(mapping)
        }



        res.status(200).json({
            status: 200,
            message: "success",
            data: finalCustomers
        });
    } catch (m) {
        res.status(500).json({
            status: 500,
            message: m.message,
        });
    }
}

module.exports = {
    indexCustomerController: index,
    updateCustomerController: update,
    destroyCustomerController: destroy,
    searchCustomerController: search,
    importDataCustomerController: importData,
    syncDataCustomerController: syncData,
    exportDataCustomerController: exportData
};
