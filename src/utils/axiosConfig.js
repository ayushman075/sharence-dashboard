import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://sharence-server.onrender.com/api/v1/',
  timeout: 500000, 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});



export default axiosInstance;
