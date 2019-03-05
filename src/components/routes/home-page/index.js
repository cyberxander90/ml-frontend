import React from 'react';
import Page from 'components/page';
import { Translate } from 'react-localize-redux';

import { getTopViewProducts, getLastViewProducts } from 'services/products';
import ProductCardList from 'components/products/product-card-list';

function HomePage() {
  const topViewProducts = getTopViewProducts();
  const lastViewProducts = getLastViewProducts();

  return (
    <Translate>
      {({ translate }) => (
        <Page>
          <h1 className="header-home">{translate('header')}</h1>
          <ProductCardList
            title={translate('lastViewedProducts')}
            products={lastViewProducts}
          />
          <ProductCardList
            title={translate('topVisitedProducts')}
            products={topViewProducts}
          />
        </Page>
      )}
    </Translate>
  );
}

export default HomePage;
