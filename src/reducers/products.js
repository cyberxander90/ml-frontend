import _ from 'lodash';
import * as TYPES from 'actions/types';

const initialState = {
  categories: [],
  products: {},
  selectedProduct: null,
  isLoading: false,
  searchTerm: '',
  id: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TYPES.LOADING_PRODUCTS:
      return {
        ...state,
        ...action.payload,
        categories: [],
        isLoading: true
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
