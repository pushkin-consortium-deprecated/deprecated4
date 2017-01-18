/* eslint-disable max-len */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { userResponse } from '../../../../actions/userresponses';

class MultiPicture extends React.Component {
  componentDidUpdate() {
    const props = this.props;
    const page_1_questions = [this.props.question];
    const page_1_options = [{ url: "https://s-media-cache-ak0.pinimg.com/736x/5f/88/95/5f889520ddc5e5cb3dc67fb74ef59fc4.jpg", label: null }, {url:"http://3g28wn33sno63ljjq514qr87.wpengine.netdna-cdn.com/wp-content/uploads/2014/07/femcat.png", label: "hi i'm label" }];
    const multi_choice_block = {
      type: 'survey-multi-picture',
      questions: [page_1_questions],
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
    console.log("this.props multipicture", this.props)
    return (
      <div ref="main">
      </div>
    );
  }
}

export default(connect(state => state))(MultiPicture);
