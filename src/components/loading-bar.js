import React from 'react';
import { connect } from 'react-redux';

import './loading-bar.scss';

function LoadingBar({ hidden }) {
  return <div className={`loading-bar ${hidden && 'loading-bar--hidden'}`} />;
}

export default connect(state => ({
  hidden: !state.products.isLoading
}))(LoadingBar);
