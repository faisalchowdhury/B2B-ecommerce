import React, { useContext, useEffect, useRef, useState } from "react";
import { Rating, Star } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Link } from "react-router";
import axios from "axios";
import { FaBuromobelexperte, FaEdit, FaList } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";

import toast, { Toaster } from "react-hot-toast";
import {
  MdCheckBoxOutlineBlank,
  MdDeleteOutline,
  MdMenu,
} from "react-icons/md";

import Swal from "sweetalert2";
import useAxios from "../Hooks/useAxios";
import Loading from "../Components/Loading";
import { ThemeContext } from "../Context/ThemeContext";

const AllProducts = () => {
  const { user } = useAuth();
  const [allProducts, setAllProducts] = useState([]);
  const { darkMode } = useContext(ThemeContext);
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState(false);
  const axiosInstance = useAxios();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true); // Start loading
    axiosInstance
      .get(`/products`)
      .then((res) => {
        setAllProducts(res.data);
        setProducts(res.data);
      })
      .finally(() => {
        setLoading(false); // Always stop loading
      });
  }, []);

  const modalBox = useRef("");
  const textArea = useRef("");
  const ratingControl = useRef(null);
  const [updateProductData, setUpdateProductData] = useState({});

  //  Tootle View
  const findView = localStorage.getItem("view");

  const [view, setView] = useState(findView);

  useEffect(() => {
    if (!findView) {
      localStorage.setItem("view", "card");
      setView("card");
    }
  }, []);

  const tableView = () => {
    localStorage.setItem("view", "table");
    setView("table");
  };

  const cardView = () => {
    localStorage.setItem("view", "card");
    setView("card");
  };
  // Toggle View
  const handleUpdateProduct = (id) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const formFields = Object.fromEntries(formData);
    const textAreaData = textArea.current.value;
    const data = {
      ...formFields,
      description: textAreaData,
    };

    if (ratingControl.current.value < 1 || ratingControl.current.value > 5) {
      return toast.error("Rating Must be between 1-5");
    }
    axiosInstance.put(`/update-product/${id}`, data).then((res) => {
      if (res.data.modifiedCount) {
        toast.success("Data Updated Successfully");
      }
    });
  };

  const myStyles = {
    itemShapes: Star,
    activeFillColor: "#ffb700",
    inactiveFillColor: "gray",
  };
  const openModal = (id) => {
    modalBox.current.showModal();
    axios
      .get(`https://b2b-server-five.vercel.app/product/${id}`)
      .then((res) => setUpdateProductData(res.data));
  };
  const handleDeleteProduct = (id) => {
    Swal.fire({
      title: "Do you want to delete this group ?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://b2b-server-five.vercel.app/delete/${id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              const newProducts = products.filter(
                (product) => product._id != id
              );
              setProducts(newProducts);
            }
          });
      }
    });
  };

  // Filter Products

  useEffect(() => {
    if (filter) {
      const filteredProducts = allProducts.filter(
        (product) => product.minimum_selling_quantity > 100
      );
      setProducts(filteredProducts);
    } else {
      setProducts(allProducts);
    }
  }, [filter, allProducts]);

  return loading ? (
    <Loading></Loading>
  ) : (
    <>
      <title>All Products</title>

      <div className="max-w-7xl mx-auto my-10 space-y-5 px-5 sm:px-0">
        <h2 className="text-xl font-medium">All Products</h2>
        <div className="p-5 rounded-lg shadow-lg flex justify-between">
          <div className="">
            <label
              onMouseUp={() => setFilter(!filter)}
              className="flex gap-3 items-center font-semibold"
              htmlFor="filter">
              {"  "}
              <input
                id="filter"
                type="checkbox"
                className="checkbox border"
                name="filter"
              />
              <span>Show Available Products</span>
            </label>
          </div>
          <div className="flex gap-3 items-center">
            <p className="font-semibold">Set View</p>
            <button title="Card View" onClick={cardView}>
              <FaBuromobelexperte size={26} className="hover:cursor-grab" />
            </button>
            <button title="Table View" onClick={tableView}>
              <FaList size={26} className="hover:cursor-grab" />
            </button>
          </div>
        </div>
        {view == "card" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 ">
            {products.map((product) => (
              <div key={product._id}>
                <div>
                  <div
                    className={`relative flex w-full h-[450px]  flex-col overflow-hidden rounded-lg border  shadow-md ${
                      darkMode === true
                        ? "bg-gray-950 text-white"
                        : "border-gray-100 bg-white"
                    } `}>
                    <div
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
                    </div>
                    <div className="mt-4 px-5 pb-5">
                      <h5 className="text-xl tracking-tight ">
                        {product.product_name}
                      </h5>

                      <div className="mt-2 mb-5 flex items-center justify-between">
                        <p>
                          <span className="text-xl font-bold ">
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
                      <div className="pb-5">
                        <p>{product.short_description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/product/${product._id}`}
                          className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                          View Details
                        </Link>

                        <button
                          onClick={() => openModal(product._id)}
                          className="flex items-center justify-center rounded-md bg-yellow-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                          <FaEdit size={20}></FaEdit>
                        </button>

                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className="flex items-center justify-center rounded-md bg-red-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                          <MdDeleteOutline size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-5">
            {products.map((product) => (
              <div key={product._id}>
                <div>
                  <div
                    className={`sm:flex max-w-7xl mx-auto overflow-hidden rounded-lg border-3  shadow-md p-5  border-dashed items-center gap-5  ${
                      darkMode === true
                        ? "bg-gray-950 text-white"
                        : "border-gray-200 bg-white"
                    }`}>
                    <div
                      className="flex  h-60 sm:w-80 overflow-hidden rounded-xl"
                      href="#">
                      <img
                        className=" w-full"
                        src={product.image_url}
                        alt="product image"
                      />
                    </div>
                    <div className="mt-4 px-5 pb-5">
                      <h5 className="text-xl ">{product.product_name}</h5>
                      <span className=" top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                        Min Quantity {product.minimum_selling_quantity}
                      </span>
                      <div className="mt-2 mb-5 flex items-center justify-between">
                        <p>
                          <span className="text-xl font-bold ">
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
                      <div className="pb-5">
                        <p>{product.short_description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/product/${product._id}`}
                          className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                          View Details
                        </Link>

                        <button
                          onClick={() => openModal(product._id)}
                          className="flex items-center justify-center rounded-md bg-yellow-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                          <FaEdit size={20}></FaEdit>
                        </button>

                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className="flex items-center justify-center rounded-md bg-red-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                          <MdDeleteOutline size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <dialog ref={modalBox} id="my_modal_7" className="modal overflow-scroll">
        <Toaster></Toaster>
        <div
          className={`${
            darkMode === true ? "bg-gray-700 text-white" : "bg-slate-100"
          }
                            p-5 rounded-sm space-y-5 my-10 max-w-5xl  relative`}>
          <button
            type="button"
            onClick={() => modalBox.current.close()}
            className="modal-action btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <div className={`max-w-7xl mx-auto  p-5 rounded-sm space-y-5 my-10`}>
            <title>Add a Product</title>
            <h2 className="text-2xl">Update Product</h2>
            <form onSubmit={() => handleUpdateProduct(updateProductData._id)}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label htmlFor="">Product Name</label>
                  <input
                    required
                    name="product_name"
                    type="text"
                    placeholder="Type Product name"
                    className="input border border-slate-300 rounded-full w-full"
                    defaultValue={updateProductData.product_name}
                  />
                </div>
                <div>
                  <label htmlFor="">Stock Quantity</label>
                  <input
                    required
                    name="quantity"
                    type="number"
                    placeholder="Product in stock"
                    className="input border border-slate-300 rounded-full w-full"
                    defaultValue={updateProductData.quantity}
                  />
                </div>
                <div>
                  <label htmlFor="">Minimum selling quantity</label>
                  <input
                    required
                    name="minimum_selling_quantity"
                    type="number"
                    placeholder="Minimum selling quantity"
                    className="input border border-slate-300 rounded-full w-full"
                    defaultValue={updateProductData.minimum_selling_quantity}
                  />
                </div>

                <div>
                  <label htmlFor="">Brand Name</label>
                  <input
                    required
                    name="brand"
                    type="text"
                    placeholder="Brand Name"
                    className="input border border-slate-300 rounded-full w-full"
                    defaultValue={updateProductData.brand}
                  />
                </div>
                <div>
                  <label htmlFor="">Category</label>
                  <select
                    required
                    name="category"
                    defaultValue={updateProductData.category}
                    className="select border border-slate-300 rounded-full w-full">
                    <option disabled={true}>Choose a category</option>

                    <option value="electronics-gadgets">
                      Electronics & Gadgets
                    </option>
                    <option value="home-kitchen">
                      Home & Kitchen Appliances
                    </option>
                    <option value="video-gaming">Video Gaming</option>
                    <option value="fashion-apparel">Fashion & Apparel</option>
                    <option value="industrial-machinery">
                      {" "}
                      Industrial Machinery & Tools
                    </option>
                    <option value="health-beauty">Health & Beauty</option>
                    <option value="automotive-parts">
                      Automotive Parts & Accessories
                    </option>
                    <option value="office-supplies">
                      Office Supplies & Stationery
                    </option>
                  </select>
                </div>

                <div>
                  <label htmlFor="">Price</label>
                  <input
                    required
                    name="price"
                    type="number"
                    placeholder="Price"
                    className="input border border-slate-300 rounded-full w-full"
                    defaultValue={updateProductData.price}
                  />
                </div>

                <div>
                  <label htmlFor="">Rating</label>
                  <input
                    ref={ratingControl}
                    name="rating"
                    type="number"
                    placeholder="Rating"
                    className="input border border-slate-300 rounded-full w-full"
                    defaultValue={updateProductData.rating}
                  />
                </div>

                <div>
                  <label htmlFor="">User Name</label>
                  <input
                    required
                    name="user_name"
                    type="text"
                    defaultValue={user?.displayName}
                    readOnly
                    className="input border border-slate-300 rounded-full w-full"
                  />
                </div>
                <div>
                  <label htmlFor="">User Email</label>
                  <input
                    required
                    name="user_email"
                    type="text"
                    defaultValue={user?.email}
                    readOnly
                    className="input border border-slate-300 rounded-full w-full "
                  />
                </div>
                <div className="md:col-span-3 ">
                  <label htmlFor="">Image Url</label>
                  <input
                    required
                    name="image_url"
                    type="text"
                    placeholder="Image Url"
                    className="input border border-slate-300 rounded-full w-full"
                    defaultValue={updateProductData.image_url}
                  />
                </div>
                <div className="md:col-span-3 ">
                  <label htmlFor="">Short Description</label>
                  <input
                    required
                    name="short_description"
                    type="text"
                    placeholder="Short Description"
                    className="input border border-slate-300 rounded-full w-full"
                    defaultValue={updateProductData.short_description}
                  />
                </div>
                <div className="md:col-span-3 ">
                  <label htmlFor="">Description</label>
                  <textarea
                    required
                    ref={textArea}
                    className="textarea border border-slate-300 rounded-lg w-full "
                    placeholder="Bio"
                    defaultValue={updateProductData.description}></textarea>
                </div>
                <input
                  required
                  type="submit"
                  className="rounded-full w-full bg-primary text-white md:col-span-3 p-3"
                  value={"Submit"}
                />
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AllProducts;
