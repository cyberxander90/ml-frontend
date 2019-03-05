import qs from 'qs';
import * as TYPES from 'actions/types';
import { LIMIT_RESULTS } from 'constant';
import shortId from 'shortid';

// prettier-ignore
export const fetchProducts = (searchTerm, limit = LIMIT_RESULTS) =>
  async (dispatch, getState, api) => {
    const id = shortId.generate();

    dispatch({
      type: TYPES.LOADING_PRODUCTS,
      payload: { searchTerm, id }
    });

    const query = qs.stringify({ q: searchTerm, limit });
    try {
      const { data: { items, categories } } = await api.get(`/items?${query}`);
      dispatch({
        type: TYPES.FETCH_PRODUCTS,
        payload: {
          products: items,
          categories,
          searchTerm,
          id
        }
      });
    } catch (error) {
      dispatch({
        type: TYPES.FAIL_LOADING_PRODUCTS,
        payload: { error, id }
      });
    }
  };

// prettier-ignore
export const findProduct = productId => async (dispatch, getState, api) => {
  const id = shortId.generate();

  dispatch({
    type: TYPES.LOADING_PRODUCTS,
    payload: { searchTerm: '', id }
  });

  await api.get(`/item/${productId}`)
    .then(response => {
      console.log(response)
      const { data: { item, categories } } = response ;
      return dispatch({
        type: TYPES.FIND_PRODUCT,
        payload: {
          selectedProduct: item,
          categories,
          id
        }
      });
    })
    .catch(error => {
      console.log(error)
      return dispatch({
        type: TYPES.FAIL_LOADING_PRODUCTS,
        payload: { error, id }
      });
    })
};
