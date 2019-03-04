import axios from 'axios';

import {
  BASE_API_URL
} from '../constant';

export default axios.create({
  baseURL: BASE_API_URL
});