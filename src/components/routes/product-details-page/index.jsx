import React from 'react';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';
import { findProduct } from 'actions/products';
import ProductList from 'components/products/product-list';
import Breadcrumb from 'components/breadcrumb';

const frontload = async props => {
  return await props.findProduct(props.productId);
};

function ProductDetailsPage({ product, categories }) {
  return (
    <div>
      <h1>ProductListPage</h1>
      <Breadcrumb items={categories} />
      <ProductList products={product ? [product] : []} />
    </div>
  );
}

export default connect(
  (state, ownProps) => {
    console.log(ownProps);
    const result = {
      productId: ownProps.match.params.id,
      product: state.products.allProducts[ownProps.match.params.id]
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
