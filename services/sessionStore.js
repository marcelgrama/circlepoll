import fetch from './fetch';

let memoryToken = '';

export const getAuthToken = () => {
  try {
    const token = localStorage.getItem('circlepoll_auth_token');
    return token || memoryToken;
  } catch (err) {
    return memoryToken;
  }
};

export const setAuthToken = token => {
  try {
    fetch.defaults.headers.common['X-Auth-Token'] = token;
    localStorage.setItem('circlepoll_auth_token', token);
  } catch (err) {
    memoryToken = token;
  }
};

fetch.defaults.headers.common['X-Auth-Token'] = getAuthToken();
