import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux'
import reducer from './store/reducers' 
import thunk from 'redux-thunk';

const middleware = [ thunk ]

const store = createStore(
  reducer,
  applyMiddleware(...middleware) // for async purposes
)


ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'));

serviceWorker.unregister();