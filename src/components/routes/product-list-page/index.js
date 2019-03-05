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
import { Translate } from 'react-localize-redux';

const frontload = async props => {
  const query = queryString.parse(props.location.search);
  if (query.search === props.searchTerm) {
    return;
  }
  await props.fetchProducts(query.search);
};

function ProductListPage({ products, categories, isLoading, searchTerm }) {
  if (isLoading) {
    return null;
  }

  return (
    <Translate>
      {({ translate }) => (
        <Page title={translate('product.title', { value: searchTerm })}>
          <Breadcrumb items={categories} />
          <ProductList products={products} />
        </Page>
      )}
    </Translate>
  );
}

export default connect(
  ({ products: { isLoading, categories, products, searchTerm } }) => ({
    isLoading: isLoading,
    categories: categories,
    products: _.take(Object.values(products), LIMIT_RESULTS),
    searchTerm: searchTerm
  }),
  { fetchProducts }
)(
  frontloadConnect(frontload, {
    onMount: true,
    onUpdate: false
  })(ProductListPage)
);
