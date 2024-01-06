import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./globals.css";
import ErrorPage from "./error-page";
import { ThemeProvider } from "./stores/theme.provider";
import DashboardRoot from "./routes/dashboard/dashboard-root";
import Login from "./routes/login.page";
import AppProvider from "./stores/app.provider";
import CreateCategoriesPage from "./routes/dashboard/categories/create-categories.page";
import CreateProduct from "./routes/dashboard/products/create-product";
import AuthRoot from "./routes/auth-root";

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
            path: "category",
            children: [
              {
                path: "create",
                element: <CreateCategoriesPage />,
              },
            ],
          },
          {
            path: "product",
            children: [
              {
                path: "create",
                element: <CreateProduct />,
              },
            ],
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
