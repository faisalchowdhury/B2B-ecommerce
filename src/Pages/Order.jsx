// Orders.jsx

import React, { useContext, useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import useAxios from "../Hooks/useAxios";
import { Link } from "react-router";
import Loading from "../Components/Loading";
import { ThemeContext } from "../Context/ThemeContext";

export default function Orders() {
  const axiosInstance = useAxios();
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
  const { darkMode } = useContext(ThemeContext);
  const { data, isLoading, error } = useQuery({
    queryKey: ["user-orders"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/my-orders?email=${user.email}`
      );
      return response.data;
    },
  });

  useEffect(() => {
    if (data) {
      setOrders(data);
    }
  }, [data]);

  if (isLoading) return <Loading></Loading>;
  if (error)
    return (
      <p className="text-center p-4 min-h-full text-red-500">
        Error loading orders
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>

      {orders.length === 0 ? (
        <div className="flex items-center justify-center h-[300px] ">
          <div className="text-center space-y-5">
            <h1 className="text-3xl">You haven't place any order yet !</h1>
            <Link
              className="btn btn-primary text-white border-none"
              to={"/products"}>
              Shop Now
            </Link>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table
            className={`min-w-full  border-gray-200 rounded-lg overflow-hidden ${
              darkMode === true ? "bg-gray-700 text-white" : "bg-slate-100"
            }`}>
            <thead
              className={`${
                darkMode === true ? "bg-gray-700 text-white" : "bg-slate-100"
              }`}>
              <tr>
                <th className="text-left p-3 border-b">#</th>
                <th className="text-left p-3 border-b">Product</th>
                <th className="text-left p-3 border-b">Quantity</th>
                <th className="text-left p-3 border-b">Price</th>
                <th className="text-left p-3 border-b">Order Date</th>
                <th className="text-left p-3 border-b">Paid Amount</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id} className="hover:bg-gray-400">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3 flex items-center gap-2">
                    <img
                      src={order?.image_url}
                      alt={order?.product_name}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <span>{order?.product_name}</span>
                  </td>
                  <td className="p-3">{order?.quantity}</td>
                  <td className="p-3">Tk{order?.price?.toFixed(2)}</td>

                  <td className="p-3">
                    {new Date(order.order_date).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    Tk
                    {(
                      parseFloat(order?.price) * parseInt(order?.quantity)
                    ).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
