/* eslint-disable max-len */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
export default class Findings extends React.Component {
  render() {
    const logo = require('../../../../../public/img/mglass.png')
    return (
      <div>
        <Link to="/findings">
          <img src={logo} style={{ height: 80, width: 80 }} alt="" />
        </Link>
        <p>Findings</p>
      </div>
    );
  }
}