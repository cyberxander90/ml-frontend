import React from 'react';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Translate } from 'react-localize-redux';

import './header.scss';
import SearchForm from 'components/search-form';
import { fetchProducts } from 'actions/products';

function onSubmit({ searchText, location, history, fetchProducts }) {
  const url = `/items?${qs.stringify({ search: searchText })}`;
  const currentUrl = `${location.pathname}${location.search}`;
  if (url === currentUrl) {
    return;
  }

  history.push(url);
  if (location.pathname === '/items') {
    fetchProducts(searchText);
  }
}

function Header(props) {
  const { searchTerm } = props;
  return (
    <Translate>
      {({ translate }) => (
        <header className="header">
          <a className="header__link" href="/">
            Mercado Libre
          </a>
          <SearchForm
            searchTerm={searchTerm}
            placeholder={translate('placeholder.find')}
            formClassName="header__search-form"
            onSubmit={searchText => onSubmit({ ...props, searchText })}
          />
        </header>
      )}
    </Translate>
  );
}

export default connect(
  ({ products }) => ({
    searchTerm: products.searchTerm
  }),
  { fetchProducts }
)(withRouter(Header));
