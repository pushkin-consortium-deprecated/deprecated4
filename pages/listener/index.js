/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
 /* eslint-disable max-len */

require('script-loader!../../jsPsych/jspsych.js');
require('script-loader!../../jsPsych/plugins/jspsych-text.js');

import * as f from 'react-foundation';
import { Row, Col, Image} from 'react-bootstrap';
import React, { PropTypes } from 'react';
// import s from './styles.css';
import { Link } from 'react-router';

class VerbCorner extends React.Component {

  componentDidMount() {

    /* experiment */
    const intro1 = {
      type: 'text',
      text: '<p>In this task, you will answer some questions about English sentences. Scientists will use your answers in order to better understand how language works. In order to help you better understand what to do, we have written a background story for the task. This should make the task more clear.</p><p>Press any key to continue.</p>'
    };

    const intro2 = {
      type: 'text',
      text: '<p>You will now do a few practice questions. You will get feedback if your answer is incorrect.</p><p>Press any key to continue.</p>'
    };

    const timeline = [];

    timeline.push(intro1);
    timeline.push(intro2);

    jsPsych.init({
        display_element: this.refs.jspsychTarget,
        timeline: timeline,
        on_finish: function() {
            console.log('success');
        }
    });
  }

  render() {
    if (!this.props.children) {
      return (
        <div>
          <link rel="stylesheet" type="text/css" href="/css/jspsych.css" />
          <div id="jspsych-target" ref="jspsychTarget" />
        </div>
      );
    }
    return this.props.children;
  }
}

export default VerbCorner;
/* eslint-disable max-len */
