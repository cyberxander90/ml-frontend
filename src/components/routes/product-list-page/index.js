import React from 'react';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';
import queryString from 'query-string';
import take from 'lodash/take';
import { fetchProducts } from 'actions/products';
import { LIMIT_RESULTS } from 'constant';
import ProductList from 'components/products/product-list';
import Breadcrumb from 'components/breadcrumb';
import Page from 'components/page';
import { Translate } from 'react-localize-redux';
import Error from 'components/error';

const frontload = async props => {
  const query = queryString.parse(props.location.search);
  if (query.search === props.searchTerm) {
    return;
  }
  await props.fetchProducts(query.search);
};

function ProductListPage({
  products,
  categories,
  isLoading,
  searchTerm,
  error
}) {
  if (isLoading) {
    return null;
  }

  if (error) {
    return <Error status={error.status} message={error.message} />;
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
  ({ products: { isLoading, categories, products, searchTerm, error } }) => ({
    isLoading: isLoading,
    categories: categories,
    products: take(Object.values(products), LIMIT_RESULTS),
    searchTerm: searchTerm,
    error
  }),
  { fetchProducts }
)(
  frontloadConnect(frontload, {
    onMount: true,
    onUpdate: false
  })(ProductListPage)
);
