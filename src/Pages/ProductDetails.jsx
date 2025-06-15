import { Rating, Star } from "@smastrom/react-rating";
import React, { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router";
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

  // Buy Button Functionality
  const openModal = (id) => {
    modalBox.current.showModal();
    // axios
    //   .get(`http://localhost:3000/product/${id}`)
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

  const handleCheckout = (e) => {
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

    axios.post("http://localhost:3000/add-to-cart", formFields).then((res) => {
      if (res.data.insertedId) {
        modalBox.current.close();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your order has been successfully placed",
          showConfirmButton: false,
          timer: 3000,
        });
      }
      console.log(res.data);
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
                    Short Description - {short_description} units
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
                    Buy Now
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
          <div className="grid sm:px-10 lg:grid-cols-2 ">
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

              <p className="mt-8 text-lg font-medium">Shipping Methods</p>
              <form className="mt-5 grid gap-6">
                <div className="relative">
                  <input
                    className="peer hidden"
                    id="radio_2"
                    type="radio"
                    name="radio"
                  />

                  <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4">
                    <div className="ml-5">
                      <span className="mt-2 font-semibold">
                        Pathaw Delivery
                      </span>
                      <p className="text-slate-500 text-sm leading-6">
                        Delivery: 2-4 Days
                      </p>
                    </div>
                  </label>
                </div>
              </form>
            </div>
            <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
              <p className="text-xl font-medium">Payment Details</p>
              <p className="text-gray-400">
                Complete your order by providing your payment details.
              </p>
              <form onSubmit={handleCheckout}>
                <div className="">
                  <label className="mt-4 mb-2 block text-sm font-medium">
                    User Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter your user name"
                      readOnly
                      defaultValue={user?.displayName}
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2">
                        <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                  </div>
                  <label className="mt-4 mb-2 block text-sm font-medium">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="email"
                      name="email"
                      className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="your.email@gmail.com"
                      readOnly
                      defaultValue={user?.email}
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        />
                      </svg>
                    </div>
                  </div>
                  <label
                    htmlFor="billing-address"
                    className="mt-4 mb-2 block text-sm font-medium">
                    Billing Address
                  </label>
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative flex-shrink-0 sm:w-7/12">
                      <input
                        type="text"
                        id="billing-address"
                        name="billing-address"
                        className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Street Address"
                      />
                      <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                        <img
                          className="h-4 w-4 object-contain"
                          src="https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg"
                          alt=""
                        />
                      </div>
                    </div>

                    <input
                      type="text"
                      name="billing-zip"
                      className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none  focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="ZIP"
                    />
                  </div>
                  <label
                    htmlFor="card-holder"
                    className="mt-4 mb-2 block text-sm font-medium">
                    Card Holder
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="card-holder"
                      className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Your full name here"
                      defaultValue={user?.displayName}
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <label
                    htmlFor="card-no"
                    className="mt-4 mb-2 block text-sm font-medium">
                    Card Details
                  </label>
                  <div className="flex">
                    <div className="relative w-7/12 flex-shrink-0">
                      <input
                        type="text"
                        id="card-no"
                        className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="xxxx-xxxx-xxxx-xxxx"
                        defaultValue={"1234 5078 9101 1123"}
                      />
                      <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                        <svg
                          className="h-4 w-4 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16">
                          <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                          <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                        </svg>
                      </div>
                    </div>
                    <input
                      type="text"
                      className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="MM/YY"
                      defaultValue={"07/29"}
                    />
                    <input
                      type="text"
                      className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="CVC"
                      defaultValue={"123"}
                    />
                  </div>

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
                  Place Order
                </button>
              </form>
            </div>
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
