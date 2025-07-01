import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaHome, FaPhone, FaRegCreditCard } from 'react-icons/fa';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../Hooks/useAxios';
export default function Payment() {

 const [formData, setFormData] = useState({
  name: "",
  email: "",
  address: "",
  phone: ""
});
  const {cartId} = useParams();
  const axiosInstance = useAxios()
  const {data, error} = useQuery({
    queryKey : ['cart' ,cartId ],
    queryFn : () =>  axiosInstance.get(`/cart/${cartId}`)
  })
    
  const cartData = data?.data; 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting:', formData);
    alert('Payment submitted successfully!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-3 w-full max-w-6xl overflow-hidden">

        {/* Left: Product Card */}
        <div className="md:col-span-1 flex items-center justify-center p-4">
          <div className="flex bg-white rounded-xl shadow p-4 w-full">
            <img src={cartData?.image_url} alt="Product" className="rounded-lg object-cover w-28 h-28 mr-4" />
            <div className="flex flex-col justify-between">
              <h2 className="text-lg font-semibold">{cartData?.product_name}</h2>
              <p className="text-gray-500 text-sm">Quantity: {cartData?.quantity}</p>
              
              <p className="text-indigo-600 ">Price {cartData?.price} Tk</p>
              <p>Total {cartData?.price} x {cartData?.quantity} = {(parseFloat(cartData?.price)*parseFloat(cartData?.quantity)).toFixed(2)} </p>
            </div>
          </div>
        </div>

        {/* Right: Checkout Form */}
        <form onSubmit={handleSubmit} className="md:col-span-2 p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <h2 className="text-2xl font-bold md:col-span-2 mb-2">Checkout</h2>

          <div className="flex items-center border rounded-lg overflow-hidden shadow-sm">
            <FaUser className="mx-3 text-gray-500" />
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-3 outline-none" required />
          </div>

          <div className="flex items-center border rounded-lg overflow-hidden shadow-sm">
            <FaEnvelope className="mx-3 text-gray-500" />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-3 outline-none" required />
          </div>

          <div className="flex items-center border rounded-lg overflow-hidden shadow-sm">
            <FaHome className="mx-3 text-gray-500" />
            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full p-3 outline-none" required />
          </div>

         

          <div className="flex items-center border rounded-lg overflow-hidden shadow-sm">
            <FaPhone className="mx-3 text-gray-500" />
            <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full p-3 outline-none" required />
          </div>

          <div className="md:col-span-2">
            <button type="submit" className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition">Submit Payment</button>
          </div>
        </form>
      </div>
    </div>
  );
}