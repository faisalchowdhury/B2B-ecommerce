import React from "react";
import Slider from "../Components/Slider";
import newsLetterAnimation from "../assets/Lottie-animation/newsletter.json";
import Lottie from "lottie-react";
import delivery from "../assets/delivery.png";
import support from "../assets/support.png";
import card from "../assets/card.png";
import like from "../assets/like.png";
const Home = () => {
  return (
    <div className="max-w-[1400px] mx-auto py-10">
      <Slider></Slider>

      {/* Category Section */}

      <div className="grid grid-cols-5 py-20 gap-5">
        <div className="p-10 shadow rounded-xl hover:shadow-xl bg-slate-50">
          <img
            src="https://i.ibb.co/60H7RKqc/icons8-electronic-64.png"
            alt=""
          />
          <h2 className="text-xl font-semibold space-y-3 ">Electronics</h2>
          <p>Products Available - 300</p>
        </div>

        <div className="p-10 shadow rounded-xl hover:shadow-xl bg-slate-50">
          <img
            src="https://i.ibb.co/60H7RKqc/icons8-electronic-64.png"
            alt=""
          />
          <h2 className="text-xl font-semibold space-y-3 ">Electronics</h2>
          <p>Products Available - 300</p>
        </div>

        <div className="p-10 shadow rounded-xl hover:shadow-xl bg-slate-50">
          <img
            src="https://i.ibb.co/60H7RKqc/icons8-electronic-64.png"
            alt=""
          />
          <h2 className="text-xl font-semibold space-y-3 ">Electronics</h2>
          <p>Products Available - 300</p>
        </div>

        <div className="p-10 shadow rounded-xl hover:shadow-xl bg-slate-50">
          <img
            src="https://i.ibb.co/60H7RKqc/icons8-electronic-64.png"
            alt=""
          />
          <h2 className="text-xl font-semibold space-y-3 ">Electronics</h2>
          <p>Products Available - 300</p>
        </div>

        <div className="p-10 shadow rounded-xl hover:shadow-xl bg-slate-50">
          <img
            src="https://i.ibb.co/60H7RKqc/icons8-electronic-64.png"
            alt=""
          />
          <h2 className="text-xl font-semibold space-y-3 ">Electronics</h2>
          <p>Products Available - 300</p>
        </div>
      </div>
      {/* Category Section */}

      {/* Newsletter */}
      <div className="bg-linear-to-r from-[#fafafa] to-[#e3ebff] px-20 shadow flex items-center rounded-lg">
        <div className="flex-1 space-y-5 ">
          <h1 className="text-5xl">SignUp For Newsletter</h1>
          <p className="text-xl">
            Follow when an unknown printer took a galley of type.
          </p>

          <div className="join">
            <input
              className="input join-item border-l border-t border-b w-[300px]"
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

      {/* Service */}
      <div className="grid grid-cols-4 py-20 gap-5">
        <div className="flex gap-5 p-5 items-center shadow bg-slate-50 rounded hover:shadow-xl border-2 border-dashed">
          <div className="p-5 border-r-1">
            <img className="w-[80px]" src={delivery} alt="" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Fast Delivery</h2>
            <p className="text-slate-700">
              Quick & Reliable Shipping Across the Nation
            </p>
          </div>
        </div>

        <div className="flex gap-5 p-5 items-center shadow bg-slate-50 rounded hover:shadow-xl border-2 border-dashed">
          <div className="p-5 border-r-1">
            <img className="w-[80px]" src={support} alt="" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">24/7 Support</h2>
            <p className="text-slate-700">
              We're Always Here to Help, Anytime You Need Us
            </p>
          </div>
        </div>

        <div className="flex gap-5 p-5 items-center shadow bg-slate-50 rounded hover:shadow-xl border-2 border-dashed">
          <div className="p-5 border-r-1">
            <img className="w-[80px]" src={card} alt="" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Secure payment</h2>
            <p className="text-slate-700">
              Multiple Payment Options with Full Protection
            </p>
          </div>
        </div>

        <div className="flex gap-5 p-5 items-center shadow bg-slate-50 rounded hover:shadow-xl border-2 border-dashed">
          <div className="p-5 border-r-1">
            <img className="w-[80px]" src={like} alt="" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Trusted by Shoppers</h2>
            <p className="text-slate-700">
              Rated High for Satisfaction & Quality Service
            </p>
          </div>
        </div>
      </div>
      {/* Service */}
    </div>
  );
};

export default Home;
