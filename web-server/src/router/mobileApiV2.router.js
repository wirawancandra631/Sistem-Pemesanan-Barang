const express = require("express");
const { loginController, registrasiController } = require("../api/v2/mobile-api/controller/auth.controller");
const { getCategoryProductController } = require("../api/v2/mobile-api/controller/categoryProduct.controller");
const { getCustomerProfilController, updateCustomerProfilController } = require("../api/v2/mobile-api/controller/customer.controller");
const { getProductSearchController, getProductRecomendationController, getProductDetailController, getProductByCategoryController, getProductDiscountController } = require("../api/v2/mobile-api/controller/product.controller");
const { getProductCartController, storeProductCartController, incrementProductCartController, decrementProductCartController, destroyProductCartController } = require("../api/v2/mobile-api/controller/productCart.controlller");
const { getProductReviewController, storeProductReviewController } = require("../api/v2/mobile-api/controller/productReview.controller");
const { getBannerPromotionController } = require("../api/v2/mobile-api/controller/storeInformation.controller");
const { UpdateCustomerProfilValidation } = require("../api/v2/mobile-api/validation/customer.validation");
const { StoreLoginValidation } = require("../api/v2/mobile-api/validation/login.validation");
const { StoreProductCartValidation, IncrementProductCartValidation, DecrementProductCartValidation, DestroyProductCartValidation } = require("../api/v2/mobile-api/validation/productCart.validation");
const { StoreProductReviewValidation } = require("../api/v2/mobile-api/validation/productReview.validation");
const { StoreRegistrasiValidation } = require("../api/v2/mobile-api/validation/registrasi.validation");
const mobileApiJwtMiddleware = require("../middleware/mobileApiJwt.middleware");
const MobileRouter = express.Router();
MobileRouter.get("/category-product", getCategoryProductController)
MobileRouter.get("/banner-promotion", getBannerPromotionController)
MobileRouter.get("/product-recomendation", getProductRecomendationController)
MobileRouter.get("/product-discount", getProductDiscountController)
MobileRouter.get("/product-search", getProductSearchController)
MobileRouter.get("/product-detail/:id", getProductDetailController)
MobileRouter.get("/product-by-category/:id", getProductByCategoryController)
MobileRouter.get("/product-review/:id", getProductReviewController)
MobileRouter.post("/login", StoreLoginValidation, loginController)
MobileRouter.post("/registrasi", StoreRegistrasiValidation, registrasiController)
MobileRouter.use(mobileApiJwtMiddleware)
MobileRouter.post("/product-review", StoreProductReviewValidation, storeProductReviewController)
MobileRouter.get("/customer-profil", getCustomerProfilController)
MobileRouter.put("/customer-profil", UpdateCustomerProfilValidation, updateCustomerProfilController)
MobileRouter.get("/product-cart", getProductCartController)
MobileRouter.post("/product-cart", StoreProductCartValidation, storeProductCartController)
MobileRouter.post("/product-cart/increment", IncrementProductCartValidation, incrementProductCartController)
MobileRouter.post("/product-cart/decrement", DecrementProductCartValidation, decrementProductCartController)
MobileRouter.delete("/product-cart/destroy", DestroyProductCartValidation, destroyProductCartController)
module.exports = MobileRouter