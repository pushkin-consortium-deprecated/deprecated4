/* eslint-disable max-len */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class MultiPicture extends React.Component {
  componentDidMount() {
    const props = this.props;
    const page_1_questions = [this.props.question];
    const page_1_options = this.props.choices;
    const multi_choice_block = {
      type: 'survey-multi-picture',
      questions: [page_1_questions],
      options: [page_1_options],
      required: [true, false],
      on_finish: function(data) {
        const response = JSON.parse(data.responses);
        let choiceId;
        props.choices.filter(currentChoice => {
          if(currentChoice.url === response.answer){
            choiceId = currentChoice.choiceId;
          }
        })
        const formatResponse = {
          choiceId: choiceId,
          questionId: props.questionId,
          user: {
            id: props.userId,
          },
        };
        props.nextQuestion(formatResponse);
      },
    };
    jsPsych.init({
      display_element: this.refs.main,
      timeline: [multi_choice_block],
      on_finish: function() {
        props.progress();
      },
    });
  }
  componentDidUpdate() {
    const props = this.props;
    const page_1_questions = [this.props.question];
    const page_1_options = this.props.choices;
    const multi_choice_block = {
      type: 'survey-multi-picture',
      questions: [page_1_questions],
      options: [page_1_options],
      required: [true, false],
      on_finish: function(data) {
        const response = JSON.parse(data.responses);
        let choiceId;
        props.choices.filter(currentChoice => {
          if(currentChoice.url === response.answer){
            choiceId = currentChoice.choiceId;
          }
        })
        const formatResponse = {
          choiceId: choiceId,
          questionId: props.questionId,
          user: {
            id: props.userId,
          },
        };
        props.nextQuestion(formatResponse);
      },
    };
    jsPsych.init({
      display_element: this.refs.main,
      timeline: [multi_choice_block],
      on_finish: function() {
        props.progress();
      },
    });
  }
  render() {
    console.log("this.props multipicture", this.props)
    return (
      <div ref="main">
      </div>
    );
  }
}

export default(connect(state => state))(MultiPicture);