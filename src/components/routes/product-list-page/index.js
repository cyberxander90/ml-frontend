import React from 'react';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';
import queryString from 'query-string';
import _ from 'lodash';
import { fetchProducts } from 'actions/products';
import { LIMIT_RESULTS } from 'constant';
import ProductList from 'components/products/product-list';
import Breadcrumb from 'components/breadcrumb';
import Page from 'components/page';

const frontload = async props => {
  const query = queryString.parse(props.location.search);
  if (query.search == props.searchTerm) {
    return;
  }
  await props.fetchProducts(query.search);
};

function ProductListPage({ products, categories, isLoading, searchTerm }) {
  if (isLoading) {
    return null;
  }

  return (
    <Page title={`Encuentra ${searchTerm} en Mercado Libre`}>
      <Breadcrumb items={categories} />
      <ProductList products={products} />
    </Page>
  );
}

export default connect(
  ({ products }) => {
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
    onMount: true,
    onUpdate: false
  })(ProductListPage)
);
