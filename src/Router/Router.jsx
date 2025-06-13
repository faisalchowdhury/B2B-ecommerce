import { createBrowserRouter } from "react-router";

import Login from "../Pages/Login";

import Register from "../Pages/Register";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import NotFound from "../Pages/NotFound";
import AddProduct from "../Pages/AddProduct";
import axios from "axios";
import CategoryProduct from "../Pages/CategoryProduct";
import ProductDetails from "../Pages/ProductDetails";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import AllProducts from "../Pages/AllProducts";
import Categories from "../Pages/Categories";
import MyProducts from "../Pages/MyProducts";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
        loader: () => axios.get("http://localhost:3000/categories-limit"),
      },
      {
        path: "categories",
        loader: ({ params }) => axios.get(`http://localhost:3000/categories`),
        element: (
          <PrivateRoute>
            <Categories></Categories>
          </PrivateRoute>
        ),
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
        element: (
          <PrivateRoute>
            <AddProduct></AddProduct>
          </PrivateRoute>
        ),
      },
      {
        path: "category/:category",
        Component: CategoryProduct,
        loader: ({ params }) =>
          axios.get(`http://localhost:3000/category/${params.category}`),
      },

      {
        path: "/product/:id",
        element: (
          <PrivateRoute>
            <ProductDetails></ProductDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          axios.get(`http://localhost:3000/product/${params.id}`),
      },
      {
        path: "/products",
        loader: () => axios.get(`http://localhost:3000/products`),
        element: (
          <PrivateRoute>
            <AllProducts></AllProducts>
          </PrivateRoute>
        ),
      },
      {
        path: "my-products",
        element: (
          <PrivateRoute>
            <MyProducts></MyProducts>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
