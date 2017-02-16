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
import { Row, Col, Image} from 'react-bootstrap';
import React, { PropTypes } from 'react';
import s from './styles.css';
import { Link } from 'react-router';

class QuizPage extends React.Component {
  render() {
    if (!this.props.children) {
      return (
        <div>
        <Image style={{display: 'none'}} src={require('../../img/favicon.ico')}  />
          <div>
            <Row>
              <Col xs={12}>
                <div className={s.blurb} >
                  <p className={s.sub} >Want to learn new things about yourself while simultaneously making important contributions to science? Take one of our quizzes below.</p>
                  <hr />
                  <p className={s.mb25} ><Link className={s.title} to="/quizzes/whichenglish">Which English?</Link><br />Help us map the grammar of English around the world? <strong>See our best guess as to which world English you speak.</strong></p>
                  <p className={s.mb25}><a className={s.title} href="/VocabQuiz/">The Vocab Quiz</a><br />How many words do you know? <strong>See your results at the end.</strong></p>
                  <p className={s.mb25}><a className={s.title} href="/MRQ/index.html">Mind Reading Quotient</a><br />Forget psychics, all of us have to read minds. We try to figure out what people are thinking based on what they say or do. <strong>See your results at the end.</strong></p>
                  <p className={s.mb25}><a className={s.title} href="/IgnoreThat/index.html">Ignore That!</a><br />How distractable are you? How well can you ignore irrelevant information? <strong>See your results at the end.</strong></p>
                  <p className={s.mb25}><a className={s.title} href="/TrialsoftheHeart/index.html">Trials of the Heart</a><br />In the future, you won&apos;t be allowed to cause other people to have emotions. See what this future is like, and help researchers better understand human emotion &amp; language. <strong>In English and/or Korean.</strong></p>
                  <p><a className={s.title} style={{marginLeft:'20px', marginRight:'20px'}} href="/exparchive.html">Archives</a></p>
                  <hr />
                  <p className={s.sub} >For results of these projects and announcements of new projects, click <a href="/updates">here</a>.</p>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default QuizPage;
/* eslint-disable max-len */
