import React from 'react';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';
import { findProduct } from 'actions/products';
import ProductList from 'components/products/product-list';
import Breadcrumb from 'components/breadcrumb';
import Page from 'components/page';

const frontload = async props => {
  return await props.findProduct(props.match.params.id);
};

function ProductDetailsPage({ isLoading, product, categories }) {
  if (isLoading && !product) {
    return <h1>Loading Prodcut</h1>;
  }
  return (
    <Page title={product.title} description={product.description}>
      <h1>ProductListPage</h1>
      <Breadcrumb items={categories} />
      <ProductList products={product ? [product] : []} />
    </Page>
  );
}

export default connect(
  ({ products }, ownProps) => {
    const result = {
      isLoading: products.isLoading,
      categories: products.categories,
      product:
        products.selectedProduct || products.products[ownProps.match.params.id]
    };
    return result;
  },
  { findProduct }
)(
  frontloadConnect(frontload, {
    onMount: true,
    onUpdate: false
  })(ProductDetailsPage)
);
