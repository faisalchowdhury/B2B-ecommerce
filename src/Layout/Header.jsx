import React, { useContext } from "react";
import logo from "../assets/logo.png";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import { Tooltip } from "react-tooltip";
import { Toaster } from "react-hot-toast";

const Header = () => {
  const { user } = useContext(AuthContext);

  const menu = (
    <>
      <NavLink to={"/"}>Home</NavLink>
    </>
  );
  return (
    <div className="bg-primary">
      <Toaster />
      <div className="navbar bg-base-100 max-w-7xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
              className=" menu menu-sm dropdown-content rounded-box z-10 bg-white mt-3 w-52 p-2 shadow">
              {menu}
            </ul>
          </div>
          <Link to={"/"}>
            <img className="w-[150px]" src={logo} alt="" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-3 text-lg">
            {menu}
          </ul>
        </div>
        <div className="navbar-end text-lg space-x-2">
          {!user ? (
            <Link
              className="btn bg-gray-950 border-none text-white px-10 rounded-full hover:bg-black text-lg shadow"
              to={"/login"}>
              Login
            </Link>
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
                  onClick={() => signOut(auth)}>
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
