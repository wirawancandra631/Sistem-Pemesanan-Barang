import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/pages/auth/Index";
import DashboardLayout from "@/pages/layout/DashboardLayout";
import HomePage from "@/pages/home/Index";
import ProductPage from "@/pages/(master-data)/product/Index";
import CreateProductPage from "@/pages/(master-data)/create-product/Index";
import EditProductPage from "@/pages/(master-data)/edit-product/Index";
import CategoryProductPage from "@/pages/(master-data)/category-product/Index";
import BrandProductPage from "@/pages/(master-data)/brand-product/Index";
import ProductRecomendationPage from "@/pages/(marketing)/product-recomendation/Index";
import CustomerPage from "../pages/customer/Index";
import ProfilPage from "../pages/profil/Index";
import DashboardMiddleware from "../middleware/DashboardMiddleware";
import LogoutPage from "../pages/auth/LogoutPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <DashboardMiddleware>
        <DashboardLayout />
      </DashboardMiddleware>
    ),
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/master-data/product",
        element: <ProductPage />,
      },
      {
        path: "/master-data/product/create",
        element: <CreateProductPage />,
      },
      {
        path: "/master-data/product/edit/:id",
        element: <EditProductPage />,
      },
      {
        path: "/master-data/category-product",
        element: <CategoryProductPage />,
      },
      {
        path: "/master-data/brand-product",
        element: <BrandProductPage />,
      },
      {
        path: "/marketing/product-recomendation",
        element: <ProductRecomendationPage />,
      },
      {
        path: "/customer",
        element: <CustomerPage />,
      },
      {
        path: "/profil",
        element: <ProfilPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <LoginPage />,
  },
  {
    path: "/logout",
    element: <LogoutPage />,
  },
]);

export default router;
