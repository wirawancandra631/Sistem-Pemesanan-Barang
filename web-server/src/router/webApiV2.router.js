const express = require("express");
const {
    authLoginController,
} = require("../api/v2/dashboard-api/controller/auth.controller");
const {
    indexBrandProductController,
    storeBrandProductController,
    editBrandProductController,
    updateBrandProductController,
    destroyBrandProductController,
} = require("../api/v2/dashboard-api/controller/brandProduct.controller");
const {
    indexCategoryProductController,
    storeCategoryProductController,
    editCategoryProductController,
    updateCategoryProductController,
    destroyCategoryProductController,
} = require("../api/v2/dashboard-api/controller/categoryProduct.controller");
const {
    indexCustomerController,
    destroyCustomerController,
    updateCustomerController,
    searchCustomerController,
    importDataCustomerController,
    syncDataCustomerController,
    exportDataCustomerController,
} = require("../api/v2/dashboard-api/controller/customer.controller");
const {
    indexProductController,
    showProductController,
    storeProductController,
    editProductController,
    updateProductController,
    destroyProductController,
    searchProductController,
} = require("../api/v2/dashboard-api/controller/product.controller");
const {
    storeProductDiscountController,
    destoryProductDiscountController,
} = require("../api/v2/dashboard-api/controller/productDiscount.controller");
const {
    indexProductRecomendationController,
    storeProductRecomendationController,
    destroyProductRecomendationController,
    searchProductRecomendationController,
} = require("../api/v2/dashboard-api/controller/productRecomendation.controller");
const { getDashboardInformationController, storeBannerPromotionController, destroyBannerPromotioncontroller, showBannerPromotionController } = require("../api/v2/dashboard-api/controller/storeInformation.controller");
const {
    userAppIndexController,
    userAppStoreController,
    destroyUserAppController,
    showUserAppController,
    updateUserAppController,
} = require("../api/v2/dashboard-api/controller/userApp.controller");
const {
    AuthStoreValidation,
} = require("../api/v2/dashboard-api/validation/auth.validation");
const { StoreBannerPromotionValidation } = require("../api/v2/dashboard-api/validation/bannerPromotion.validation");
const {
    StoreBrandProductValidation,
    UpdateBrandProductValidation,
} = require("../api/v2/dashboard-api/validation/brandProduct.validation");
const {
    StoreCategoryProductValidation,
    UpdateCategoryProductValidation,
} = require("../api/v2/dashboard-api/validation/categoryProduct.validation");
const {
    UpdateCustomerValidation, ImporDataValidation, SyncDataValidation,
} = require("../api/v2/dashboard-api/validation/customer.validation");
const {
    StoreProductValidation,
    UpdateProductValidation,
} = require("../api/v2/dashboard-api/validation/product.validation");
const {
    StoreProductDiscountValidation,
} = require("../api/v2/dashboard-api/validation/productDiscount.validation");
const {
    StoreProductRecomendationValidation,
} = require("../api/v2/dashboard-api/validation/productRecomendation.validation");
const {
    StoreUserAppValidation, UpdateUserAppValidation,
} = require("../api/v2/dashboard-api/validation/userApp.validation");
const jwtMiddleware = require("../middleware/jwt.middleware");
const WebRouter = express.Router();
//rute untuk login
WebRouter.post("/auth", AuthStoreValidation, authLoginController);
//middleware jwt
WebRouter.use(jwtMiddleware);
//rute untuk kelola data user aplikasi dashbaord
WebRouter.get("/user-app", userAppIndexController);
WebRouter.get("/user-app/show", showUserAppController);
WebRouter.post("/user-app", StoreUserAppValidation, userAppStoreController);
WebRouter.put("/user-app", UpdateUserAppValidation, updateUserAppController);
WebRouter.delete("/user-app/:id", destroyUserAppController);
// rute untuk kelola data brand produk
WebRouter.get("/brand-product", indexBrandProductController);
WebRouter.post(
    "/brand-product",
    StoreBrandProductValidation,
    storeBrandProductController
);
WebRouter.get("/brand-product/edit/:id", editBrandProductController);
WebRouter.put(
    "/brand-product/:id",
    UpdateBrandProductValidation,
    updateBrandProductController
);
WebRouter.delete("/brand-product/:id", destroyBrandProductController);
//rute untuk kelola data kategori produk
WebRouter.get("/category-product", indexCategoryProductController);
WebRouter.post(
    "/category-product",
    StoreCategoryProductValidation,
    storeCategoryProductController
);
WebRouter.get("/category-product/edit/:id", editCategoryProductController);
WebRouter.put(
    "/category-product/:id",
    UpdateCategoryProductValidation,
    updateCategoryProductController
);
WebRouter.delete("/category-product/:id", destroyCategoryProductController);
//rute untuk kelola data produk
WebRouter.get("/product", indexProductController);
WebRouter.get("/product/search", searchProductController);
WebRouter.get("/product/edit/:id", editProductController);
WebRouter.get("/product/:id", showProductController);
WebRouter.post("/product", StoreProductValidation, storeProductController);
WebRouter.put("/product/:id", UpdateProductValidation, updateProductController);
WebRouter.delete("/product/:id", destroyProductController);
//rute untuk kelola data produk yang akan direkomendasikan
WebRouter.get("/product-recomendation", indexProductRecomendationController);
WebRouter.get(
    "/product-recomendation/search",
    searchProductRecomendationController
);
WebRouter.post(
    "/product-recomendation",
    StoreProductRecomendationValidation,
    storeProductRecomendationController
);
WebRouter.delete(
    "/product-recomendation/:id",
    destroyProductRecomendationController
);
//rute untuk kelola diskon produk
WebRouter.post(
    "/product-discount",
    StoreProductDiscountValidation,
    storeProductDiscountController
);
WebRouter.delete("/product-discount/:id", destoryProductDiscountController);
//rute untuk kelola data customer
WebRouter.get("/customer", indexCustomerController);
WebRouter.get("/customer/search", searchCustomerController);
WebRouter.post("/customer/import", ImporDataValidation, importDataCustomerController);
WebRouter.post("/customer/sync", SyncDataValidation, syncDataCustomerController);
WebRouter.get("/customer/export", exportDataCustomerController);
WebRouter.put("/customer", UpdateCustomerValidation, updateCustomerController);
WebRouter.delete("/customer/:id", destroyCustomerController);

// rute dashboard information
WebRouter.get("/dashboard-information", getDashboardInformationController)
//rute untuk kelola banner promotion
WebRouter.get("/banner-promotion", showBannerPromotionController)
WebRouter.post("/banner-promotion", StoreBannerPromotionValidation, storeBannerPromotionController)
WebRouter.delete("/banner-promotion/:id", destroyBannerPromotioncontroller)
module.exports = {
    webApiV2: WebRouter,
};
