import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./globals.css";
import ErrorPage from "./error-page";
import { ThemeProvider } from "./stores/theme.provider";
import Root from "./routes/root";
import Login from "./routes/auth/login.page";
import AppProvider from "./stores/app.provider";
import CreateCategoriesPage from "./routes/categories/create-categories.page";
import CreateProduct from "./routes/products/create-product";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "auth",
        children: [
          {
            path: "login",
            element: <Login />,
          },
        ],
      },
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
