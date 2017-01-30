/* eslint-disable max-len */

import React, { PropTypes } from 'react';
import Algorithm from './algorithm';
import Visual from './visual';
import Findings from './findings';
import Updates from './updates';

export default class MoreInfo extends React.Component {
  render() {
    return (
      <div style={{ marginBottom: 30 }}>
        <div>
          <h5> More information about the project: </h5>
        </div>
        <div className="row" style={{ textAlign: 'center' }}>
          <div className="col-xs-3">
            <Algorithm />
          </div>
          <div className="col-xs-3">
            <Visual />
          </div>
          <div className="col-xs-3">
            <Findings />
          </div>
          <div className="col-xs-3">
            <Updates />
          </div>
        </div>
      </div>
    );
  }
}
