import _ from 'lodash';
import * as TYPES from 'actions/types';

const initialState = {
  categories: [],
  products: {},
  selectedProduct: null,
  isLoading: true,
  searchTerm: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TYPES.LOADING_PRODUCTS:
      return {
        ...state,
        categories: [],
        isLoading: true,
        searchTerm: action.payload.searchTerm
      };
    case TYPES.FETCH_PRODUCTS:
      return {
        ...state,
        categories: action.payload.categories,
        products: _.mapKeys(action.payload.products, 'id'),
        selectedProduct: null,
        isLoading: false,
        searchTerm: action.payload.searchTerm
      };
    case TYPES.FIND_PRODUCT:
      return {
        ...state,
        categories: action.payload.categories,
        products: [],
        selectedProduct: action.payload.product,
        isLoading: false,
        searchTerm: ''
      };
    default:
      return state;
  }
}
