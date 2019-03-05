import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

import './product-card.scss';

function ProductCard({ id, title, picture }) {
  return (
    <Link to={`/item/${id}`} className="product-link">
      <Card className="product-card">
        <Card.Img variant="top" src={picture} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default ProductCard;
