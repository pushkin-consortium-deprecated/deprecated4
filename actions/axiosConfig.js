import Axios from 'axios';

const axiosInstance = Axios.create({
  baseURL: 'http://localhost/api',
});

module.exports = axiosInstance;
