import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./globals.css";
import ErrorPage from "./error-page";
import { ThemeProvider } from "./stores/theme.provider";
import DashboardRoot from "./routes/dashboard/root";
import Login from "./routes/login.page";
import AppProvider from "./stores/app.provider";
import CreateCategoriesPage from "./routes/dashboard/categories/create-categories.page";
import CreateProduct from "./routes/dashboard/products/create-product";
import AuthRoot from "./routes/auth-root";
import DashboardPage from "./routes/dashboard/dashboard-page";
import CategoryList from "./routes/dashboard/categories/categories-list.page";
import ProductList from "./routes/dashboard/products/products-list.page";
import OrderList from "./routes/dashboard/orders/order-list";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <AuthRoot />,
        children: [
          {
            path: "/",
            element: <Login />,
          },
        ],
      },
      {
        path: "dashboard",
        element: <DashboardRoot />,
        children: [
          {
            path: "",
            element: <DashboardPage />,
          },
          {
            path: "category",
            children: [
              {
                path: "",
                element: <CategoryList />,
              },
              {
                path: "create",
                element: <CreateCategoriesPage />,
              },
            ],
          },
          {
            path: "product",
            element: <ProductList />,
            children: [
              {
                path: "create",
                element: <CreateProduct />,
              },
            ],
          },
          {
            path: "order",
            element: <OrderList />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </AppProvider>
  </React.StrictMode>
);
