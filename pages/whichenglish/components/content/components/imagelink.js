/* eslint-disable max-len */

import React, { PropTypes } from 'react';

export default class ImageLink extends React.Component {
  render() {
    return (
      <div className="col-xs-3" style={{ textAlign: 'center' }}>
      <label>{this.props.label}</label>
        <a href={this.props.quizUrl}>
          <img src={this.props.logo} style={{ height: 80, width: 80 }} alt="" />
        </a>
        <p>{this.props.quizInto}</p>
      </div>
    );
  }
}