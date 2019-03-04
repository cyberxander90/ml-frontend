import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

const LoadableHomePage = Loadable({
  loader: () =>
    import(/* webpackChunkName: "HomePage" */ 'components/routes/home-page'),
  loading: () => null,
  modules: ['HomePage']
});

const LoadableProductListPage = Loadable({
  loader: () =>
    import(/* webpackChunkName: "ProductListPage" */ 'components/routes/product-list-page'),
  loading: () => null,
  modules: ['ProductListPage']
});

const LoadableProductDetailsPage = Loadable({
  loader: () =>
    import(/* webpackChunkName: "ProductDetailsPage" */ 'components/routes/product-details-page'),
  loading: () => null,
  modules: ['ProductDetailsPage']
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
