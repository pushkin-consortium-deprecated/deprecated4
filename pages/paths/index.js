/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import * as f from 'react-foundation';
import * as b from 'react-bootstrap';
import React, { PropTypes } from 'react';
import s from './styles.css';

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
    if (window.innerWidth < 1024) {
      this.setState({mobile: true, border: {borderBottom: 'dashed #a9a9a9'}, margin: {marginTop: '35px'}});
    }
    else {
      this.setState({mobile: false, border: {borderRight: 'dashed #a9a9a9'}});
    }
  }

  render() {
    return (
      <div>
        <f.Callout className={s.white}>
          <f.Row className="display" style={{marginTop: '50px', marginBottom: '25px'}}>
            <f.Column small={12} large={12} className={s.textCenter}>
              <p className={s.heading}>CHOOSE<br/>YOUR PATH.</p>
              <p className={s.subText}><b>I want to be a...</b></p>
            </f.Column>
          </f.Row>
          <f.Row className="display">
            <f.Column style={this.state.border} small={12} large={6} className={s.gif}>
              <a href="/projects"><b.Image src="/../../gif/res.gif" responsive className={s.gif}/></a>
              <p className={s.subText} ><b>Researcher</b></p>
              <p className={s.subText} style={{marginBottom: '50px'}}>Take control and help unlock the mysteries of language.</p>
            </f.Column>
            <f.Column style={this.state.margin} small={12} large={6} className={s.gif}>
              <a href="/quizzes"><b.Image src="/../../gif/par.gif" responsive className={s.gif}/></a>
              <p className={s.subText}><b>Participant</b></p>
              <p className={s.subText} style={{marginBottom: '50px'}}>Be a part of linguistics research and support our scientists.</p>
            </f.Column>
          </f.Row>
        </f.Callout>
      </div>
    );
  }

}

export default HomePage;
