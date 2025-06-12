import React, { useContext, useRef } from "react";
import { AuthContext } from "../Context/AuthContext";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const textArea = useRef("");
  return (
    <>
      <div
        className={`max-w-7xl mx-auto bg-slate-100 p-5 rounded-sm space-y-5 my-10`}>
        <title>Add a Product</title>
        <h2 className="text-2xl">Add a Product</h2>
        <form>
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
                name="hobby-category"
                defaultValue="Choose a hobby"
                className="select border border-slate-300 rounded-full w-full">
                <option disabled={true}>Choose a hobby</option>

                <option value="Electronics & Gadgets">
                  Electronics & Gadgets
                </option>
                <option value="Home & Kitchen Appliances">
                  Home & Kitchen Appliances
                </option>
                <option value="Video Gaming">Video Gaming</option>
                <option value="Fashion & Apparel">Fashion & Apparel</option>
                <option value="Industrial Machinery & Tools">
                  {" "}
                  Industrial Machinery & Tools
                </option>
                <option value="Health & Beauty">Health & Beauty</option>
                <option value="Automotive Parts & Accessories">
                  Automotive Parts & Accessories
                </option>
                <option value="Office Supplies & Stationery">
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
                value={user?.displayName}
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
                value={user?.email}
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
