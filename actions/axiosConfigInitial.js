import Axios from 'axios';

const axiosInstance = Axios.create({
  baseURL: process.env.NODE_ENV === "production" ? '/api' : '//localhost/api',
});

module.exports = axiosInstance;
