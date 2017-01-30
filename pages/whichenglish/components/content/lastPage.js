/* eslint-disable max-len */

import React, { PropTypes } from 'react';
import ShareButton from './components/sharebutton';
import MoreInfo from './components/moreinfo';
import MoreProjects from './components/moreprojects';
import { connect } from 'react-redux';

class LastPage extends React.Component {
  render() {
    return (
      <div className="container" style={{ marginTop: 50 }}>
        <ShareButton />
        <MoreInfo />
        <MoreProjects />
      </div>
    );
  }
}

export default connect(state => state)(LastPage);
