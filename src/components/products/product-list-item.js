import React from 'react';
import PropTypes from 'prop-types';
import { Image, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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

function ProductListItem({
  id,
  title,
  picture,
  price,
  location,
  freeShipping
}) {
  const linkTo = `/item/${id}`;
  return (
    <div className="product-list-item">
      <Row>
        <Col xs={12} sm={10} className="flex">
          <Link to={linkTo}>
            <Image
              src={picture}
              alt={title}
              className="product-list-item__image"
            />
          </Link>
          <div>
            <span className="product-list-item__price">
              {price.currency}
              {price.amount}
              {freeShipping && <Image src="/assets/free-shipping.png" />}
            </span>
            <Link to={linkTo}>
              <span className="">{title}</span>
            </Link>
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
