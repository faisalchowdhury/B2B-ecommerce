import React from "react";
import { Link, useLoaderData } from "react-router";

const Categories = () => {
  const { data } = useLoaderData();
  return (
    <>
      <title>Categories</title>
      <div className="max-w-7xl mx-auto px-5 md:px-0">
        <div className="grid sm:grid-cols-3 lg:grid-cols-5 py-20 gap-5">
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
      </div>
    </>
  );
};

export default Categories;
