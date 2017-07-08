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
import axiosListenerQuiz from './axiosListenerQuiz';
import s from './ListenerQuiz.css';

class ListenerQuiz extends React.Component {

  constructor(props) {
    super();
    this.state = {loading: true};
    this.hideLoading = this.hideLoading.bind(this);
  }

  hideLoading(props) {
    this.setState({loading: false});
  }

  /* jspsych functions */

  getHeadphoneCheck() {

      let arr = [];
      let audio = {};
      let questions = {};
      let file;
      let stims_shuf = jsPsych.randomization.shuffle(['antiphase_HC_IOS.wav', 'antiphase_HC_ISO.wav', 'antiphase_HC_OIS.wav', 'antiphase_HC_OSI.wav', 'antiphase_HC_SIO.wav', 'antiphase_HC_SOI.wav']);
      for (let i in stims_shuf) {
          file = stims_shuf[i];
          audio = {
              type: 'single-audio',
              stimulus: `/quizzes/ListenerQuiz/audio/${file}`,
              timing_response: 5000,
              response_ends_trial: false,
              prompt: '<p align="left">Please listen to the sequence of tones.</p>'
          };
          questions = {
              type: 'text',
              choices: ['1', '2', '3'],
              text: `
                      <p align="left">
                          Which of the tones was the QUIETEST/SOFTEST? For the first, press <b>1</b>. For the second, press <b>2</b>. For the third, press <b>3</b>.
                      </p>
                      `
          };
          arr.push(audio);
          arr.push(questions);
      }
      return arr;
  }

  getTrials(stims) {

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

    for (let i in stims) {
        file = stims[i];
        audio = {
            type: 'single-audio',
            stimulus: `/quizzes/ListenerQuiz/audio/${file}`,
            timing_response: 15000,
            response_ends_trial: false,
            prompt: '<p align="left">Please listen to the song excerpt and answer the questions that will follow when complete.</p>'
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

    /* access to class in inline functions */
    const _this = this;

    /* jspsych timeline */
    const explain_requirements = {
      type: 'text',
      text: '<p align="left">This study involves listening to sound. You will need to be able to use good quality headphones. Otherwise, you may not be able to complete the study. If you cannot do this, please do not proceed.</p><p>Press any key to continue.</p>'
    };

    const calibration = {
       type: 'text',
       text: '<p align="left">On the next screen, you will hear a calibration tone. Listen to the tone, and turn up the volume on your computer until the calibration tone is at a loud but comfortable level. <p>Press any key when you are ready to continue to the tone.</p>'
    };

    const calibration_audio = {
        type: 'single-audio',
        stimulus: '/quizzes/ListenerQuiz/audio/noise_calib_stim.wav',
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
        stimulus: '/quizzes/ListenerQuiz/audio/NAIV-birthday.mp3',
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
    const dataArray = [];
    let stims;
    let user;

    axiosListenerQuiz.post('/getAllStimuli')
      .then(function (res) {
        _this.hideLoading();
        stims = res.data.stimuli;
        user = res.data.user;
      })
      .then( () => {
        timeline.push(explain_requirements);
        timeline.push(calibration);
        timeline.push(calibration_audio);
        timeline.push(headphone_instructions);
      })
      .then( () => {
        const headphone_check = this.getHeadphoneCheck();
        for (let i in headphone_check) {
            timeline.push(headphone_check[i]);
        }
      })
      .then( () => {
        timeline.push(explain);
        timeline.push(practice_audio);
        timeline.push(practice_question);
        timeline.push(ready);
      })
      .then( () => {
        const trials = this.getTrials(stims);
        for (let i in trials) {
            timeline.push(trials[i]);
        }
      })
      .then( () => {
        timeline.push(checks);
        timeline.push(done);
      })
      .then( () => {
        jsPsych.init({
            display_element: this.refs.jspsychTarget,
            timeline: timeline,
            on_data_update: function(data) {

                dataArray.push(data);

                // headphone checks
                if (data['trial_index'] == 5 || data['trial_index'] == 7 || data['trial_index'] == 9 || data['trial_index'] == 11 || data['trial_index'] == 13 || data['trial_index'] == 15) {
                  
                  const toSend = data;
                  const fullStim = dataArray[dataArray.length - 2]['stimulus'];
                  const sendStim = fullStim.split('/')[fullStim.split('/').length - 1];
                  toSend['stimulus'] = sendStim;
                  toSend['description'] = 'headphone check';

                  axiosListenerQuiz.post('/response', {
                      user_id: user,
                      data_string: toSend
                    })
                    .then(function (res) {})
                    .catch(function (err) {});

                }

                else if (data['responses']){

                  // responses for trial stimuli
                  if (data['responses'].includes('Definitely do not use the song to express love for another person')) {

                    const fullStim = dataArray[dataArray.length - 2]['stimulus'];
                    const sendStim = fullStim.split('/')[fullStim.split('/').length - 1];

                    const toSend = data;
                    toSend['description'] = `responses for stimulus ${sendStim}`;

                    axiosListenerQuiz.post('/stimulusResponse', {
                        user_id: user,
                        stimulus: sendStim,
                        data_string: data
                      })
                      .then(function (res) {})
                      .catch(function (err) {});
                    
                  }

                  // post study questions
                  else if (data['responses'].includes('What color is the sky?')) {

                    const toSend = data;
                    toSend['description'] = 'post study questions';

                    axiosListenerQuiz.post('/response', {
                        user_id: user,
                        data_string: toSend
                      })
                      .then(function (res) {})
                      .catch(function (err) {});
                    
                  }

                }              
            }
        });
      })
      .catch(function (err) {});

  }

  render() {
    const loading = this.state.loading;
    if (!this.props.children) {
      return (
        <div>

          <link rel="stylesheet" type="text/css" href="/css/jspsych.css" />

          <div style={{display: loading ? '' : 'none'}}>
            <p className={s.loading}><b>Loading...</b></p>
          </div>

          <div style={{display: loading ? 'none' : ''}}>
            <p className={s.title}>The Listener Quiz</p>
            <hr style={{maxWidth: '90%', marginLeft: 'auto', marginRight: 'auto', marginTop: '0px', borderTop: '1px solid #000000'}} />
          </div>

          <div ref="jspsychTarget" />

        </div>
      );
    }
    return this.props.children;
  }
}

export default ListenerQuiz;
/* eslint-disable max-len */
