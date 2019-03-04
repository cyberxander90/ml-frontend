import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'components/routes/home-page';
import ProductListPage from 'components/routes/product-list-page';
import productDetailsPage from 'components/routes/product-details-page';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/items" component={ProductListPage} />
      <Route exact path="/item/:id" component={productDetailsPage} />
    </Switch>
  );
}

export default Routes;
