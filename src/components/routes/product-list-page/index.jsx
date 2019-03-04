import React from 'react';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';
import queryString from 'query-string';
import _ from 'lodash';
import { fetchProducts } from 'actions/products';
import { LIMIT_RESULTS } from 'constant';
import ProductList from 'components/products/product-list';
import Breadcrumb from 'components/breadcrumb';

const frontload = async props => {
  const query = queryString.parse(props.location.search);
  return await props.fetchProducts(query.search);
};

function ProductListPage({ products, categories }) {
  return (
    <div>
      <h1>ProductListPage</h1>
      <Breadcrumb items={categories} />
      <ProductList products={products || []} />
    </div>
  );
}

export default connect(
  state => {
    console.log(state);
    return {
      products: _.take(Object.values(state.products.allProducts), LIMIT_RESULTS)
    };
  },
  { fetchProducts }
)(
  frontloadConnect(frontload, {
    onMount: true,
    onUpdate: false
  })(ProductListPage)
);
