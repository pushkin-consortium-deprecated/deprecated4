/* eslint-disable max-len */

import React, { PropTypes } from 'react';


export default class Globe extends React.Component {
  render() {
    return (
      <div className="col-xs-4" style={{ textAlign: 'center', fontWeight: 'bold' }}>
        <img style={{ maxHeight: 371 }} src={this.props.logo} alt="" />
      </div>
    );
  }
}
