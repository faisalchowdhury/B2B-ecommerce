import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import useAuth from "../Hooks/useAuth";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

const MyProducts = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [updateProductData, setUpdateProductData] = useState({});

  const modalBox = useRef("");
  const textArea = useRef("");
  useEffect(() => {
    axios
      .get(`http://localhost:3000/my-products?email=${user?.email}`)
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
      });
  }, []);

  const handleDeleteProduct = (id) => {
    Swal.fire({
      title: "Do you want to delete this group ?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3000/delete/${id}`).then((res) => {
          if (res.data.deletedCount) {
            const newProducts = products.filter((product) => product._id != id);
            setProducts(newProducts);
          }
        });
      }
    });
  };

  const openModal = (id) => {
    modalBox.current.showModal();
    axios
      .get(`http://localhost:3000/product/${id}`)
      .then((res) => setUpdateProductData(res.data));
  };
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
  return (
    <div className="max-w-7xl mx-auto my-10 ">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Available In Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row  */}

            {products.map((product, i) => (
              <tr key={product._id}>
                <th>{i + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={product?.image_url} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-xl"></div>
                      <div className="text-sm ">{product?.product_name}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="text-lg badge badge-ghost badge-sm  ">
                    {product?.price} BDT
                  </span>
                </td>
                <td>{product?.quantity}</td>
                <th className="space-x-3">
                  <button>
                    <Link
                      to={`/product/${product._id}`}
                      className=" border-none btn-xs">
                      <FaEye
                        color="green"
                        title="Edit this Group information"
                        size={26}
                      />
                    </Link>
                  </button>
                  <button
                    onClick={() => openModal(product._id)}
                    className=" border-none btn-xs">
                    <FaEdit
                      color="gray"
                      title="Edit this Group information"
                      size={26}
                    />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className=" border-none btn-xs">
                    <MdDeleteOutline
                      color="red"
                      title="Are you want to delete this ?"
                      size={26}
                    />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
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
    </div>
  );
};

export default MyProducts;
