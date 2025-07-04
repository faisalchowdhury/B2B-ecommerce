import React, { useContext } from "react";

import { Link, NavLink } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { Tooltip } from "react-tooltip";
import { Toaster } from "react-hot-toast";
import { MdDarkMode, MdOutlineShoppingBag } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaPhone,
  FaYoutube,
} from "react-icons/fa";
import { ThemeContext } from "../Context/ThemeContext";
import Logo from "../Components/Logo";

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const menu = (
    <>
      <NavLink className={"hover:text-primary"} to={"/"}>
        Home
      </NavLink>
      <NavLink className={"hover:text-primary"} to={"/categories"}>
        Categories{" "}
      </NavLink>
      <NavLink className={"hover:text-primary"} to={"/products"}>
        All Products
      </NavLink>

      {user && (
        <>
          <NavLink className={"hover:text-primary"} to={"/add-product"}>
            Add Product
          </NavLink>
          <NavLink className={"hover:text-primary"} to={"/my-products"}>
            My Products
          </NavLink>
          <NavLink className={"hover:text-primary"} to={"/cart"}>
            Cart
          </NavLink>
          <NavLink className={"hover:text-primary"} to={"/my-orders"}>
            Orders
          </NavLink>
        </>
      )}

      <NavLink className={"hover:text-primary"} to={"/about"}>
        Who we are ?
      </NavLink>
    </>
  );
  return (
    <>
      <Toaster />
      <div
        className={` px-5 ${
          darkMode === true ? "bg-gray-900 text-white" : "bg-black text-white "
        } `}>
        <div className="flex justify-between max-w-7xl mx-auto py-3 ">
          <div className="flex gap-3">
            <span className="flex items-center gap-2  text-sm">
              <FaEnvelope></FaEnvelope> info@dealcraft.com
            </span>
            <span className="flex items-center gap-2  text-sm">
              <FaPhone></FaPhone> +01010152112
            </span>
          </div>
          <div className="flex gap-3">
            <a
              href="https://www.facebook.com/faisal.ahmed.chowdhury.336926/"
              target="_blank">
              <FaFacebook size={20} color=""></FaFacebook>
            </a>
            <a href="https://instagram.com" target="_blank">
              <FaInstagram size={20} color=""></FaInstagram>
            </a>
            <a href="https://youtube.com" target="_blank">
              <FaYoutube size={20} color=""></FaYoutube>
            </a>
          </div>
        </div>
      </div>
      <div
        className={`${
          darkMode === true ? "bg-slate-700" : "bg-slate-100"
        }  py-3 sticky top-0 z-10`}>
        <div className=" flex flex-col sm:flex-row justify-between gap-5 bg-base-100 max-w-7xl mx-auto px-5 lg:px-0">
          <div className="flex justify-between sm:justify-start  items-center">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex={0}
                className=" menu menu-sm dropdown-content rounded-box z-10 bg-gray-200 text-black mt-3 w-52 p-2 shadow ">
                {menu}
              </ul>
            </div>
            <Link to={"/"}>
              <Logo></Logo>
            </Link>
          </div>

          <div className=" text-lg space-x-3 flex  justify-between sm:justify-start items-center">
            <div className=" hidden lg:flex">
              <ul className="menu menu-horizontal px-1 space-x-3 text-md font-medium ">
                {menu}
              </ul>
            </div>

            <Link className="btn btn-ghost" to={"/cart"}>
              <MdOutlineShoppingBag size={26} />
            </Link>
            {!user ? (
              <>
                <Link
                  className="btn bg-gray-950 border-none text-white px-10 rounded-full hover:bg-black text-lg shadow"
                  to={"/login"}>
                  Login
                </Link>
                <Link
                  className="btn bg-primary border-none text-white px-10 rounded-full hover:bg-black text-lg shadow"
                  to={"/register"}>
                  Register
                </Link>
              </>
            ) : (
              <>
                <div className="flex gap-3 items-center">
                  <img
                    className="w-[30px] h-[30px] rounded-full my-tooltip-element"
                    src={user.photoURL}
                  />
                  <Tooltip anchorSelect=".my-tooltip-element" place="top">
                    {user.displayName}
                  </Tooltip>
                  <button
                    className="btn bg-gray-950 border-none text-white px-10 rounded-full hover:bg-black text-lg shadow"
                    onClick={logoutUser}>
                    Logout
                  </button>
                </div>
              </>
            )}
            <button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <CiLight size={26} /> : <MdDarkMode size={26} />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
