import Axios from 'axios';

const axiosInstance = Axios.create({
  baseURL: 'http://54.160.32.186/api',
});

module.exports = axiosInstance;
