/* eslint-disable max-len */

import React, { PropTypes } from 'react';

export default class Instruction extends React.Component {
  componentDidMount() {
    var trial = {
      type: 'instructions',
      pages: [
        "In this quiz, you will decide which sentences are grammatical (correct) and which are not. Do not worry about whether the sentence is formal or 'proper' or is what you learned in school. Scientists have discovered that many of the 'rules' taught in school are wrong anyway. Focus on your gut instincts. Does the sentence sound correct, or does it sound like a mistake -- for instance, a mistake made by a young child or a recent immigrant?"
      ],
      show_clickable_nav: false
    }

    jsPsych.init({
      display_element: this.refs.main,
      timeline: [trial],
      on_finish: function(){ jsPsych.data.displayData(); }
    });
  }

  render() {
    return (
      <div ref="main">
      </div>
    );
  }
}
