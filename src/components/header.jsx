import React from "react";

import "./header.scss";

function Header() {
  return (
    <div className="header">
      <a className="header__link" href="/">
        Mercado Libre
      </a>
      <input className="header__search-form" />
    </div>
  );
}

export default Header;
