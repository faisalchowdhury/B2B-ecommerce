// Checkout.jsx

import React, { useState } from "react";
import { FaUser, FaEnvelope, FaHome, FaPhone } from "react-icons/fa";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

export default function Checkout({ cartData }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const stripe = useStripe();
  const elements = useElements();
  const axiosInstance = useAxios();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      alert("Stripe not loaded yet. Please try again.");
      return;
    }

    try {
      setLoading(true);

      const { data } = await axiosInstance.post("/create-payment-intent", {
        amount:
          parseFloat(cartData?.price * parseInt(cartData?.quantity)).toFixed(
            2
          ) * 100, // cents
      });

      const clientSecret = data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: formData.name,
            email: formData.email,
            address: { line1: formData.address },
            phone: formData.phone,
          },
        },
      });

      if (result.error) {
        console.error(result.error.message);
        alert(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          console.log("Payment Successful!", result.paymentIntent);

          const order = await axiosInstance.post("/add-order", {
            product_id: cartData.product_id,
            order_date: new Date().toISOString(),
            user: user.displayName,
            user_email: user.email,
            quantity: cartData.quantity,
          });

          if (order?.data?.insertedId) {
            const removeFromCart = await axiosInstance.delete(
              `/remove-from-cart/${cartData._id}`
            );

            if (removeFromCart?.data?.deletedCount) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Your order has been successfully placed",
                showConfirmButton: false,
                timer: 3000,
              });
              navigate("/my-orders");
            }
          }
        }
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100  py-10">
      <div className="bg-white rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-3 w-full max-w-6xl overflow-hidden">
        {/* Left: Product Card */}
        <div className="md:col-span-1 flex items-center justify-center p-4">
          <div className="flex bg-white rounded-xl shadow p-4 w-full">
            <img
              src={cartData?.image_url}
              alt="Product"
              className="rounded-lg object-cover w-28 h-28 mr-4"
            />
            <div className="flex flex-col justify-between">
              <h2 className="text-lg font-semibold">
                {cartData?.product_name}
              </h2>
              <p className="text-gray-500 text-sm">
                Quantity: {cartData?.quantity}
              </p>
              <p className="text-indigo-600">Price: {cartData?.price} Tk</p>
              <p>
                Total: {cartData?.price} x {cartData?.quantity} ={" "}
                {(
                  parseFloat(cartData?.price) * parseFloat(cartData?.quantity)
                ).toFixed(2)}{" "}
                Tk
              </p>
            </div>
          </div>
        </div>

        {/* Right: Checkout Form */}
        <form
          onSubmit={handleSubmit}
          className="md:col-span-2 p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <h2 className="text-2xl font-bold md:col-span-2 mb-2">Checkout</h2>

          <div className="flex items-center border rounded-lg overflow-hidden shadow-sm">
            <FaUser className="mx-3 text-gray-500" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 outline-none"
              required
            />
          </div>

          <div className="flex items-center border rounded-lg overflow-hidden shadow-sm">
            <FaEnvelope className="mx-3 text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 outline-none"
              required
            />
          </div>

          <div className="flex items-center border rounded-lg overflow-hidden shadow-sm">
            <FaHome className="mx-3 text-gray-500" />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 outline-none"
              required
            />
          </div>

          <div className="flex items-center border rounded-lg overflow-hidden shadow-sm">
            <FaPhone className="mx-3 text-gray-500" />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 outline-none"
              required
            />
          </div>

          <div className="md:col-span-2">
            <CardElement className="border rounded p-3" />
            <button
              type="submit"
              disabled={!stripe || loading}
              className="mt-4 w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
              {loading ? "Processing..." : "Pay"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
