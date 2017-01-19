/* eslint-disable max-len */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { userResponse } from '../../../../actions/userresponses';

class MultiPicture extends React.Component {
  constructor(props) {
    super(props);
    this.getChocieId = this.getChocieId.bind(this);
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
        console.log("response.answer", response.answer)
        props.dispatch(userResponse({
          choiceId: choiceId,
          questionId: props.questionId,
          userId: props.userId,
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
        console.log("response.answer", response.answer)
        props.dispatch(userResponse({
          choiceId: choiceId,
          questionId: props.questionId,
          userId: props.userId,
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
  getChocieId(response) {
    const props = this.props;
    return props.choices.filter(currentChoice => {
      if(currentChoice.url === response.url){
        return currentChoice.id
      }
    })
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
