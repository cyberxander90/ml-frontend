import React from 'react';
import { render, hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Frontload } from 'react-frontload';
import { LocalizeProvider } from 'react-localize-redux';
import Loadable from 'react-loadable';

import './index.scss';
import './components/search-form.scss';
import App from 'components/app';
import buildStore from 'build-store';

const Application = (
  <Provider store={buildStore()}>
    <BrowserRouter>
      <Frontload noServerRender>
        <LocalizeProvider>
          <App />
        </LocalizeProvider>
      </Frontload>
    </BrowserRouter>
  </Provider>
);

const root = document.querySelector('#root');

// render or hydrate the DOM
if (root.hasChildNodes() === true) {
  Loadable.preloadReady().then(() => {
    hydrate(Application, root);
  });
} else {
  render(Application, root);
}
