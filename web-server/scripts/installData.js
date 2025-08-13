const bycrpt = require("bcrypt");
const { UserModel, CategoryProductModel, BrandProductModel, ProductModel, ProductPriceGrosirModel, CustomerModel, ProductReviewModel, ProductCartModel } = require("../src/database/loader");
async function installUser() {
    try {
        const defaultEmail = "admin@gmail.com";
        const defaultPassword = "admin";
        const hashPassword = await bycrpt.hash(defaultPassword, 10);
        await UserModel.create({
            email: defaultEmail,
            password: hashPassword
        })
        console.log("User created")
    }
    catch (m) {
        console.log(m.message)
    }
}
async function installCategoryProduct() {
    try {
        await CategoryProductModel.create({
            name_category: "Sepatu"
        })
        console.log("Category Product created")
    }
    catch (m) {
        console.log(m.message)
    }
}

async function installBrandProduct() {
    try {
        await BrandProductModel.create({
            name_brand: "Adidas"
        })
        console.log("Brand Product created")
    }
    catch (m) {
        console.log(m.message)
    }
}
async function installProduct() {
    try {
        const product = await ProductModel.create({
            sku_product: "0001",
            name_product: "Sepatu adidas pria",
            category_id: 1,
            brand_id: 1,
            price_sell: 100000,
            stock_product: 10,
            description_product: "Sepatu adidas khusus pria",
            recomendation_product: true
        })
        const priceGrosir = await ProductPriceGrosirModel.create({
            product_id: product.id_product,
            price_grosir: 50000,
            min_qty: 12
        })
        console.log("Product created")
    }
    catch (m) {
        console.log(m.message)
    }
}
async function installCustomer() {
    try {
        const password = await bycrpt.hash("123456", 10)
        const customer = await CustomerModel.create({
            name_customer: "Alex",
            number_phone: 111122223333,
            password: password
        })
        await ProductReviewModel.create({
            product_id: 1,
            customer_id: customer.id_customer,
            publish_at: "2025-01-01",
            review: "Test review"
        })
        await ProductCartModel.create({
            product_id: 1,
            customer_id: customer.id_customer,
            qty: 10
        })

        console.log("Customer created,review created , cart created")
    }
    catch (m) {
        console.log(m.message)
    }
}





async function installData() {
    installUser();
    installCategoryProduct();
    installBrandProduct();
    installProduct();
    installCustomer();

}
installData()