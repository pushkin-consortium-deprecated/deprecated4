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

import * as f from 'react-foundation';
import * as b from 'react-bootstrap';
import React, { PropTypes } from 'react';
import s from './styles.css';
import { Link } from 'react-router';

class HomePage extends React.Component {

  constructor(){
    super();
    this.state = {};
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentWillMount() {
    window.addEventListener('resize', this.updateDimensions);
    this.updateDimensions();
  }

  componentDidMount() {
    document.title = 'Games With Words';
    this.updateDimensions();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions() {
    if (window.innerWidth < 992) {
      this.setState({mobile: true, border: {borderBottom: 'dashed #a9a9a9'}});
    }
    else {
      this.setState({mobile: false, border: {borderRight: 'dashed #a9a9a9'}});
    }
  }

  render() {
    if (!this.props.children) {
      return (
        <div>
          <b.Image style={{ display: 'none' }} src="/../../img/favicon.ico" />
          <div style={{ margin: '20px', marginTop: this.state.mobile ? '50px' : '100px' }}>
            <b.Row>
              <b.Col xs={12}>
                <div className={s.blurb} style={this.state.mobile ? null : { marginRight: '20px', fontSize: '18px' }}>
                  <p>Want to learn new things about yourself while simultaneously making important contributions to science? Take one of our quizzes below.</p>
                  <hr />
                  <p style={{ marginBottom: '25px' }}><Link className={s.title} to="/quizzes/whichenglish">Which English?</Link><br />Help us map the grammar of English around the world? <strong>See our best guess as to which world English you speak.</strong></p>
                  <p style={{ marginBottom: '25px' }}><a className={s.title} href="http://gameswithwords.org/VocabQuiz/">The Vocab Quiz</a><br />How many words do you know? <strong>See your results at the end.</strong></p>
                  <p style={{ marginBottom: '25px' }}><a className={s.title} href="http://gameswithwords.org/MRQ/index.html">Mind Reading Quotient</a><br />Forget psychics, all of us have to read minds. We try to figure out what people are thinking based on what they say or do. <strong>See your results at the end.</strong></p>
                  <p style={{ marginBottom: '25px' }}><a className={s.title} href="http://gameswithwords.org/IgnoreThat/index.html">Ignore That!</a><br />How distractable are you? How well can you ignore irrelevant information? <strong>See your results at the end.</strong></p>
                  <p style={{ marginBottom: '25px' }}><a className={s.title} href="http://gameswithwords.org/TrialsoftheHeart/index.html">Trials of the Heart</a><br />In the future, you won&apos;t be allowed to cause other people to have emotions. See what this future is like, and help researchers better understand human emotion &amp; language. <strong>In English and/or Korean.</strong></p>
                  <p><a className={s.title} href="http://gameswithwords.org/exparchive.html">Archives</a></p>
                  <hr />
                  <p>For results of these projects and announcements of new projects, click <a href="/updates">here</a>.</p>
                </div>
              </b.Col>
            </b.Row>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default HomePage;
/* eslint-disable max-len */
