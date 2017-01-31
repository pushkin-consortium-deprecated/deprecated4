/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import * as f from 'react-foundation';
import { Image } from 'react-bootstrap';
import React, { PropTypes } from 'react';
import s from './styles.css';

class Updates extends React.Component {
  render() {
    return (
      <div>
        <Image style={{display: 'none'}} src="/../../img/favicon.ico" />
        <div >
          <iframe src="http://eepurl.com/cck0nb" frameBorder="0" width="100%" className={s.iframe} />
        </div>
      </div>
    );
  }

}

export default Updates;
