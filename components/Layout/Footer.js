/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import * as i from 'react-social-icons';
import s from './Footer.css';

class Footer extends React.Component {
  render() {
    return (
      <footer id="footer">
        <div className={s.footer}>
          <div className={s.vert}>
            <nobr>
            </nobr>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;

