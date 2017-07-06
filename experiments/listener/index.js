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
require('script-loader!./jspsych-text.js');
require('script-loader!./jspsych-single-audio.js');
require('script-loader!./jspsych-call-function.js');
require('script-loader!./jspsych-survey-likert.js');
require('script-loader!./jspsych-survey-multi-choice.js');

import * as f from 'react-foundation';
import { Row, Col, Image} from 'react-bootstrap';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import stims from './stims.js'; // not necessary in production as will have stimulus selector
// import s from './styles.css';
// good if you need to imbue custom styles not through the jsPsych sheel inclduded in the render functon. this is how you're actually supposed to use css in react.

class Listener extends React.Component {

  /* jspsych functions */
  getHeadphoneCheck() {
      let arr = [];
      let audio = {};
      let questions = {};
      let file = '';
      let stims_shuf = jsPsych.randomization.shuffle(['antiphase_HC_IOS.wav', 'antiphase_HC_ISO.wav', 'antiphase_HC_OIS.wav', 'antiphase_HC_OSI.wav', 'antiphase_HC_SIO.wav', 'antiphase_HC_SOI.wav']);
      for (let i = 0; i < 6; i++) {
          file = stims_shuf[i];
          audio = {
              type: 'single-audio',
              stimulus: `/quizzes/listener/audio/${file}`,
              timing_response: 5000,
              response_ends_trial: false,
              prompt: '<p>Please listen to the sequence of tones.</p>'
          };
          questions = {
              type: 'text',
              choices: ['1', '2', '3'],
              text: `
                      <p>
                          Which of the tones was the QUIETEST/SOFTEST? For the first, press <b>1</b>. For the second, press <b>2</b>. For the third, press <b>3</b>.
                      </p>
                      `
          };
          arr.push(audio);
          arr.push(questions);
      }
      return arr;
  }

  getTrials() {

    const danceScale = ['<p align="left">Definitely do not use the song to dance</p>', ' ', ' ', ' ', ' ', '<p align="left">Definitely use the song to dance</p>'];

    const storyScale = ['<p align="left">Definitely do not use the song to tell a story</p>', ' ', ' ', ' ', ' ', '<p align="left">Definitely use the song to tell a story</p>'];

    const mournScale = ['<p align="left">Definitely do not use the song to mourn the dead</p>', ' ', ' ', ' ', ' ', '<p align="left">Definitely use the song to mourn the dead</p>'];

    const loveScale = ['<p align="left">Definitely do not use the song to express love for another person</p>', ' ', ' ', ' ', ' ', '<p align="left">Definitely use the song to express love for another person</p>'];

    const healingScale = ['<p align="left">Definitely do not use the song to heal illness</p>', ' ', ' ', ' ', ' ', '<p align="left">Definitely use the song to heal illness</p>'];

    const sootheScale = ['<p align="left">Definitely do not use the song to soothe a baby</p>', ' ', ' ', ' ', ' ', '<p align="left">Definitely use the song to soothe a baby</p>'];

    const birthdayScale = ['<p align="left">Definitely do not use the song to celebrate a birthday</p>', ' ', ' ', ' ', '' , '<p align="left">Definitely use the song to celebrate a birthday</p>'];

    let arr = [];
    let audio = {};
    let questions = {};
    let file = '';
    let stims_shuf = jsPsych.randomization.shuffle(stims.trials); // this will be replaced by a getStims() function that hits the API using axios
    for (let i = 0; i < 36; i++) {
        file = stims_shuf[i];
        audio = {
            type: 'single-audio',
            stimulus: `/quizzes/listener/audio/${file}`,
            timing_response: 15000,
            response_ends_trial: false,
            prompt: 'Please listen to the song excerpt and answer the questions that will follow when complete.'
        };
        questions = {
            type: 'survey-likert',
            questions: ['Think of the singer(s). I think that the singers...', 'Think of the singer(s). I think that the singers...','Think of the singer(s). I think that the singers...','Think of the singer(s). I think that the singers...','Think of the singer(s). I think that the singers...','Think of the singer(s). I think that the singers...', 'Did you have trouble hearing this song excerpt?'],
            labels: jsPsych.randomization.shuffle([danceScale, storyScale, mournScale, loveScale, healingScale, sootheScale])
        };
        questions.labels.push(['Yes', 'No']);
        arr.push(audio);
        arr.push(questions);
    }
    return arr;
  }

