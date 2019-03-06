import qs from 'qs';
import * as TYPES from 'actions/types';
import { LIMIT_RESULTS } from 'constant';
import shortId from 'shortid';

// prettier-ignore
export const fetchProducts = (searchTerm, limit = LIMIT_RESULTS) =>
  async (dispatch, getState, { api, handleError }) => {
    const id = shortId.generate();

    dispatch({
      type: TYPES.LOADING_PRODUCTS,
      payload: { searchTerm, id }
    });

    let response = null;    
    try {
      const query = qs.stringify({ q: searchTerm, limit });
      response = await api.get(`/items?${query}`);
    } catch (error) {
      dispatch({
        type: TYPES.FAIL_LOADING_PRODUCTS,
        payload: {
          error: handleError(error),
          id
        }
      });
    }

    if (response) {
      const { data: { items, categories } } = response;
      dispatch({
        type: TYPES.FETCH_PRODUCTS,
        payload: {
          products: items,
          categories,
          searchTerm,
          id
        }
      });
    }    
  };

// prettier-ignore
export const findProduct = productId => async (dispatch, getState, { api, handleError }) => {
  const id = shortId.generate();

  dispatch({
    type: TYPES.LOADING_PRODUCTS,
    payload: { searchTerm: '', id }
  });

  let response = null;
  try {
    response = await api.get(`/item/${productId}`)
  } catch (error) {
    dispatch({
      type: TYPES.FAIL_LOADING_PRODUCTS,
      payload: {
        id,
        error: handleError(error)
      }
    });
  }

  if (response) {
    const { data: { item, categories } } = response ;
    dispatch({
      type: TYPES.FIND_PRODUCT,
      payload: {
        selectedProduct: item,
        categories,
        id
      }
    });
  }
};
