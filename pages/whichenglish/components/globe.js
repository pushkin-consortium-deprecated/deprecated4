/* eslint-disable max-len */

import React, { PropTypes } from 'react';


export default class Globe extends React.Component {
  render() {
    return (
      <div className="col-xs-4">
        <img src={this.props.logo} alt="" />
        <p>{this.props.content}</p>
      </div>
    );
  }
}
