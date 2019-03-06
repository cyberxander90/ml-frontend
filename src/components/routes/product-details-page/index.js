import React from 'react';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';
import Col from 'react-bootstrap/Col';
import { findProduct } from 'actions/products';
import ProductDetails from 'components/products/product-details';
import Breadcrumb from 'components/breadcrumb';
import Page from 'components/page';
import Error from 'components/error';

const frontload = async props => await props.findProduct(props.match.params.id);

function ProductDetailsPage({ product, categories, error }) {
  let content,
    title,
    description,
    image = null;

  if (error) {
    content = <Error status={error.status} message={error.message} />;
  } else if (product) {
    content = (
      <React.Fragment>
        <Breadcrumb items={categories} />
        <Col>
          <ProductDetails {...product} />
        </Col>
      </React.Fragment>
    );
    title = product.title;
    description = product.description;
    image = product.picture;
  }

  return (
    <Page title={title} description={description} image={image}>
      {content}
    </Page>
  );
}

export default connect(
  (
    { products: { selectedProduct, products, categories, error } },
    ownProps
  ) => ({
    categories,
    product: selectedProduct || products[ownProps.match.params.id],
    error
  }),
  { findProduct }
)(
  frontloadConnect(frontload, {
    onMount: true,
    onUpdate: false
  })(ProductDetailsPage)
);
