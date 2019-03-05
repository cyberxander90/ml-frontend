import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Frontload } from 'react-frontload';

import './index.scss';
import './components/search-form.scss';
import App from 'components/app';
import buildStore from 'build-store';

ReactDOM.render(
  <Provider store={buildStore()}>
    <BrowserRouter>
      <Frontload noServerRender>
        <App />
      </Frontload>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
