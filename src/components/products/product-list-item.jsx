import React from 'react';
import PropTypes from 'prop-types';
import { Image, Col, Row } from 'react-bootstrap';

import './product-list-item.scss';

const propTypes = {
  title: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  price: PropTypes.shape({
    amount: PropTypes.number,
    currency: PropTypes.string,
    description: PropTypes.string
  }).isRequired,
  location: PropTypes.string,
  freeShipping: PropTypes.bool
};

const defaultProps = {
  location: '',
  freeShipping: false
};

function ProductListItem({ title, picture, price, location, freeShipping }) {
  return (
    <div className="product-list-item">
      <Row>
        <Col xs={12} sm={10} className="flex">
          <Image
            src={picture}
            alt={title}
            className="product-list-item__image"
          />
          <div>
            <span className="product-list-item__price">
              {price.currency}
              {price.amount}
              {freeShipping && <Image src="/assets/free-shipping.png" />}
            </span>
            <span className="">{title}</span>
          </div>
        </Col>
        <Col xs={12} sm={2}>
          <span className="product-list-item__location">{location}</span>
        </Col>
      </Row>
    </div>
  );
}

ProductListItem.propTypes = propTypes;
ProductListItem.defaultProps = defaultProps;

export default ProductListItem;
