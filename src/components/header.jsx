import React from 'react';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './header.scss';
import SearchForm from 'components/search-form';
import { fetchProducts } from 'actions/products';

function Header(props) {
  const { history, location, searchTerm } = props;
  return (
    <div className="header">
      <a className="header__link" href="/">
        Mercado Libre
      </a>
      <SearchForm
        searchTerm={searchTerm}
        formClassName="header__search-form"
        onSubmit={searchText => {
          const url = `/items?${qs.stringify({ search: searchText })}`;
          const currentUrl = `${location.pathname}${location.search}`;
          if (url === currentUrl) {
            return;
          }
          history.push(url);
          if (location.pathname == '/items') {
            props.fetchProducts(searchText);
          }
        }}
      />
    </div>
  );
}

export default connect(
  ({ products }) => ({
    searchTerm: products.searchTerm
  }),
  { fetchProducts }
)(withRouter(Header));
