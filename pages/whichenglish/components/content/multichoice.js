/* eslint-disable max-len */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class MultiChoice extends React.Component {
  componentDidUpdate() {
    const props = this.props;
    const page_1_questions = [this.props.question];
    const page_1_options = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"];
    const multi_choice_block = {
      type: 'survey-multi-choice',
      questions: page_1_questions,
      options: [page_1_options],
      required: [true, false],
      on_finish: function(data) {
        const response = JSON.parse(data.responses);
        props.dispatch(userResponse({
          question: props.question,
          answer: response.answer,
          time_elapsed: data.time_elapsed,
          trial_type: data.trial_type,
        }));
      },
    };
    jsPsych.init({
      display_element: this.refs.main,
      timeline: [multi_choice_block],
      on_finish: function() {
        props.dispatch(received());
        props.nextQuestion();
        props.progress();
      },
    });
  }
  componentDidMount() {
    const props = this.props;
    const page_1_questions = [this.props.question];
    const page_1_options = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"];
    const multi_choice_block = {
      type: 'survey-multi-choice',
      questions: page_1_questions,
      options: [page_1_options],
      required: [true, false],
      on_finish: function(data) {
        const response = JSON.parse(data.responses);
        props.dispatch(userResponse({
          question: props.question,
          answer: response.answer,
          time_elapsed: data.time_elapsed,
          trial_type: data.trial_type,
        }));
      },
    };
    jsPsych.init({
      display_element: this.refs.main,
      timeline: [multi_choice_block],
      on_finish: function() {
        props.nextQuestion();
        props.progress();
      },
    });
  }

  render() {
    return (
      <div ref="main">
      </div>
    );
  }
}

export default(connect(state => state))(MultiChoice);
