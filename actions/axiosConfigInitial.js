import Axios from 'axios';

const axiosInstance = Axios.create({
  baseURL: '/api',
});

module.exports = axiosInstance;
