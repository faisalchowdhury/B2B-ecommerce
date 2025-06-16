import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Slider from "../Components/Slider";
import newsLetterAnimation from "../assets/Lottie-animation/newsletter.json";
import Lottie from "lottie-react";
import delivery from "../assets/delivery.png";
import support from "../assets/support.png";
import card from "../assets/card.png";
import like from "../assets/like.png";
import { Link, useLoaderData } from "react-router";
import axios from "axios";
import ProductCard from "../Components/ProductCard";
const Home = () => {
  const { data } = useLoaderData();
  const [arrival, setArrival] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/new-arrival-products")
      .then((res) => setArrival(res.data));
  }, []);

  // Service Data

  const serviceData = [
    {
      img: delivery,
      title: "Fast Delivery",
      description: "Quick & Reliable Shipping Across the Nation",
    },
    {
      img: support,
      title: "24/7 Support",
      description: "We're Always Here to Help, Anytime You Need Us",
    },
    {
      img: card,
      title: "Secure Payment",
      description: "Multiple Payment Options with Full Protection",
    },
    {
      img: like,
      title: "Trusted by Shoppers",
      description: "Rated High for Satisfaction & Quality Service",
    },
  ];
  // Animation
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 2,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    exit: { opacity: 0, y: 50, transition: { duration: 0.3 } },
  };
  return (
    <>
      <title>Home</title>
      <div className="max-w-[1400px] mx-auto py-10">
        <Slider></Slider>

        <div className="px-5 lg:px-0">
          {/* Category Section */}

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-20 gap-5 ">
            {data.map((category) => (
              <Link key={category._id} to={`/category/${category.slug}`}>
                <div className="p-10 shadow rounded-xl hover:shadow-xl bg-slate-50 h-[200px] flex items-center">
                  <div>
                    <img src={category.image_path} alt="" />
                    <h2 className="text-xl font-semibold space-y-3 ">
                      {category.name}
                    </h2>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {/* Category Section */}

          {/* Newsletter */}
          <div className="bg-linear-to-r from-[#fafafa] to-[#e3ebff] py-10 px-20 shadow sm:flex flex-wrap items-center rounded-lg">
            <div className="flex-1 space-y-5 ">
              <h1 className="text-5xl">SignUp For Newsletter</h1>
              <p className="text-xl">
                Follow when an unknown printer took a galley of type.
              </p>

              <div className="join">
                <input
                  className="input join-item border-l border-t border-b sm:w-[300px]"
                  placeholder="Email"
                />
                <button className="btn join-item  bg-black text-white border-black  hover:bg-gray-800">
                  Subscribe
                </button>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <Lottie
                animationData={newsLetterAnimation}
                style={{
                  width: "400px",
                }}></Lottie>
            </div>
          </div>
          {/* Newsletter */}
          {/* New Arrival */}
          <section className="py-10 space-y-5">
            <h3 className="text-xl">New Arrival</h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 ">
              {arrival.map((product) => (
                <ProductCard key={product._id} product={product}></ProductCard>
              ))}
            </div>
          </section>
          {/* New Arrival */}
          {/* Service */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 py-20 gap-5">
            {serviceData.map((feature, index) => (
              <motion.div
                key={index}
                className="flex gap-5 p-5 items-center shadow bg-slate-50 rounded hover:shadow-xl border-2 border-dashed"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={index} // Pass index for staggered animation
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.2 },
                }} // Hover effect
              >
                <div className="p-5 border-r-1">
                  <img
                    className="w-[80px]"
                    src={feature.img}
                    alt={feature.title}
                  />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">{feature.title}</h2>
                  <p className="text-slate-700">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Service */}
        </div>
      </div>
    </>
  );
};

export default Home;
