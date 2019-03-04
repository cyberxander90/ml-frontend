import qs from 'qs';
import * as TYPES from 'actions/types';
import { LIMIT_RESULTS } from 'constant';

// prettier-ignore
export const fetchProducts = (searchTerm, limit = LIMIT_RESULTS) =>
  async (dispatch, getState, api) => {
    const query = qs.stringify({
      q: searchTerm,
      limit
    });
    const { data } = await api.get(`/items?${query}`);
    const { items, categories } = data;
    dispatch({
      type: TYPES.FETCH_PRODUCTS,
      payload: {
        products: items,
        categories
      }
    });
  };

export const findProduct = productId => async (dispatch, getState, api) => {
  const { data } = await api.get(`/item/${productId}`);
  const { item, categories } = data;
  console.log(data);
  dispatch({
    type: TYPES.FIND_PRODUCT,
    payload: {
      product: item,
      categories
    }
  });
};
