/* eslint-disable max-len */
/* eslint-disable camelcase */


import React, { PropTypes } from 'react';

export default class MultiSelect extends React.Component {
  componentDidMount() {
    const props = this.props;
    const page_1_questions = [this.props.question];
    const page_1_options = this.props.choices;
    const multi_choice_block = {
      type: 'survey-multi-select',
      questions: page_1_questions,
      options: [page_1_options],
      required: [true, false],
      on_finish: function(data) {
        const response = JSON.parse(data.responses);
        const choiceIds = response.answer.map(answer => {
          const index = props.allChoices.findIndex(choice => choice.displayText === answer);
          return props.allChoices[index].id;
        });
        const formatResponse = {
          choiceId: choiceIds,
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
      type: 'survey-multi-select',
      questions: page_1_questions,
      options: [page_1_options],
      required: [true, false],
      on_finish: function(data) {
        const response = JSON.parse(data.responses);
        const choiceIds = response.answer.map(answer => {
          const index = props.allChoices.findIndex(choice => choice.displayText === answer);
          return props.allChoices[index].id;
        });
        const formatResponse = {
          choiceId: choiceIds,
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
    return (
      <div ref="main">
      </div>
    );
  }
}
