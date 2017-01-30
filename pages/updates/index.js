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
import s from './styles.css';

class Updates extends React.Component {

  constructor(){
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
    if (window.innerWidth < 676) {
      this.setState({mobile: true});
    }
    else {
      this.setState({mobile: false});
    }
    // console.log(document.getElementById('myiframe').contentDocument.body.scrollHeight);
  }

  render() {
    return (
      <div>
        <b.Image style={{display: 'none'}} src="/../../img/favicon.ico" />
        <div >
          <iframe src="http://eepurl.com/cck0nb" frameBorder="0" width="100%" height={this.state.mobile ? '1300px' : '1100px'} />
        </div>
      </div>
    );
  }

}

export default Updates;
