import store from 'store';
import _ from 'lodash';

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
  return _.takeRight(_.sortBy(products, ['visits']), limit).reverse();
};

export const getLastViewProducts = (limit = 3) => {
  const products = Object.values(store.get('products') || {});
  return _.takeRight(_.sortBy(products, ['lastVisit']), limit).reverse();
};
