import React from 'react';
import PropTypes from 'prop-types';
import { Image, Col, Row } from 'react-bootstrap';

import './product-list-item.scss';

const propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  imageUrl: PropTypes.string.isRequired,
  location: PropTypes.string,
  price: PropTypes.number,
  currencySymbol: PropTypes.string,
  isFreeShipping: PropTypes.bool
};

const defaultProps = {
  description: '',
  location: '',
  price: null,
  isFreeShipping: false,
  currencySymbol: '$'
};

function ProductListItem({
  name,
  description,
  imageUrl,
  location,
  price,
  currencySymbol,
  isFreeShipping
}) {
  return (
    <div className="product-list-item">
      <Row>
        <Col xs={12} sm={10} className="flex">
          <Image
            src={imageUrl}
            alt={name}
            className="product-list-item__image"
          />
          <div>
            <span className="product-list-item__price">
              {currencySymbol}
              {price}
              {isFreeShipping && <Image src="/assets/free-shipping.png" />}
            </span>
            <span className="">{description}</span>
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
