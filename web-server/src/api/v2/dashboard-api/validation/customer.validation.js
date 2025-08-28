const { body } = require("express-validator");
const validationMiddleware = require("../../../../middleware/validation.middleware");

const Update = [
    body("customer_id").notEmpty(),
    body("member_type").notEmpty().custom(async value => {
        const memberType = value.toUpperCase()
        console.log(memberType)
        if (memberType != "MITRA" && memberType != "GOLD") {
            throw Error("Tipe member harus GOLD atau MITRA")
        }
    }),
    validationMiddleware
]
const ImportData = [
    body("NOMORHANDPHONE").notEmpty(),
    body("PASSWORD").notEmpty(),
    body("NAMACUSTOMER").notEmpty(),
    body("JENISMEMBER").notEmpty(),
    validationMiddleware
]
const SyncData = [
    body("NOMORHANDPHONE").notEmpty(),
    body("POINTAKHIR").notEmpty(),
    validationMiddleware
]

module.exports = {
    UpdateCustomerValidation: Update,
    ImporDataValidation: ImportData,
    SyncDataValidation: SyncData
}