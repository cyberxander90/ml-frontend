import React from 'react';
import ProductCard from 'components/products/product-card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './product-card-list.scss';

function ProductCardList({ title, products }) {
  if (products.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="product-card-list__title">{title}</h2>
      <Row>
        {products.map(product => (
          <Col xs={12} sm={4} key={product.id}>
            <ProductCard {...product} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default React.memo(ProductCardList);
