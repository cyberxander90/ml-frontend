import React from 'react';
import Page from 'components/page';

import { getTopViewProducts, getLastViewProducts } from 'services/products';
import ProductCardList from 'components/products/product-card-list';

function HomePage() {
  const topViewProducts = getTopViewProducts();
  const lastViewProducts = getLastViewProducts();

  return (
    <Page>
      <h1 className="header-home">
        La comunidad de compra y venta online más grande de América Latina.
      </h1>
      <ProductCardList
        title="Ultimos productos vistos"
        products={lastViewProducts}
      />
      <ProductCardList
        title="Los productos mas visitados"
        products={topViewProducts}
      />
    </Page>
  );
}

export default HomePage;
