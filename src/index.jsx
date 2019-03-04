import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Frontload } from 'react-frontload';

import './index.scss';
import App from 'components/app';
import store from 'store';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Frontload noServerRender>
        <App />
      </Frontload>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
