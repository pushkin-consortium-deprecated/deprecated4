/* eslint-disable max-len */

import React, { PropTypes } from 'react';
import { Line, Circle } from 'rc-progress';

export default class Progress extends React.Component {
  render() {
    return (
      <div className="col-xs-4">
        <div style={{ marginTop: 20, width: 200 }}>
          <Circle
            percent={this.props.precent}
            strokeWidth="4"
            strokeColor="#68C8F5"
          />
          <label style={{ 'text-align':'center', 'margin-top':20}}> Progress: {this.props.precent} % </label>
        </div>
      </div>
    );
  }
}
