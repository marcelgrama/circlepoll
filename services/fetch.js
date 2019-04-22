import axios from 'axios';
import Router from 'next/router';
import config from '../config/client';
import { setGeneralError } from '../actions/error';
import { signOut } from '../actions/user';
import store from '../store/';
import { setEndpointLoading, removeEndpointLoading } from '../actions/fetch';

const endpointFromUrl = url => url.replace(config.apiBaseURL, '/');

const axiosInstance = axios.create({
  baseURL: config.apiBaseURL,
  headers: { 'Content-Type': 'application/json' }
});

// Add a request interceptor
axiosInstance.interceptors.request.use(reqConfig => {
  // Do something before request is sent
  store.dispatch(setEndpointLoading(reqConfig.url));
  return reqConfig;
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  response => {
    // Do something with response data
    const endpoint = endpointFromUrl(response.config.url);
    store.dispatch(removeEndpointLoading(endpoint));
    if (response.data.authTokenError) {
      Router.push('/signin');
      store.dispatch(signOut());
      store.dispatch(setGeneralError('Your session has expired'));
      return Promise.reject(new Error('Invalid AuthToken!'));
    }
    return response;
  },
  error => {
    let errorMsg = '';
    const { status } = error.response;
    if (status >= 500) {
      errorMsg = `${status} - Server error`;
    }
    if (status >= 400 && status < 500) {
      errorMsg = `${status} - Network error`;
    }
    store.dispatch(setGeneralError(errorMsg));
    const endpoint = endpointFromUrl(error.response.config.url);
    store.dispatch(removeEndpointLoading(endpoint));
    return Promise.reject(error);
  }
);
export default axiosInstance;
