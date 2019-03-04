import React from 'react';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './header.scss';
import SearchForm from 'components/search-form';
import { fetchProducts } from 'actions/products';

function Header(props) {
  const { history, location, searchText } = props;
  console.log(props);
  return (
    <div className="header">
      <a className="header__link" href="/">
        Mercado Libre
      </a>
      <SearchForm
        searchText={searchText}
        formClassName="header__search-form"
        onChange={value => console.log(value)}
        onSubmit={searchText => {
          history.push(`/items?${qs.stringify({ search: searchText })}`);
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
    searchText: products.searchText
  }),
  { fetchProducts }
)(withRouter(Header));
