import qs from 'qs';

import api from 'apis/api';
import {
  LIMIT_RESULTS
} from 'constant';



export const searchProducts = (searchTerm, limit = LIMIT_RESULTS) => {
  const query = qs.stringify({
    q: searchTerm,
    limit
  });
  return api.get(`/items?${query}`);
}

export const findProduct = (productId) =>
  api.get(`/item/${productId}`);