import React from "react";
import { useLoaderData } from "react-router";
import ProductCard from "../Components/ProductCard";

const AllProducts = () => {
  const { data } = useLoaderData();
  return (
    <>
      <div className="max-w-7xl mx-auto my-10 space-y-5">
        <h2 className="text-xl font-medium">All Products</h2>
        <div className="grid grid-cols-4 gap-5 ">
          {data.map((product) => (
            <ProductCard key={product._id} product={product}></ProductCard>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllProducts;
