import React from "react";
import logo from "../assets/logo.png";
const Logo = () => {
  return (
    <div className="flex items-baseline gap-1">
      <img src={logo} className="w-[30px]" alt="" />
      <h2 className="text-2xl font-medium  ">Deal Craft</h2>
    </div>
  );
};

export default Logo;
