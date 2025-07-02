import { Rating, Star } from "@smastrom/react-rating";
import React, { useEffect, useRef, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import "@smastrom/react-rating/style.css";
import axios from "axios";
import useAuth from "../Hooks/useAuth";
import { FaMinus, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
const ProductDetails = () => {
  const { data } = useLoaderData();
  const modalBox = useRef("");
  const { user } = useAuth();
  const navigate = useNavigate();

  const [quantityErr, setQuantityErr] = useState(null);
  const [productCategory, setProductCategory] = useState("");
  const {
    _id,
    image_url,
    product_name,
    price,
    rating,
    category,
    brand,
    description,
    user_name,
    user_email,
    minimum_selling_quantity,
    quantity,
    short_description,
  } = data;

  useEffect(() => {
    axios.get("https://b2b-server-five.vercel.app/categories").then((res) => {
      const currentCat = res.data.find((cat) => cat.slug === category);
      setProductCategory(currentCat);
    });
  }, []);

  const myStyles = {
    itemShapes: Star,
    activeFillColor: "#ffb700",
    inactiveFillColor: "gray",
  };

  // Buy Button Functionality
  const openModal = (id) => {
    modalBox.current.showModal();
    // axios
    //   .get(`https://b2b-server-five.vercel.app/product/${id}`)
    //   .then((res) => setUpdateProductData(res.data));
  };

  //  Quantity
  const min_quantity = parseInt(minimum_selling_quantity);
  const num_price = parseFloat(price);

  const [quantityValue, setQuantityValue] = useState(min_quantity);

  const incrementQuantity = () => {
    setQuantityErr(null);
    if (quantity < quantityValue) {
      setQuantityErr("Out of stock");
    } else {
      setQuantityValue((prev) => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantityValue > min_quantity) {
      setQuantityValue((prev) => prev - 1);
    } else {
      setQuantityErr(`You cant buy less then ${min_quantity} Units`);
    }
  };

  // Hitting on Server side

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (quantityErr) {
      return toast.error(
        "This product maybe out of stock or you are trying to buy less then minium quantity"
      );
    }
    const form = e.target;
    const formData = new FormData(form);
    const formFields = Object.fromEntries(formData.entries());
    formFields.quantity = quantityValue;
    formFields.product_id = _id;
    formFields.email = user.email;

    console.log(formFields);

    axios
      .post("https://b2b-server-five.vercel.app/add-to-cart", formFields)
      .then((res) => {
        if (res.data.insertedId) {
          modalBox.current.close();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your product has been added to cart",
            showConfirmButton: false,
            timer: 3000,
          });

          navigate("/cart");
        }
      });
  };
  return (
    <>
      <title>{product_name}</title>
      <div>
        <section className="py-8 md:py-16  antialiased">
          <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
              <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
                <img className="w-full" src={image_url} alt="" />
              </div>

              <div className="mt-6 sm:mt-8 lg:mt-0 space-y-2">
                <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl ">
                  {product_name}
                </h1>
                <div className="mt-4 sm:items-center sm:gap-4 sm:flex ">
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
                <div>
                  <span className="bg-amber-500">
                    You have to buy Minimum - {minimum_selling_quantity} Units
                  </span>
                </div>
                <div>
                  <span className="">Available In Stock {quantity} units</span>
                </div>
                <div>
                  <span className="font-semibold">
                    Short Description - {short_description}
                  </span>
                </div>
                <div className="p-5 shadow inline-block bg-slate-50 rounded mt-5">
                  <h3 className="text-lg">Seller Details</h3>
                  <hr />
                  <p>Seller Name - {user_name}</p>
                  <p>Seller Email - {user_email}</p>
                </div>
                <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                  <button
                    onClick={() => openModal(_id)}
                    className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    role="button">
                    Add To Cart
                  </button>
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

      {/* Modal */}
      <dialog ref={modalBox} id="my_modal_7" className="modal overflow-scroll">
        <Toaster></Toaster>
        <div
          className={`bg-slate-100
                    p-5 rounded-sm space-y-5 my-10 max-w-6xl  relative`}>
          <div className=" sm:px-10 ">
            <div className="px-4 pt-8">
              <p className="text-xl font-medium">
                Placing order for{" "}
                <span className="bg-amber-400">{product_name}</span>
              </p>

              <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                  <img
                    className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                    src={image_url}
                    alt=""
                  />
                  <div className="flex w-full flex-col px-4 py-4">
                    <span className="font-semibold">{product_name}</span>
                    <p className="mt-auto text-lg font-bold">{price} BDT</p>
                    <div>
                      {/* Quantity */}
                      <div className="max-w-xs mx-auto">
                        <label className="block mb-2 text-sm font-medium  ">
                          Choose quantity:
                        </label>
                        <div className="relative flex items-center max-w-[8rem]">
                          <button
                            onClick={decrementQuantity}
                            type="button"
                            id="decrement-button"
                            data-input-counter-decrement="quantity-input"
                            className="hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none">
                            <FaMinus></FaMinus>
                          </button>
                          <input
                            type="text"
                            id="quantity-input"
                            aria-describedby="helper-text-explanation"
                            className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5  "
                            required
                            onChange={(e) =>
                              setQuantityValue(Number(e.target.value))
                            }
                            value={quantityValue}
                            readOnly
                          />
                          <button
                            onClick={incrementQuantity}
                            type="button"
                            id="increment-button"
                            data-input-counter-increment="quantity-input"
                            className="hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none">
                            <FaPlus></FaPlus>
                          </button>
                        </div>
                        <p
                          id="helper-text-explanation"
                          className="mt-2 text-sm text-red-500 ">
                          {quantityErr}
                        </p>
                      </div>
                      {/* Quantity */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <form onSubmit={handleAddToCart}>
              <div className="">
                {/* Total  */}
                <div className="mt-6 border-t border-b py-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      Product Price
                    </p>
                    <p className="font-semibold text-gray-900">
                      {num_price} x {quantityValue}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      Subtotal
                    </p>
                    <p className="font-semibold text-gray-900">
                      {(num_price * quantityValue).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Total</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {(num_price * quantityValue).toFixed(2)} BDT
                  </p>
                </div>
              </div>
              <button
                type="submit"
                className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
                Add to cart
              </button>
            </form>
          </div>

          <button
            type="button"
            onClick={() => modalBox.current.close()}
            className="modal-action btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </div>
      </dialog>
    </>
  );
};

export default ProductDetails;
