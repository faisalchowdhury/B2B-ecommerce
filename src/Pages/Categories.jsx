import React, { useContext } from "react";
import { Link, useLoaderData } from "react-router";
import { ThemeContext } from "../Context/ThemeContext";

const Categories = () => {
  const { data } = useLoaderData();
  const { darkMode } = useContext(ThemeContext);
  return (
    <>
      <title>Categories</title>
      <div className="max-w-7xl mx-auto px-5 md:px-0">
        <div className="grid sm:grid-cols-3 lg:grid-cols-5 py-20 gap-5">
          {data.map((category) => (
            <Link key={category._id} to={`/category/${category.slug}`}>
              <div
                className={`p-10 shadow rounded-xl hover:shadow-xl  h-[200px] flex items-center ${
                  darkMode === true ? "bg-gray-700 text-white" : "bg-slate-50 "
                } `}>
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
      </div>
    </>
  );
};

export default Categories;
