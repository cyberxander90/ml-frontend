import React from 'react';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { Translate } from 'react-localize-redux';

import './product-details.scss';
import Price from 'components/price';

const isNew = condition => condition === 'new';
const isPlural = n => n !== 1;

function ProductDetails({
  picture,
  condition,
  soldQuantity,
  title,
  price,
  freeShipping,
  description
}) {
  return (
    <Row className="product-details">
      <Col sm={12} md={8}>
        <Image className="product-details__image" src={picture} />
      </Col>
      <Col sm={12} md={4}>
        <span className="product-details__condition">
          {isNew(condition) && <Translate id="new" />}
          {` ${soldQuantity} `}
          <Translate
            id={isPlural(soldQuantity) ? 'sold.plural' : 'sold.singular'}
          />
        </span>
        <h1 className="product-details__title">{title}</h1>
        <Price
          className="product-details__price"
          {...price}
          freeShipping={freeShipping}
        />
        <Button className="product-details__buy">
          <Translate id="buy" />
        </Button>
      </Col>
      <Col xs={12}>
        <h2 className="product-details__header-description">
          <Translate id="product.description" />
        </h2>
        <p className="product-details__description">{description}</p>
      </Col>
    </Row>
  );
}

export default React.memo(ProductDetails);
