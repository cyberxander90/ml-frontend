import _ from 'lodash';
import * as TYPES from 'actions/types';

const initialState = {
  categories: [],
  allProducts: {},
  currentProduct: null
};

export default function(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case TYPES.FETCH_PRODUCTS:
      return {
        ...state,
        categories: action.payload.categories,
        allProducts: {
          ...state.allProducts,
          ..._.mapKeys(action.payload.products, 'id')
        }
      };
    case TYPES.FIND_PRODUCT:
      return {
        ...state,
        categories: action.payload.categories,
        allProducts: {
          ...state.allProducts,
          [action.payload.product.id]: action.payload.product
        },
        currentProduct: action.payload.product
      };
    default:
      return state;
  }
}
