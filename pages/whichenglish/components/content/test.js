/* eslint-disable max-len */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { userResponse, received } from '../../../../actions/userresponses';

class Test extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const props = this.props;
    console.log("this.props in didMount", this.props)
    // defining groups of questions that will go together.
    var page_1_questions = ["I like vegetables.", "I like fruit."];

    // definiting two different response scales that can be used.
    var page_1_options = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"];
    var page_2_options = ["Strongly Disagree", "Disagree", "Somewhat Disagree", "Neural", "Somewhat Agree", "Agree", "Strongly Agree"];

    var multi_choice_block = {
        type: 'survey-multi-choice',
        questions: page_1_questions,
        options: [page_1_options, page_2_options],  // need one scale for every question on a page
        required: [true, false],
        on_finish: function(data) {
          console.log("i'm data!", data)
          console.log("this.props in block", props)
          const response = JSON.parse(data.responses);
          props.dispatch(userResponse({
            response: response,
            time_elapsed: data.time_elapsed,
            trial_type: data.trial_type,
          }));
        },
    };
    jsPsych.init({

      display_element: this.refs.main,
      timeline: [multi_choice_block],
      on_finish: function() {
        //go to the next question
        props.dispatch(received());
      }
    });
  }

  render() {
    console.log("this.props in test", this.props)
    return (
      <div ref="main">
      </div>
    );
  }
}

export default(connect(state => state))(Test);
