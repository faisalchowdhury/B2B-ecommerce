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
import Loading from "../Components/Loading";
import Cart from "../Pages/Cart";
import Payment from "../Pages/Payment";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
        loader: () =>
          axios.get("https://b2b-server-five.vercel.app/categories-limit"),
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path: "categories",
        loader: ({ params }) =>
          axios.get(`https://b2b-server-five.vercel.app/categories`),
        element: <Categories></Categories>,
        hydrateFallbackElement: <Loading></Loading>,
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
          axios.get(
            `https://b2b-server-five.vercel.app/category/${params.category}`
          ),
        hydrateFallbackElement: <Loading></Loading>,
      },

      {
        path: "/product/:id",
        element: (
          <PrivateRoute>
            <ProductDetails></ProductDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          axios.get(`https://b2b-server-five.vercel.app/product/${params.id}`),
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path: "/products",
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
      {
        path: "cart",
        element: (
          <PrivateRoute>
            <Cart></Cart>
          </PrivateRoute>
        ),
      },
      {
        path: "payment/:cartId",
        element: <PrivateRoute><Payment></Payment></PrivateRoute>
      }
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
