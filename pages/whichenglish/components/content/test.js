/* eslint-disable max-len */

import React, { PropTypes } from 'react';
const timeline=[];
export default class Test extends React.Component {
  componentDidMount() {
    var hello_trial = {
      type: 'text',
      text: 'Hello world!',
    }
    jsPsych.init({
      timeline: timeline.concat(hello_trial),
      display_element: $(this.refs.main),
    })
  }
  render() {
    console.log("yo got in here!", this.props)
    return (
      <div ref="main">
      </div>
    );
  }
}
