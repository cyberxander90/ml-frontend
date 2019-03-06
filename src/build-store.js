import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, createMemoryHistory } from 'history';
import reducers from 'reducers/index';
import api, { handleError } from 'apis/api';

// indicate if we are running from server (or browser)
const isFromServer = () =>
  typeof window === 'undefined' ||
  !window.document ||
  !window.document.createElement;

// get the pre-loaded state if exist
const getPreloadedState = () => {
  if (isFromServer()) {
    return {};
  }

  const preloadedState = window.__PRELOADED_STATE__;
  delete window.__PRELOADED_STATE__;
  return preloadedState;
};

function buildStore(url = '/') {
  const history = isFromServer()
    ? createMemoryHistory({ initialEntries: [url] })
    : createBrowserHistory();

  const composeEnhancers = composeWithDevTools({});
  const store = createStore(
    connectRouter(history)(reducers),
    getPreloadedState(),
    composeEnhancers(
      applyMiddleware(
        reduxThunk.withExtraArgument({ api, handleError }),
        routerMiddleware(history)
      )
      // other store enhancers if any
      // ...
    )
  );
  return store;
}

export default buildStore;
