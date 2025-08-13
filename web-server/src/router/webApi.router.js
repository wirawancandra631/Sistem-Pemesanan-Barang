const express = require("express");
const jwtMiddleware = require("../middleware/jwt.middleware")
const BrandProductMiddleware = require("../middleware/brandProduct.middleware");
const CategoryProductMiddleware = require("../middleware/categoryProduct.middleware");
const ProductMiddleware = require("../middleware/product.middleware");
const {
    indexBrandProductController,
    storeBrandProductController,
    editBrandProductController,
    updateBrandProductController,
    destroyBrandProductController,
} = require("../api/v1/dashboard-api/controller/brandProduct.controller");
const {
    indexCategoryProductController,
    storeCategoryProductController,
    editCategoryProductController,
    updateCategoryProductController,
    destroyCategoryProductController,
} = require("../api/v1/dashboard-api/controller/categoryProduct.controller");
const {
    indexProductController,
    storeProductController,
    showProductController,
    editProductController,
    updateProductController,
    destroyProductController,
    searchProductController,
} = require("../api/v1/dashboard-api/controller/product.controller");
const {
    indexProductRecomendationController,
    storeProductRecomendationController,
    destroyProductRecomendationController,
    searchProductRecomendationController,
} = require("../api/v1/dashboard-api/controller/productRecomendation.controller");
const ProductRecomendationMiddleware = require("../middleware/productRecomendation.middleware");
const {
    indexCustomerController,
    searchCustomerController,
    destroyCustomerController,
} = require("../api/v1/dashboard-api/controller/customer.controller");
const {
    authLoginController,
} = require("../api/v1/dashboard-api/controller/auth.controller");
const {
    AuthValidation,
} = require("../api/v1/dashboard-api/validation/auth.validation");
const validationMiddleware = require("../middleware/validation.middleware");
const { getUserProfilController, updateUserProfilController } = require("../api/v1/dashboard-api/controller/userProfil.controller");
const { getDashboardInformation } = require("../api/v1/dashboard-api/controller/dashboardInformation.controller");

const WebRouter = express.Router();
WebRouter.post(
    "/auth",
    AuthValidation,
    validationMiddleware,
    authLoginController
);
WebRouter.use(jwtMiddleware)
WebRouter.get("/brand-product", indexBrandProductController);
WebRouter.post(
    "/brand-product",
    BrandProductMiddleware.Store,
    storeBrandProductController
);
WebRouter.get("/brand-product/edit/:id", editBrandProductController);
WebRouter.put(
    "/brand-product/:id",
    BrandProductMiddleware.Update,
    updateBrandProductController
);
WebRouter.delete("/brand-product/:id", destroyBrandProductController);

WebRouter.get("/category-product", indexCategoryProductController);
WebRouter.post(
    "/category-product",
    CategoryProductMiddleware.Store,
    storeCategoryProductController
);
WebRouter.get("/category-product/edit/:id", editCategoryProductController);
WebRouter.put(
    "/category-product/:id",
    CategoryProductMiddleware.Update,
    updateCategoryProductController
);
WebRouter.delete("/category-product/:id", destroyCategoryProductController);

WebRouter.get("/product", indexProductController);
WebRouter.get("/product/search", searchProductController);
WebRouter.get("/product/:id", showProductController);
WebRouter.post("/product", ProductMiddleware.Store, storeProductController);
WebRouter.get("/product/edit/:id", editProductController);
WebRouter.put(
    "/product/:id",
    ProductMiddleware.Update,
    updateProductController
);
WebRouter.delete("/product/:id", destroyProductController);

WebRouter.get("/product-recomendation", indexProductRecomendationController);
WebRouter.get(
    "/product-recomendation/search",
    searchProductRecomendationController
);
WebRouter.post(
    "/product-recomendation",
    ProductRecomendationMiddleware.Store,
    storeProductRecomendationController
);
WebRouter.delete(
    "/product-recomendation/:id",
    destroyProductRecomendationController
);

WebRouter.get("/customer", indexCustomerController);
WebRouter.get("/customer/search", searchCustomerController);
WebRouter.delete("/customer/:id", destroyCustomerController);
WebRouter.get("/user-profil", getUserProfilController)
WebRouter.put("/user-profil", updateUserProfilController)
WebRouter.get("/dashboard-information", getDashboardInformation)
module.exports = WebRouter;
