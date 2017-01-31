/* eslint-disable max-len */

import React, { PropTypes } from 'react';
import ShareButton from './components/sharebutton';
import MoreInfo from './components/moreinfo';
import MoreProjects from './components/moreprojects';
import { connect } from 'react-redux';
import ResultsList from '../../../../components/ResultsList/index';
class LastPage extends React.Component {
  //Mount the user results from the db insdead of getting from state
  render() {
    return (
      <div className="container">
        {this.props.userInfo.results &&
          <ResultsList
            results={this.props.userInfo.results}
          />
        }
        <ShareButton />
        <MoreInfo />
        <MoreProjects />
      </div>
    );
  }
}

export default connect(state => state)(LastPage);
