/* eslint-disable max-len */

import React, { PropTypes } from 'react';
import SkyLight from 'react-skylight';

export default class Algorithm extends React.Component {
  render() {
    const logo = require('../../../../../public/img/visual.png')
    return (
      <div style={{ display: 'inline-block', 'margin-right': 10 }}>
        <a href="http://www.gameswithwords.org/WhichEnglish/dialect_results.html" target="_blank">
          <img src={logo} style={{ height: 80, width: 80 }} />
        </a>
        <p style={{ 'text-align': 'center' }}>visual</p>
      </div>
    );
  }
}
