import axios from "axios";
import React from "react";

const useAxiosBase = () => {
  const axiosBase = axios.create({
    baseURL: "https://b2b-server-five.vercel.app",
  });
  return axiosBase;
};

export default useAxiosBase;
