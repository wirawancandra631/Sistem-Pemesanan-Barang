const { BrandProductModels } = require("../../../../sequelize/db/models/index");
async function index(req, res) {
    try {
        const dataBrand = await BrandProductModels.findAll();
        res.status(200).json({
            status: 200,
            message: "success",
            data: dataBrand,
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
        const { name_brand } = req.body;
        await BrandProductModels.create({
            name_brand,
        });
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
async function edit(req, res) {
    try {
        const { id } = req.params;
        const dataBrand = await BrandProductModels.findOne({
            where: {
                id_brand: id,
            },
        });
        if (dataBrand) {
            res.status(200).json({
                status: 200,
                message: "success",
                data: dataBrand,
            });
        } else {
            res.status(404).json({
                status: 404,
                message: `Brand dengan id ${id} tidak ditemukan`,
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
        const { name_brand } = req.body;
        const dataBrand = await BrandProductModels.findOne({
            where: {
                id_brand: id,
            },
        });
        if (dataBrand) {
            await dataBrand.update({
                name_brand,
            });
            res.status(200).json({
                status: 200,
                message: "success",
            });
        } else {
            res.status(404).json({
                status: 404,
                message: `Brand dengan id ${id} tidak ditemukan`,
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
        await BrandProductModels.destroy({
            where: {
                id_brand: id,
            },
        });
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

module.exports = {
    indexBrandProductController: index,
    storeBrandProductController: store,
    editBrandProductController: edit,
    updateBrandProductController: update,
    destroyBrandProductController: destroy,
};
