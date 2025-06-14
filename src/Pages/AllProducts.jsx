import React, { useEffect, useRef, useState } from "react";
import { Rating, Star } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Link, useLoaderData } from "react-router";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";

import toast, { Toaster } from "react-hot-toast";
import { MdDeleteOutline } from "react-icons/md";

const AllProducts = () => {
  const { data } = useLoaderData();
  const [products, setProducts] = useState(data);
  const { user } = useAuth();
  const modalBox = useRef("");
  const textArea = useRef("");
  const [updateProductData, setUpdateProductData] = useState({});

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

    axios
      .put(`http://localhost:3000/update-product/${id}`, data)
      .then((res) => {
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
      .get(`http://localhost:3000/product/${id}`)
      .then((res) => setUpdateProductData(res.data));
  };
  const handleDeleteProduct = (id) => {
    axios.delete(`http://localhost:3000/delete/${id}`).then((res) => {
      if (res.data.deletedCount) {
        const newProducts = products.filter((product) => product._id != id);
        setProducts(newProducts);
      }
    });
  };

  return (
    <>
      <title>All Products</title>
      <div className="max-w-7xl mx-auto my-10 space-y-5">
        <h2 className="text-xl font-medium">All Products</h2>
        <div className="grid grid-cols-4 gap-5 ">
          {products.map((product) => (
            <div key={product._id}>
              <div>
                <div className="relative flex w-full h-[400px]  flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md ">
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
                    <h5 className="text-xl tracking-tight text-slate-900">
                      {product.product_name}
                    </h5>

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
      </div>

      {/* Modal */}
      <dialog ref={modalBox} id="my_modal_7" className="modal overflow-scroll">
        <Toaster></Toaster>
        <div
          className={`bg-slate-100
                            p-5 rounded-sm space-y-5 my-10 max-w-5xl  relative`}>
          <button
            type="button"
            onClick={() => modalBox.current.close()}
            className="modal-action btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <div
            className={`max-w-7xl mx-auto bg-slate-100 p-5 rounded-sm space-y-5 my-10`}>
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
                    required
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
