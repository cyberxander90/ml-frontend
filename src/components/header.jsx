import React from 'react';

import './header.scss';
import SearchForm from 'components/search-form';

function Header() {
  return (
    <div className="header">
      <a className="header__link" href="/">
        Mercado Libre
      </a>
      <SearchForm
        formClassName="header__search-form"
        onChange={value => console.log(value)}
        onSubmit={value => console.log('submit: ', value)}
      />
    </div>
  );
}

export default Header;
