import axios from "axios";
// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../providers/AuthProvider";

const axiosSecure = axios.create({
    baseURL: 'https://hostel-management-server-eight.vercel.app',
  });
  const useAxiosSecure = () => {
      return axiosSecure;
  };

export default useAxiosSecure;// Updated
