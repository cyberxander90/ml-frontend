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
  if (query.search == props.searchTerm) {
    return;
  }
  return await props.fetchProducts(query.search);
};

function ProductListPage({ products, categories, isLoading }) {
  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <h1>ProductListPage</h1>
      <Breadcrumb items={categories} />
      <ProductList products={products} />
    </div>
  );
}

export default connect(
  ({ products }) => {
    console.log('hhhhh');
    return {
      isLoading: products.isLoading,
      categories: products.categories,
      products: _.take(Object.values(products.products), LIMIT_RESULTS),
      searchTerm: products.searchTerm
    };
  },
  { fetchProducts }
)(
  frontloadConnect(frontload, {
    // onMount: true,
    // onUpdate: true
  })(ProductListPage)
);
