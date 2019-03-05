import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import './loading-bar.scss';

function LoadingBar({ hidden }) {
  return ReactDOM.createPortal(
    <div className={`loading-bar ${hidden && 'loading-bar--hidden'}`} />,
    document.querySelector('#loading-bar')
  );
}

export default connect(state => ({ hidden: !state.products.isLoading }))(
  LoadingBar
);
