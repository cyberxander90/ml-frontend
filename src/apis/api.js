import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';

import { handleAxiosError } from 'services/helpers';
import { BASE_API_URL } from '../constant';

const transform = data => {
  return data && typeof data === 'object'
    ? camelcaseKeys(data, { deep: true })
    : data;
};

const api = axios.create({
  baseURL: BASE_API_URL
});

// add a response interceptor
api.interceptors.response.use(response => {
  response.data = transform(response.data);
  return response;
});

export const handleError = handleAxiosError;
export default api;
