import _ from 'lodash';
import * as TYPES from 'actions/types';
import { setVisitProduct } from 'services/products';

const initialState = {
  categories: [],
  products: {},
  selectedProduct: null,
  isLoading: false,
  searchTerm: '',
  id: null,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TYPES.FAIL_LOADING_PRODUCTS:
      if (state.id != action.payload.id) {
        return state;
      }
      return {
        ...state,
        ...action.payload,
        isLoading: false
      };

    case TYPES.LOADING_PRODUCTS:
      return {
        ...state,
        ...action.payload,
        categories: [],
        isLoading: true,
        error: null
      };

    case TYPES.FETCH_PRODUCTS:
      if (state.id != action.payload.id) {
        return state;
      }

      return {
        ...state,
        ...action.payload,
        selectedProduct: null,
        isLoading: false,
        products: _.mapKeys(action.payload.products, 'id')
      };

    case TYPES.FIND_PRODUCT:
      if (state.id != action.payload.id) {
        return state;
      }
      setVisitProduct(action.payload.selectedProduct);

      return {
        ...state,
        ...action.payload,
        products: [],
        isLoading: false,
        searchTerm: ''
      };

    default:
      return state;
  }
}
