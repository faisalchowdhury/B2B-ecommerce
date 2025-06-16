import React from "react";
import { Link, useLoaderData } from "react-router";

import ProductCard from "../Components/ProductCard";
const CategoryProduct = () => {
  const { data } = useLoaderData();

  return (
    <>
      <title>Products by category</title>
      <div className="max-w-7xl mx-auto my-10 space-y-5 px-5 lg:p-0">
        {/* <h2 className="text-xl font-medium">All Products</h2> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 ">
          {data.map((product) => (
            <ProductCard key={product._id} product={product}></ProductCard>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryProduct;
