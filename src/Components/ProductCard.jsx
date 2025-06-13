import React from "react";
import { Rating, Star } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Link } from "react-router";
const ProductCard = ({ product }) => {
  const myStyles = {
    itemShapes: Star,
    activeFillColor: "#ffb700",
    inactiveFillColor: "gray",
  };
  return (
    <div>
      <div>
        <div className="relative flex w-full  flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md ">
          <a
            className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
            href="#">
            <img
              className=" w-full"
              src={product.image_url}
              alt="product image"
            />
            <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
              Min Quantity {product.minimum_selling_quantity}
            </span>
          </a>
          <div className="mt-4 px-5 pb-5">
            <a href="#">
              <h5 className="text-xl tracking-tight text-slate-900">
                {product.product_name}
              </h5>
            </a>
            <div className="mt-2 mb-5 flex items-center justify-between">
              <p>
                <span className="text-xl font-bold text-slate-900">
                  BDT {product.price}
                </span>
              </p>
              <div className="flex items-center">
                <Rating
                  style={{ maxWidth: 80 }}
                  readOnly={true}
                  itemStyles={myStyles}
                  value={product.rating}
                />
                <span className="mr-2 ml-3 rounded bg-yellow-500 px-2.5 py-0.5 text-xs font-semibold">
                  {product.rating}
                </span>
              </div>
            </div>
            <Link
              to={`/product/${product._id}`}
              className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
