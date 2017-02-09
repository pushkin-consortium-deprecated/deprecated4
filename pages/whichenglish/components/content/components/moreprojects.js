/* eslint-disable max-len */

import React, { PropTypes } from 'react';
import ImageLink from './imagelink';

export default class MoreProjects extends React.Component {
  render() {
    const logo = require('../../../../../public/img/mglass.png')
    return (
      <div>
        <div>
          <h5>More Projects </h5>
        </div>
        <div className="row">
          <ImageLink label="VocabQuiz" quizUrl="/VocabQuiz/" logo={logo} quizInto="How many words do you know" />
          <ImageLink label="VerbConor" quizUrl="/VerbCorner/" logo={logo} quizInto="Crowdsourcing language, meaning & thought" />
          <ImageLink label="Lookkit" quizUrl="https://lookit.mit.edu/" logo={logo} quizInto="parent-sourcing the mystries of cognitive development" />
          <ImageLink label="WeirdScience" quizUrl="http://www.lessweird.org/" logo={logo} quizInto="Making science less weird" />
        </div>
      </div>
    );
  }
}
