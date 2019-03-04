import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';

import { BASE_API_URL } from '../constant';

export default axios.create({
  baseURL: BASE_API_URL,
  transformResponse: [
    data => {
      let jsonData = typeof data === 'string' ? JSON.parse(data) : data;
      return camelcaseKeys(jsonData, { deep: true });
    }
  ]
});
