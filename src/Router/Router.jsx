import { createBrowserRouter } from "react-router";

import Login from "../Pages/Login";

import Register from "../Pages/Register";

export const router = createBrowserRouter([
  {
    path: "login",
    Component: Login,
  },
  {
    path: "register",
    Component: Register,
  },
]);
