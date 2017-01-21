/* eslint-disable max-len */

import React, { PropTypes } from 'react';
import SkyLight from 'react-skylight';
import Algorithm from './algorithm';
import Visual from './visual';

export default class MoreInfo extends React.Component {
  render() {
    return (
      <div>
        <h5> More information about the project: </h5>
        <Algorithm />
        <Visual />
      </div>
    );
  }
}
