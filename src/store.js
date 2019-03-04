import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from 'reducers';
import api from 'apis/api';

const composeEnhancers = composeWithDevTools({});
const store = createStore(
  reducers,
  /* preloadedState, */
  composeEnhancers(
    applyMiddleware(reduxThunk.withExtraArgument(api))
    // other store enhancers if any
    // ...
  )
);

export default store;
