import React, { useContext } from "react";
import logo from "../assets/logo.png";

import { Link, NavLink } from "react-router";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import paymentOption from "../assets/payment-option.png";
import useAuth from "../Hooks/useAuth";
import { ThemeContext } from "../Context/ThemeContext";
import Logo from "../Components/Logo";

const Footer = () => {
  const { user } = useAuth();
  const { darkMode } = useContext(ThemeContext);
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
    <div className="">
      <footer
        className={` ${
          darkMode === true
            ? "bg-gray-950 text-white"
            : "bg-gray-100 text-gray-800 "
        } `}>
        <div className="max-w-7xl flex gap-10  justify-between py-20 mx-auto space-y-8 lg:flex-row lg:space-y-0 px-5 lg:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-sm gap-x-3 gap-y-8  sm:grid-cols-4">
            <div>
              <Link to="/" className="">
                <Logo></Logo>
              </Link>
              <br></br>
              <p className="w-3/4">
                Deal Craft is your trusted multivendor marketplace, connecting
                buyers with reliable sellers across a wide range of categories.
                We ensure a secure, seamless shopping experience with fast
                delivery, verified products, and dedicated support.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="tracking-wide text-md uppercase ">
                Important Links
              </h3>
              <div className="flex flex-col text-md">{menu}</div>
            </div>
            <div className="space-y-3">
              <div className="uppercase text-md ">Payment Method</div>
              <div className="flex justify-start space-x-3">
                <img className="w-[250px]" src={paymentOption} alt="" />
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="tracking-wide text-md uppercase ">Get In Touch</h3>

              <form action="">
                <div className="join">
                  <div className="">
                    <label className="input validator join-item border border-gray-300">
                      <svg
                        className="h-[1em] opacity-50"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24">
                        <g
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          strokeWidth="2.5"
                          fill="none"
                          stroke="currentColor">
                          <rect
                            width="20"
                            height="16"
                            x="2"
                            y="4"
                            rx="2"></rect>
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                        </g>
                      </svg>
                      <input
                        type="email"
                        placeholder="mail@site.com"
                        required
                        className=""
                      />
                    </label>
                    <div className="validator-hint hidden">
                      Enter valid email address
                    </div>
                  </div>
                  <button className="btn border-none bg-primary text-white join-item">
                    Join
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="py-6 text-sm text-center dark:text-gray-600">
          © 2025 Deal Craft. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
