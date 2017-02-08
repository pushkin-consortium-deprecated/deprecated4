/* eslint-disable max-len */

import React, { PropTypes } from 'react';

export default class Algorithm extends React.Component {
  render() {
    const logo = require('../../../../../public/img/visual.png')
    return (
      <div>
        <a href="/WhichEnglish/dialect_results.html" target="_blank">
          <img src={logo} style={{ height: 80, width: 80 }} />
        </a>
        <p>visual</p>
      </div>
    );
  }
}
