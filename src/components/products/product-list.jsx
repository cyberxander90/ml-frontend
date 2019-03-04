import React from 'react';
import { connect } from 'react-redux';

import './product-list.scss';
import ProductListItem from 'components/products/product-list-item';
import EmptyResults from 'components/empty-results';
import { fetchProducts } from 'actions/products';

class ProductList extends React.Component {
  constructor() {
    super(...arguments);

    this.state = {
      products: [
        {
          id: 1,
          name: 'hola',
          description: 'este esta buenisimo',
          imageUrl:
            'http://mla-s2-p.mlstatic.com/871062-MLA28229293206_092018-I.jpg',
          location: 'Habana',
          price: 120,
          isFreeShipping: true
        },
        {
          id: 2,
          name: 'hola',
          description: 'este esta buenisimo',
          imageUrl:
            'http://mla-s2-p.mlstatic.com/871062-MLA28229293206_092018-I.jpg',
          location: 'Habana',
          price: 120,
          isFreeShipping: false
        }
      ]
    };
  }

  componentDidMount() {
    const { fetchProducts } = this.props;
    fetchProducts('mochila');
  }

  render() {
    const { products } = this.state;

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
}

export default connect(
  null,
  {
    fetchProducts
  }
)(ProductList);
