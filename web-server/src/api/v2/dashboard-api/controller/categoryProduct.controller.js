const fs = require("node:fs");
const path = require("node:path")
const { CategoryProductModels } = require("../../../../sequelize/db/models/index");
const { getAllCategoryProductService, getDetailCategoryProductService } = require("../../../../services/categoryProduct.service");
async function index(req, res) {
    try {
        const dataCategory = await getAllCategoryProductService();
        res.json({
            status: 200,
            message: "success",
            data: dataCategory
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
        const { name_category, icon_category } = req.body;
        await CategoryProductModels.create({
            name_category,
            icon_category
        })
        res.json({
            status: 200,
            message: "success"
        })
    }
    catch (m) {
        res.status(500).json({
            status: 500,
            message: m.message
        })
    }
}
async function edit(req, res) {
    try {
        const { id } = req.params;
        const dataCategory = await getDetailCategoryProductService(id)
        if (dataCategory) {
            res.json({
                status: 200,
                message: "success",
                data: dataCategory
            })
        }
        else {
            res.status(404).json({
                status: 404,
                message: `Category dengan id ${id} tidak ditemukan`
            })
        }

    }
    catch (m) {
        res.status(500).json({
            status: 500,
            message: m.message
        })
    }
}
async function update(req, res) {
    try {
        const { id } = req.params;
        const { name_category, icon_category } = req.body;
        const dataCategory = await CategoryProductModels.findOne({
            where: {
                id_category: id
            }
        })
        if (dataCategory) {
            dataCategory.update({
                name_category,
                icon_category: icon_category ? icon_category : dataCategory.icon_category
            })
            res.json({
                status: 200,
                message: "success",
            })
        }
        else {
            res.status(404).json({
                status: 404,
                message: `Category dengan id ${id} tidak ditemukan`
            })
        }

    }
    catch (m) {
        res.status(500).json({
            status: 500,
            message: m.message
        })
    }
}
async function destroy(req, res) {
    try {
        const { id } = req.params;
        await CategoryProductModels.destroy({
            where: {
                id_category: id
            }
        })
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
    indexCategoryProductController: index,
    storeCategoryProductController: store,
    editCategoryProductController: edit,
    updateCategoryProductController: update,
    destroyCategoryProductController: destroy
}