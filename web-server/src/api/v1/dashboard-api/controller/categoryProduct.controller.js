const { CategoryProductModel } = require("../../../../database/loader");
const {
    getAllDataCategoryService,
    getDetailDataCategoryService,
} = require("../service/categoryProduct.service");

async function index(req, res) {
    try {
        const category = await getAllDataCategoryService();
        res.json({
            status: 200,
            message: "success",
            data: category,
        });
    } catch (m) {
        res.status(500).json({
            status: 500,
            message: m.message,
        });
    }
}
async function store(req, res) {
    try {
        const { name_category, icon_category } = req.body;
        await CategoryProductModel.create({
            name_category,
            icon_category,
        });
        res.json({
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
async function edit(req, res) {
    try {
        const { id } = req.params;

        const category = await getDetailDataCategoryService(id);
        if (category) {
            res.json({
                status: 200,
                message: "success",
                data: category,
            });
        } else {
            res.status(404).json({
                status: 404,
                message: `Kategori dengan id ${id} tidak ditemukan`,
            });
        }
    } catch (m) {
        res.status(500).json({
            status: 500,
            message: m.message,
        });
    }
}
async function update(req, res) {
    try {
        const { id } = req.params;
        const category = await getDetailDataCategoryService(id);
        const { name_category, icon_category } = req.body;
        if (category) {
            await CategoryProductModel.update(
                {
                    name_category,
                    icon_category: icon_category ? icon_category : category.icon_category,
                },
                {
                    where: {
                        id_category: id,
                    },
                }
            );
            res.json({
                status: 200,
                message: "success",
            });
        } else {
            res.status(404).json({
                status: 404,
                message: `Kategori dengan id ${id} tidak ditemukan`,
            });
        }
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
        const category = await getDetailDataCategoryService(id);
        if (category) {
            await CategoryProductModel.destroy({ where: { id_category: id } });
            res.json({
                status: 200,
                message: "success",
            });
        } else {
            res.status(404).json({
                status: 404,
                message: `Kategori dengan id ${id} tidak ditemukan`,
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
    indexCategoryProductController: index,
    storeCategoryProductController: store,
    editCategoryProductController: edit,
    updateCategoryProductController: update,
    destroyCategoryProductController: destroy,
};
