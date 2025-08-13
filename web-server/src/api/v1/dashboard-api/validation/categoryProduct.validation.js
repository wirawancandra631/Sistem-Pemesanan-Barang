const { body } = require("express-validator");

const StoreCategoryProductValidation = [
    body("name_category").notEmpty()
]
const UpdateCategoryProductValidation = [
    body("name_category").notEmpty()
]



module.exports = {
    StoreCategoryProductValidation,
    UpdateCategoryProductValidation
}