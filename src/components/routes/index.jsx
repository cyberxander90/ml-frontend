import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

const LoadableHomePage = Loadable({
  loader: () => import('components/routes/home-page'),
  loading: () => null
});

const LoadableProductListPage = Loadable({
  loader: () => import('components/routes/product-list-page'),
  loading: () => null
});

const LoadableProductDetailsPage = Loadable({
  loader: () => import('components/routes/product-details-page'),
  loading: () => null
});

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={LoadableHomePage} />
      <Route exact path="/items" component={LoadableProductListPage} />
      <Route exact path="/item/:id" component={LoadableProductDetailsPage} />
    </Switch>
  );
}

export default Routes;
