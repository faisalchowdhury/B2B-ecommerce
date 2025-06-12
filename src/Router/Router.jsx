import { createBrowserRouter } from "react-router";

import Login from "../Pages/Login";

import Register from "../Pages/Register";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import NotFound from "../Pages/NotFound";
import AddProduct from "../Pages/AddProduct";
import axios from "axios";
import CategoryProduct from "../Pages/CategoryProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
        loader: () => axios.get("http://localhost:3000/categories"),
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "add-product",
        Component: AddProduct,
      },
      {
        path: "category/:category",
        Component: CategoryProduct,
        loader: ({ params }) =>
          axios.get(`http://localhost:3000/category/${params.category}`),
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
