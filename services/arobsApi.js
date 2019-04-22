import axios from 'axios';
import config from '../config/server';

const axiosInstance = axios.create({
  baseURL: config.arobsApiBase,
  headers: { 'Content-Type': 'application/json' }
});

export default axiosInstance;
