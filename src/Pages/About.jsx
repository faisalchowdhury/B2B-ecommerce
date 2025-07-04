import React, { useContext } from "react";
import { Link } from "react-router";
import about from "../assets/about.jpg";
import { ThemeContext } from "../Context/ThemeContext";

const About = () => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <div>
      <div
        className={` min-h-screen max-w-5xl mx-auto my-10 p-5 shadow rounded-xl ${
          darkMode === true ? "bg-gray-700 text-white" : "bg-slate-50"
        }`}>
        <div className=" space-y-5">
          <img
            className="rounded-xl h-[300px] w-full object-cover"
            src={about}
            alt=""
          />
          <h1 className="text-3xl">Your Trusted Partner in B2B Wholesale</h1>
          <p className="">
            At Deal Craft, we believe that great businesses deserve seamless
            access to high-quality products at competitive prices. As a
            dedicated B2B wholesale platform, our mission is to simplify bulk
            purchasing for retailers, small businesses, and corporate buyers
            across various industries. Whether you are sourcing inventory for
            your store or looking to expand your product offerings, Deal Craft
            connects you directly with reliable manufacturers and suppliers,
            ensuring consistent quality and timely delivery.
          </p>
          <h1 className="text-2xl ">Why Choose Deal Craft?</h1>
          <p className="">
            ✅ Curated Products: We partner with trusted manufacturers to offer
            a wide range of quality products across categories, including
            electronics, apparel, home goods, and more. <br></br>✅ Competitive
            Pricing: We leverage strong supplier relationships to secure the
            best prices, helping your business improve margins while maintaining
            product quality. <br></br>✅ Efficient Logistics: From order
            placement to delivery, our streamlined processes ensure your
            products reach you quickly and safely.
            <br></br> ✅ Dedicated Support: Our B2B specialists provide
            personalized assistance, helping you source products, handle bulk
            orders, and navigate logistics with ease.
          </p>
          <h1 className="text-2xl">Our Mission</h1>
          <p>
            Deal Craft is built on the belief that wholesale buying should be
            efficient, transparent, and growth-focused for every business. We
            are committed to empowering retailers and businesses by simplifying
            product sourcing and providing access to quality goods without
            complexity.
          </p>
          <h1 className="text-2xl">Our Vision</h1>
          <p>
            To become the leading B2B wholesale platform that fuels the growth
            of businesses worldwide through reliable sourcing, transparent
            pricing, and exceptional service.
          </p>
          <Link
            to={"/products"}
            className="btn btn-primary border-none text-white hover:bg-black">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
