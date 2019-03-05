import React from 'react';

import './product-list.scss';
import ProductListItem from 'components/products/product-list-item';
import EmptyResults from 'components/empty-results';

const defaultProps = {
  products: []
};

function ProductList({ products }) {
  return (
    <ul className="product-list">
      {products.length > 0 ? (
        products.map(product => (
          <li className="product-list__item" key={product.id}>
            <ProductListItem {...product} />
          </li>
        ))
      ) : (
        <li>
          <EmptyResults />
        </li>
      )}
    </ul>
  );
}

ProductList.defaultProps = defaultProps;

export default ProductList;
