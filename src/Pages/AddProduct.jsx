import React, { useContext, useRef } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const textArea = useRef("");
  const handleCreateProduct = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const formFields = Object.fromEntries(formData);
    const textAreaData = textArea.current.value;
    const data = {
      ...formFields,
      description: textAreaData,
    };
    console.log(data);
    axios.post("http://localhost:3000/add-product", data).then((res) => {
      if (res.data.acknowledged) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Product has been added",
          showConfirmButton: false,
          timer: 1500,
        });

        form.reset();
      }
    });
  };
  return (
    <>
      <div
        className={`max-w-7xl mx-auto bg-slate-100 p-5 rounded-sm space-y-5 my-10`}>
        <title>Add a Product</title>
        <h2 className="text-2xl">Add a Product</h2>
        <form onSubmit={handleCreateProduct}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label htmlFor="">Product Name</label>
              <input
                required
                name="product_name"
                type="text"
                placeholder="Type Product name"
                className="input border border-slate-300 rounded-full w-full"
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
              />
            </div>
            <div>
              <label htmlFor="">Category</label>
              <select
                required
                name="category"
                defaultValue="Choose a category"
                className="select border border-slate-300 rounded-full w-full">
                <option disabled={true}>Choose a category</option>

                <option value="electronics-gadgets">
                  Electronics & Gadgets
                </option>
                <option value="home-kitchen">Home & Kitchen Appliances</option>
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
              />
            </div>
            <div className="md:col-span-3 ">
              <label htmlFor="">Description</label>
              <textarea
                required
                ref={textArea}
                className="textarea border border-slate-300 rounded-lg w-full "
                placeholder="Bio"></textarea>
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
    </>
  );
};

export default AddProduct;
