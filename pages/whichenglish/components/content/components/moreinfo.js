/* eslint-disable max-len */

import React, { PropTypes } from 'react';
import Algorithm from './algorithm';
import Visual from './visual';
import Findings from './findings';
import Updates from './updates';

export default class MoreInfo extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h5> More information about the project: </h5>
        </div>
        <div className="row" style={{ textAlign: 'center' }}>
          <Algorithm />
          <Visual />
          <Findings />
          <Updates />
        </div>
      </div>
    );
  }
}
