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
import * as b from 'react-bootstrap';
import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import s from './styles.css';

class HomePage extends React.Component {

  constructor() {
    super();
    this.state = {};
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentWillMount() {
    window.addEventListener('resize', this.updateDimensions);
    this.updateDimensions();
  }

  componentDidMount() {
    document.title = 'Games With Words';
    this.updateDimensions();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions() {
    if (window.innerWidth < 992) {
      this.setState({ mobile: true, border: { borderBottom: 'dashed #a9a9a9' } });
    } else {
      this.setState({ mobile: false, border: { borderRight: 'dashed #a9a9a9' } });
    }
  }

  render() {
    return (
      <div>
        {/* needed for sticky footer */}
        <b.Image style={{ display: 'none' }} src="/../../img/favicon.ico" />
        <div>
          {/* insert content here */}
        </div>
      </div>
    );
  }

}

export default HomePage;
