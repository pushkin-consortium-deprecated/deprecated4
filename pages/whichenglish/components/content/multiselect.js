/* eslint-disable max-len */

import React, { PropTypes } from 'react';

export default class MultiSelect extends React.Component {
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
        // let choiceIds = [];
        props.allChoices.map(currentChoice => {
          response.answer.map(answeredChoice => {
            if(currentChoice.imageUrl === answeredChoice){
              const formatResponse = {
                choiceId: currentChoice.id,
                questionId: props.questionId,
                user: {
                  id: props.userId,
                },
              };
              props.nextQuestion(formatResponse);
            }
          })
        })
        // const formatResponse = {
        //   choiceId: choiceIds,
        //   questionId: props.questionId,
        //   user: {
        //     id: props.userId,
        //   },
        // };
        // console.log("what i'm i sending in multiselect", formatResponse)
        // props.nextQuestion(formatResponse);
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
        // let choiceIds = [];
        props.allChoices.map(currentChoice => {
          response.answer.map(answeredChoice => {
            if(currentChoice.imageUrl === answeredChoice){
              const formatResponse = {
                choiceId: currentChoice.id,
                questionId: props.questionId,
                user: {
                  id: props.userId,
                },
              };
              props.nextQuestion(formatResponse);
            }
          })
        })
        // const formatResponse = {
        //   choiceId: choiceIds,
        //   questionId: props.questionId,
        //   user: {
        //     id: props.userId,
        //   },
        // };
        // console.log("what i'm i sending in multiselect", formatResponse)
        // 
        // props.nextQuestion(formatResponse);
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