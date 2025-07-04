import React, { useContext, useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import axios from "axios";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAxios from "../Hooks/useAxios";
import Loading from "../Components/Loading";
import { ThemeContext } from "../Context/ThemeContext";
const Cart = () => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const axiosInstance = useAxios();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { darkMode } = useContext(ThemeContext);
  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`https://b2b-server-five.vercel.app/cart?email=${user.email}`)
      .then((res) => {
        setCart(res.data);
      })
      .finally(() => {
        setLoading(false);
      });

    axios
      .get(`https://b2b-server-five.vercel.app/categories`)
      .then((res) => setCategories(res.data));
  }, []);

  const handleRemoveFromCart = (id) => {
    Swal.fire({
      title: "Do you want to delete this group ?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://b2b-server-five.vercel.app/delete-cart/${id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              const newCart = cart.filter((cartData) => cartData._id != id);
              setCart(newCart);
            }
          });
      }
    });
  };

  return loading ? (
    <Loading></Loading>
  ) : (
    <>
      <title>Cart</title>
      <div className="max-w-5xl mx-auto space-y-5 my-10 px-5 lg:px-0">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        {cart.length > 0 ? (
          cart.map((cartInfo) => (
            <div
              key={cartInfo._id}
              className={`sm:flex gap-5 items-center shadow p-5 border-3 border-primary border-dashed rounded   ${
                darkMode === true ? "bg-gray-800 text-white" : "bg-slate-100"
              }`}>
              <img
                className="w-[250px] h-[250px] rounded shadow"
                src={cartInfo.image_url}
                alt=""
              />
              <div className="space-y-1">
                <h2 className="text-2xl">{cartInfo.product_name}</h2>
                <p className="text-xl">
                  Category :{" "}
                  {
                    categories.find((cat) => cat?.slug === cartInfo.category)
                      ?.name
                  }
                </p>
                <p
                  className={`${
                    darkMode === true ? "text-slate-300" : "text-slate-600"
                  }`}>
                  Date :{" "}
                  {cartInfo.date &&
                    new Date(cartInfo?.date).toISOString().slice(0, 10)}
                  {}
                </p>
                <p>Purchase Quantity : {cartInfo?.quantity} units</p>
                <p>Description : {cartInfo?.short_description}</p>

                <div className="space-x-3">
                  <Link to={`/product/${cartInfo.product_id}`}>
                    <button className="btn bg-primary text-white hover:bg-blue-950 rounded border-0">
                      Product details
                    </button>
                  </Link>

                  <button
                    onClick={() => handleRemoveFromCart(cartInfo?._id)}
                    className="btn bg-red-600 text-white hover:bg-blue-950 rounded border-0">
                    Remove Product
                  </button>

                  <Link to={`/payment/${cartInfo?._id}`}>
                    <button className="btn bg-green-700 text-white hover:bg-blue-950 rounded border-0">
                      Pay now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-[300px] ">
            <div className="text-center space-y-5">
              <h1 className="text-3xl">
                You Dont have any product on your cart
              </h1>
              <Link
                className="btn btn-primary text-white border-none"
                to={"/products"}>
                Shop Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
