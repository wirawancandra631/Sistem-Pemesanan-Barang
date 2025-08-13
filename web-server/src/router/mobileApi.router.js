const express = require("express");
const validationMiddleware = require("../middleware/validation.middleware")
const { loginController, registrasiController } = require("../api/v1/mobile-api/controller/authCustomer.controller");
const { getCategoryProductController } = require("../api/v1/mobile-api/controller/categoryProduct.controller");
const { getSearchProductController, getProductRecomendationController, getDetailProductController, getProductByCategoryController } = require("../api/v1/mobile-api/controller/product.controller");
const { LoginAuthValidation, RegistrasiAuthValidation } = require("../api/v1/mobile-api/validation/authCustomer.validation");
const { getProductReviewController, postProductReviewController } = require("../api/v1/mobile-api/controller/productReview.controller");
const mobileApiJwtMiddleware = require("../middleware/mobileApiJwt.middleware");
const { StoreProductReviewValidation } = require("../api/v1/mobile-api/validation/productReview.validation");
const { getProductCartController, storeProductCartController, incrementProductCartController, decrementProductCartController, destroyProductCartController } = require("../api/v1/mobile-api/controller/productCart.controller");
const { StoreProductCartValidation, IncrementProductCartValidation, DecrementProductCartValidation, DestroyProductCartValidation } = require("../api/v1/mobile-api/validation/productCart.validation");
const { getProfilCustomerController, updateProfilCustomerController } = require("../api/v1/mobile-api/controller/customerProfil.controller");
const { UpdateProfilCustomerValidation } = require("../api/v1/mobile-api/validation/profilCustomer.validation");
const MobileRouter = express.Router();
MobileRouter.get("/category-product", getCategoryProductController)
MobileRouter.get("/product-recomendation", getProductRecomendationController);
MobileRouter.get("/product-search", getSearchProductController);
MobileRouter.get("/product-by-category/:id", getProductByCategoryController);
MobileRouter.get("/product-detail/:id", getDetailProductController);
MobileRouter.get("/product-review/:id", getProductReviewController)
MobileRouter.post("/login", LoginAuthValidation, validationMiddleware, loginController)
MobileRouter.post("/registrasi", RegistrasiAuthValidation, validationMiddleware, registrasiController)
MobileRouter.use(mobileApiJwtMiddleware)
MobileRouter.post("/product-review", StoreProductReviewValidation, validationMiddleware, postProductReviewController)
MobileRouter.get("/product-cart", getProductCartController)
MobileRouter.post("/product-cart", StoreProductCartValidation, validationMiddleware, storeProductCartController)
MobileRouter.post("/product-cart/increment", IncrementProductCartValidation, validationMiddleware, incrementProductCartController)
MobileRouter.post("/product-cart/decrement", DecrementProductCartValidation, validationMiddleware, decrementProductCartController)
MobileRouter.delete("/product-cart", DestroyProductCartValidation, validationMiddleware, destroyProductCartController)
MobileRouter.get("/customer-profil", getProfilCustomerController)
MobileRouter.put("/customer-profil", UpdateProfilCustomerValidation, validationMiddleware, updateProfilCustomerController)
module.exports = MobileRouter;