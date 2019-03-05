import React from 'react';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';
import { Col } from 'react-bootstrap';
import { findProduct } from 'actions/products';
import ProductDetails from 'components/products/product-details';
import Breadcrumb from 'components/breadcrumb';
import Page from 'components/page';

const frontload = async props => {
  const product = await props.findProduct(props.match.params.id);
};

function ProductDetailsPage({ product, categories }) {
  if (!product) {
    return null;
  }
  return (
    <Page title={product.title} description={product.description}>
      <Breadcrumb items={categories} />
      <Col>
        <ProductDetails {...(product ? product : {})} />
      </Col>
    </Page>
  );
}

export default connect(
  ({ products }, ownProps) => ({
    categories: products.categories,
    product:
      products.selectedProduct || products.products[ownProps.match.params.id]
  }),
  { findProduct }
)(
  frontloadConnect(frontload, {
    onMount: true,
    onUpdate: false
  })(ProductDetailsPage)
);
