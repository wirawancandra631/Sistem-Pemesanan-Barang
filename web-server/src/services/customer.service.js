const { Op } = require("sequelize");
const App = require("../config/app");
const {
    CustomerModels,
    CustomerMemberModels,
} = require("../sequelize/db/models/index");
const getCustomerData = async () => {
    const dataCustomer = await CustomerModels.findAll({
        order: [["name_customer", "ASC"]],
        attributes: [
            "id_customer",
            "name_customer",
            "number_phone",
            "profil_picture",
            "address",
        ],
        include: {
            model: CustomerMemberModels,
            as: "member",
        },
    });
    return dataCustomer.map((customer) => {
        const plainData = customer.get({ plain: true });
        return {
            ...plainData,
            profil_picture: plainData.profil_picture
                ? `${App.BaseUrl}/${plainData.profil_picture}`
                : null,
        };
    });
};
const getCustomerPaginateDataService = async (limit = 20, currentPage = 1) => {
    const countData = await getCustomerData();
    const offset = currentPage > 1 ? limit * (currentPage - 1) : 0;
    let dataCustomer = await CustomerModels.findAll({
        order: [["name_customer", "ASC"]],
        limit,
        offset,
        attributes: [
            "id_customer",
            "name_customer",
            "number_phone",
            "profil_picture",
            "address",
        ],
        include: {
            model: CustomerMemberModels,
            as: "member",
        },
    });
    dataCustomer = dataCustomer.map((customer) => {
        const plainData = customer.get({ plain: true });
        return {
            ...plainData,
            profil_picture: plainData.profil_picture
                ? `${App.BaseUrl}/${plainData.profil_picture}`
                : null,
        };
    });
    const nextPage =
        dataCustomer.length > 1
            ? `${App.BASEURL}/dashboard-api/v2/customer?page=${Number(currentPage) + 1
            }`
            : `${App.BASEURL}/dashboard-api/v2/customer`;
    const prevPage =
        dataCustomer.length > 1
            ? `${App.BASEURL}/dashboard-api/v2/customer?page=${Number(currentPage) - 1
            }`
            : `${App.BASEURL}/dashboard-api/v2/customer`;

    return {
        data: dataCustomer,
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
const searchCustomerData = async (keyword) => {
    const dataCustomer = await CustomerModels.findAll({
        where: {
            [Op.or]: [
                {
                    number_phone: {
                        [Op.like]: `%${keyword}%`,
                    },
                },
                {
                    name_customer: {
                        [Op.like]: `%${keyword}%`,
                    },
                },
            ],
        },
        order: [["name_customer", "ASC"]],
        attributes: [
            "id_customer",
            "name_customer",
            "number_phone",
            "profil_picture",
            "address",
        ],
        include: {
            model: CustomerMemberModels,
            as: "member",
        },
    });
    return dataCustomer.map((customer) => {
        const plainData = customer.get({ plain: true });
        return {
            ...plainData,
            profil_picture: plainData.profil_picture
                ? `${App.BaseUrl}/${plainData.profil_picture}`
                : null,
        };
    });
};

module.exports = {
    getCustomerData,
    searchCustomerData,
    getCustomerPaginateDataService,
};
