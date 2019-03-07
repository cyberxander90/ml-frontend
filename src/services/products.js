import store from 'store';
import takeRight from 'lodash/takeRight';
import sortBy from 'lodash/sortBy';
import axios from 'axios';
import qs from 'qs/';

export const setVisitProduct = product => {
  const products = store.get('products') || {};
  products[product.id] = products[product.id] || {
    id: product.id,
    visits: 0,
    title: product.title,
    picture: product.picture
  };
  products[product.id].visits++;
  products[product.id].lastVisit = Date.now();
  store.set('products', products);
};

export const getTopViewProducts = (limit = 3) => {
  const products = Object.values(store.get('products') || {});
  return takeRight(sortBy(products, ['visits']), limit).reverse();
};

export const getLastViewProducts = (limit = 3) => {
  const products = Object.values(store.get('products') || {});
  return takeRight(sortBy(products, ['lastVisit']), limit).reverse();
};

export const getProductOptions = (searchTerm, limit = 6) => {
  const query = qs.stringify({ q: searchTerm, limit });
  return axios.get(
    `https://http2.mlstatic.com/resources/sites/MLU/autosuggest?&api_version=2&${query}`
  );
};
