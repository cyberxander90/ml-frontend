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
    const { data: { items, categories } } = await api.get(`/items?${query}`);

    console.log(`searchTerm: ${searchTerm}, stateSearchTerm: ${getState()}`)
    console.log(getState().products.searchTerm);
    dispatch({
      type: TYPES.FETCH_PRODUCTS,
      payload: {
        products: items,
        categories,
        searchTerm,
        id
      }
    });
  };

export const findProduct = productId => async (dispatch, getState, api) => {
  const id = shortId.generate();

  dispatch({
    type: TYPES.LOADING_PRODUCTS,
    payload: { searchTerm: '', id }
  });

  const {
    data: { item, categories }
  } = await api.get(`/item/${productId}`);
  dispatch({
    type: TYPES.FIND_PRODUCT,
    payload: {
      selectedProduct: item,
      categories,
      id
    }
  });
};
