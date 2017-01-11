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
// import store from './core/store';
// import router from './core/router';
// import history from './core/history';


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

// let routes = require('./routes.json'); // Loaded with utils/routes-loader.js
// const container = document.getElementById('container');

// function renderComponent(component) {
//   ReactDOM.render(<Provider store={store}>{component}</Provider>, container);
// }

// Find and render a web page matching the current URL path,
// if such page is not found then render an error page (see routes.json, core/router.js)
// function render(location) {
//   router.resolve(routes, location)
//     .then(renderComponent)
//     .catch(error => router.resolve(routes, { ...location, error }).then(renderComponent));
// }
ReactDOM.render(
  <Provider store={store}>
    <Router onUpdate={() => window.scrollTo(0, 0)} history={history} >
      {routes}
    </Router>
  </Provider>, document.getElementById('container')
);
// Handle client-side navigation by using HTML5 History API
// For more information visit https://github.com/ReactJSTraining/history/tree/master/docs#readme
// history.listen(render);
// render(history.getCurrentLocation());

// Eliminates the 300ms delay between a physical tap
// and the firing of a click event on mobile browsers
// https://github.com/ftlabs/fastclick
FastClick.attach(document.body);

// Enable Hot Module Replacement (HMR)
// if (module.hot) {
//  module.hot.accept('./core/routes', () => {
//    const route = require('./core/routes'); // eslint-disable-line global-require
//    ReactDOM.render(
//      <Provider store={store}>
//        <Router onUpdate={() => window.scrollTo(0, 0)} history={history} >
//          {route}
//        </Router>
//      </Provider>, document.getElementById('container')
//    )
//  });
// }
