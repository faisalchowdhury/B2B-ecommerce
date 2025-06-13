import React from "react";
import { Link, useLoaderData } from "react-router";

import ProductCard from "../Components/ProductCard";
const CategoryProduct = () => {
  const { data } = useLoaderData();

  return (
    <div className="grid grid-cols-5 gap-5">
      {data.map((product) => (
        <ProductCard key={product._id} product={product}></ProductCard>
      ))}
    </div>
  );
};

export default CategoryProduct;
