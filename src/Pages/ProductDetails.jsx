import { Rating, Star } from "@smastrom/react-rating";
import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import "@smastrom/react-rating/style.css";
import axios from "axios";
const ProductDetails = () => {
  const { data } = useLoaderData();
  const [productCategory, setProductCategory] = useState("");
  const {
    image_url,
    product_name,
    price,
    rating,
    category,
    brand,
    description,
    user_name,
    user_email,
  } = data;

  useEffect(() => {
    axios.get("http://localhost:3000/categories").then((res) => {
      const currentCat = res.data.find((cat) => cat.slug === category);
      setProductCategory(currentCat);
    });
  }, []);

  const myStyles = {
    itemShapes: Star,
    activeFillColor: "#ffb700",
    inactiveFillColor: "gray",
  };
  return (
    <div>
      <section className="py-8 md:py-16  antialiased">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="shrink-0 max-w-md lg:max-w-lg mx-auto flex justify-center items-center">
              <img className="w-full" src={image_url} alt="" />
            </div>

            <div className="mt-6 sm:mt-8 lg:mt-0">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl ">
                {product_name}
              </h1>
              <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl ">
                  BDT {price}
                </p>

                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <div className="flex items-center gap-1">
                    <Rating
                      style={{ maxWidth: 80 }}
                      readOnly={true}
                      itemStyles={myStyles}
                      value={rating}
                    />
                  </div>
                  <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                    ({rating})
                  </p>
                </div>
              </div>
              <div>
                <p>
                  Category - {productCategory?.name} | Brand - {brand}
                </p>
              </div>

              <div className="p-5 shadow inline-block bg-slate-50 rounded mt-5">
                <h3 className="text-lg">Seller Details</h3>
                <hr />
                <p>Seller Name - {user_name}</p>
                <p>Seller Email - {user_email}</p>
              </div>
              <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                <a
                  href="#"
                  title=""
                  className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  role="button">
                  Add to favorites
                </a>
              </div>

              <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

              <p className="mb-6 text-gray-500 dark:text-gray-400">
                {description}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
