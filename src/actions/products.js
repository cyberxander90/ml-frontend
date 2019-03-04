import qs from 'qs';
import * as TYPES from 'actions/types';
import { LIMIT_RESULTS } from 'constant';

// prettier-ignore
export const fetchProducts = (searchTerm, limit = LIMIT_RESULTS) =>
  async (dispatch, getState, api) => {
    dispatch({
      type: TYPES.LOADING_PRODUCTS,
      payload: { searchTerm }
    });

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
        categories,
        searchTerm
      }
    });
  };

export const findProduct = productId => async (dispatch, getState, api) => {
  dispatch({
    type: TYPES.LOADING_PRODUCTS,
    payload: { searchTerm: '' }
  });

  const { data } = await api.get(`/item/${productId}`);
  const { item, categories } = data;
  dispatch({
    type: TYPES.FIND_PRODUCT,
    payload: {
      product: item,
      categories
    }
  });
};
