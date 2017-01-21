/* eslint-disable max-len */

import React, { PropTypes } from 'react';
import ShareButton from './components/sharebutton';
import MoreInfo from './components/moreinfo';
import MoreProjects from './components/moreprojects';

export default class LastPage extends React.Component {
  render() {
    return (
      <div>
        <div>
        <ShareButton />
        </div>
        <div>
        <MoreInfo />
        </div>
        <div>
        <MoreProjects />
        </div>
      </div>
    );
  }
}
