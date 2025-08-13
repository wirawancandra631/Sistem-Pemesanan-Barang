const { BrandProductModel } = require("../../../../database/loader");
const { getAllDataBrandProductService, getDetailDataBrandProductService } = require("../service/brandProduct.service");

async function index(req, res) {
    try {
        const brands = await getAllDataBrandProductService()
        res.json({
            status: 200,
            message: "success",
            data: brands
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
        const { name_brand } = req.body;
        await BrandProductModel.create({
            name_brand
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
async function edit(req, res) {
    try {
        const { id } = req.params;
        const brand = await getDetailDataBrandProductService(id)
        if (brand) {
            res.json({
                status: 200,
                message: "success",
                data: brand
            })
        }
        else {
            res.status(404).json({
                status: 404,
                message: `Brand dengan id ${id} tidak ditemukan`
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
        const { name_brand } = req.body;
        const brand = await getDetailDataBrandProductService(id)
        if (brand) {
            await brand.update({
                name_brand
            })
            res.json({
                status: 200,
                message: "success",
            })

        }
        else {
            res.status(404).json({
                status: 404,
                message: `Brand dengan id ${id} tidak ditemukan`
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
        const brand = await getDetailDataBrandProductService(id)
        if (brand) {
            await brand.destroy()
            res.json({
                status: 200,
                message: "success",
            })
        }
        else {
            res.status(404).json({
                status: 404,
                message: `Brand dengan id ${id} tidak ditemukan`
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


module.exports = {
    indexBrandProductController: index,
    storeBrandProductController: store,
    editBrandProductController: edit,
    updateBrandProductController: update,
    destroyBrandProductController: destroy
}