import axios from 'axios';

const axiosPublic = axios.create({
    baseURL: 'https://hostel-management-server-eight.vercel.app',
  });
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;// Updated
