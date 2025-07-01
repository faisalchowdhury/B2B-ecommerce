import React from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAxios from '../../Hooks/useAxios';


const Checkout = () => {
  const stripe = useStripe();
  console.log(stripe)
  const elements = useElements();
  console.log(elements)
  const axiosIns = useAxios();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    // Create PaymentIntent on your backend and get clientSecret
    const { data } = await axiosIns.post("/create-payment-intent", {
      amount: 2000, // in cents ($20.00)
    });

    const clientSecret = data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      console.error(result.error.message);
      alert(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        console.log("Payment Successful!", result.paymentIntent);
        alert("Payment Successful!");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-4 shadow rounded bg-white">
      <CardElement />
      <button
        type="submit"
        disabled={!stripe}
        className="mt-4 w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
      >
        Pay
      </button>
    </form>
  );
};

export default Checkout;
