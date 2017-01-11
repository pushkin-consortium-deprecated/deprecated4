/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import 'babel-polyfill';
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { routes } from './core/routes';
import { syncHistoryWithStore } from 'react-router-redux';
import { createStore } from 'redux';
import { rootReducer } from './reducers/index';


export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
  );

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  // if (module.hot) {
  //   module.hot.accept('./reducers', () =>
  //     store.replaceReducer(require('./reducers/index').rootReducer) // eslint-disable-line global-require
  //   );
  // }
  return store;
}

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router onUpdate={() => window.scrollTo(0, 0)} history={history} >
      {routes}
    </Router>
  </Provider>, document.getElementById('container')
);

FastClick.attach(document.body);