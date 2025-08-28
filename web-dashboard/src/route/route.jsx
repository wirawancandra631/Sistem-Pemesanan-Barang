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
import CustomerPage from "../pages/(customer)/customer/Index";
import ProfilPage from "../pages/profil/Index";
import DashboardMiddleware from "../middleware/DashboardMiddleware";
import LogoutPage from "../pages/auth/LogoutPage";
import ProductDiscountPage from "../pages/(marketing)/product-discount/Index";
import UserSettingsPage from "../pages/(settings)/user-settings/Index";
import StoreDecorationPage from "../pages/(settings)/store-decoration/Index";
import NotFoundPage from "../pages/not-found/Index";
import CustomerImportDataPage from "../pages/(customer)/customer-import/Index";
import CustomerSyncDataPage from "../pages/(customer)/customer-sync/Index";
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
        path: "/marketing/product-discount",
        element: <ProductDiscountPage />,
      },

      {
        path: "/customer/list",
        element: <CustomerPage />,
      },

      {
        path: "/customer/import",
        element: <CustomerImportDataPage />,
      },

      {
        path: "/customer/sync",
        element: <CustomerSyncDataPage />,
      },

      {
        path: "/settings/user/profil",
        element: <ProfilPage />,
      },
      {
        path: "/settings/user",
        element: <UserSettingsPage />,
      },
      {
        path: "/settings/store-decoration",
        element: <StoreDecorationPage />,
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
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