  componentDidMount() {

    /* jspsych timeline */
    const explain_requirements = {
      type: 'text',
      text: '<p align="left">This study involves listening to sound. You will need to be able to use good quality headphones. Otherwise, you may not be able to complete the study. If you cannot do this, please do not proceed.</p><p>Press any key to continue.</p>'
    };

    const calibration = {
       type: 'text',
       text: '<p align="left">On the next screen, you will hear a calibration tone. Listen to the tone, and turn up the volume on your computer until the calibration tone is at a loud but comfortable level. Press any key when you are ready to continue to the tone.'
    };

    const calibration_audio = {
        type: 'single-audio',
        stimulus: '/quizzes/listener/audio/noise_calib_stim.wav',
        choices: ['c'],
        response_ends_trial: true,
        prompt: '<p align="left">Adjust the volume on your computer until the tone is at a loud but comfortable level. When you are satisfied, press <b>C</b> to continue.</p>'
    };

    const headphone_instructions = {
       type: 'text',
       text: `
            <p align="left">
                In the following section, we will play you sequences of 3 tones, and then ask you which of the tones in each sequence was the QUIETEST/SOFTEST.
            </p>
            <p align="left">
                There will be 6 total sequences about which you will be asked.
            </p>
            <p align="left">
                The tones will only be played once, so listen carefully!
            </p>
            <p>
                Press any key to continue to the first sequence.
            </p>
            `
    };
  
    const explain = {
        type: 'text',
        text: '<p align="left">In this study, you will listen to excerpts from songs. Each excerpt will be 14 seconds long. You will then answer 6 questions after listening to each excerpt.</p><p align="left">The experiment will begin with a set of training questions concerning an example excerpt. This will have a similar format to the questions that you will see as part of the study.</p> <p>Press any key to continue.</p>',
    };

    const practice_audio = {
        type: 'single-audio',
        stimulus: '/quizzes/listener/audio/NAIV-birthday.mp3',
        timing_response: 10000,
        response_ends_trial: false,
        prompt: '<p align="left">Please listen to the song excerpt and answer the questions that will follow when complete.</p>'
    };

    const practice_question = {
        type: 'survey-multi-choice',
        required: [true],
        questions: ['Think of the singer(s). I think that the singers...'],
        options: [['Definitely do not use the song to celebrate a birthday', 'Definitely use the song to celebrate a birthday']],
        correct: ['Definitely use the song to celebrate a birthday'],
        force_correct: true
    };

    const ready = {
        type: 'text',
        text: '<p align="left">You are now ready to start the study. There will be 36 song excerpts for you to listen to.</p> <p>Press any key to continue. Good luck!</p>',
    };

    const checks = {
        type: 'survey-multi-choice',
        required: [true, true, true, true, true],
        questions: ['What color is the sky? Please answer this incorrectly ON PURPOSE, by choosing RED instead of blue.', 'Did you wear headphones while listening to the sounds in this study?', 'Please tell us about the place where you worked on this study. Please answer honestly.', 'Please tell us about whether you had difficulty loading the sounds. Please answer honestly.', 'How carefully did you complete this survey?'],
        options: [['Green', 'Red', 'Blue', 'Yellow'],['Yes', 'No'], ['I worked on this study in a very noisy place', 'I worked on this study in a somewhat noisy place', 'I worked on this study in a somewhat quiet place', 'I worked on this study in a very quiet place'],['There were problems loading all of the sounds', 'There were problems loading most of the sounds', 'There were problems loading some of the sounds', 'There were no problems loading any of the sounds'], ['Not carefully at all', 'Slightly carefully', 'Moderately carefully', 'Quite carefully', 'Very carefully']],
        correct: ['NA', 'NA', 'NA', 'NA', 'NA']
    };

    const done = {
        type: 'text',
        text: '<p align="left">You have now completed the study. Thanks for your participation!</p> <p>Press any key to finish.</p>',
    };

    const timeline = [];
    timeline.push(explain_requirements);
    timeline.push(calibration);
    timeline.push(calibration_audio);
    timeline.push(headphone_instructions);
    const headphone_check = this.getHeadphoneCheck();
    for (let i in headphone_check) {
        timeline.push(headphone_check[i]);
    }
    timeline.push(explain);
    timeline.push(practice_audio);
    timeline.push(practice_question);
    timeline.push(ready);
    const trials = this.getTrials();
    for (let i in trials) {
        timeline.push(trials[i]);
    }
    timeline.push(checks);
    timeline.push(done);

    const dataArray = [];

    jsPsych.init({
        display_element: this.refs.jspsychTarget,
        timeline: timeline,
        on_data_update: function(data) {
            dataArray.push(data);
            console.log(dataArray);
            // parse data i.e. JSON.stringify(data_array) and send back correctly paired response/excerpt
            // send data back to api using redux and/or api directly
        }
    });

  }

  render() {
    if (!this.props.children) {
      return (
        <div>
          <link rel="stylesheet" type="text/css" href="/css/jspsych.css" />
          <div ref="jspsychTarget" />
        </div>
      );
    }
    return this.props.children;
  }
}

export default Listener;
/* eslint-disable max-len */
