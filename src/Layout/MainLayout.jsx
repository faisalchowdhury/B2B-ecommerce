import React from "react";
import Header from "./Header";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
    </div>
  );
};

export default MainLayout;
