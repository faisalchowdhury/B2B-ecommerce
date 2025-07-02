// Payment.jsx

import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../Hooks/useAxios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "../Components/Checkout/Checkout";

const stripePromise = loadStripe(
  "pk_test_51Rg9SKRjZ7l8BlE9V6v58DeVP2TKvUOwwSVee9wrpUTM0DaAx4ow5LHG6S3LtL1cwyZRxG6MS62Nu4DpRANAGN1X00wC7HtsY0"
);

export default function Payment() {
  const { cartId } = useParams();
  const axiosInstance = useAxios();

  const { data, isLoading, error } = useQuery({
    queryKey: ["cart", cartId],
    queryFn: () => axiosInstance.get(`/cart/${cartId}`).then((res) => res.data),
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">Error loading cart data</p>
    );
  if (!data) return <p className="text-center mt-10">No cart data found</p>;

  const cartData = data;

  return (
    <Elements stripe={stripePromise}>
      <Checkout cartData={cartData} />
    </Elements>
  );
}
