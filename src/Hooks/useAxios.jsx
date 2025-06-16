import axios from "axios";
import React from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const useAxios = () => {
  const { user } = useAuth();
  const axiosInstance = axios.create({
    baseURL: "https://b2b-server-five.vercel.app",
    headers: { "user-email": user?.email },
    withCredentials: true,
  });

  const navigate = useNavigate();
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (err) => {
      if (err.status === 401 || err.status === 403) {
        return navigate("/login");
      }
    }
  );

  return axiosInstance;
};

export default useAxios;
