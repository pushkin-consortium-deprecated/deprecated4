/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { Image } from 'react-bootstrap';
import React, { PropTypes } from 'react';
import StartPage from './components/startpage';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        {/* needed for sticky footer */}
        <Image style={{ display: 'none' }} src="/../../img/favicon.ico" />
        <div>
          <StartPage />
        </div>
      </div>
    );
  }

}

export default HomePage;
