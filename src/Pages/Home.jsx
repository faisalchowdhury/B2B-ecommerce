import React from "react";
import Slider from "../Components/Slider";

const Home = () => {
  return (
    <div className="max-w-[1400px] mx-auto py-10">
      <Slider></Slider>

      <div className="grid grid-cols-5 py-20">
        <div className="p-10 shadow rounded-xl hover:shadow-xl bg-slate-50">
          <img
            src="https://i.ibb.co/60H7RKqc/icons8-electronic-64.png"
            alt=""
          />
          <h2 className="text-xl font-semibold space-y-3 ">Electronics</h2>
          <p>Products Available - 300</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
