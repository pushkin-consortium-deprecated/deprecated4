/* eslint-disable max-len */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default class Update extends React.Component {
  render() {
    const logo = require('../../../../../public/img/update.png')
    return (
      <div className="col-xs-2">
        <Link to="/updates">
          <img src={logo} style={{ height: 80, width: 80 }} alt="" />
        </Link>
        <p>Updates</p>
      </div>
    );
  }
}
