/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { Row, Col, Image } from 'react-bootstrap';
import React, { PropTypes } from 'react';
import s from './styles.css';

class HomePage extends React.Component {
render() {
  return (
    <div className={s.white}>
        <Row className="display">
          <Col sm={12} lg={12} className={s.textCenter}>
            <p className={s.heading}>CHOOSE<br/>YOUR PATH.</p>
            <p className={s.subText}><b>I want to be a...</b></p>
          </Col>
        </Row>
        <Row className="display">
          <Col sm={12} lg={6} className={s.gif + ' ' + s.border}>
            <a href="/projects"><Image src={require("./res.gif")} responsive className={s.gif}/></a>
            <p className={s.subText} ><b>Researcher</b></p>
            <p className={s.subText} style={{marginBottom: '50px'}}>Take control and help unlock the mysteries of language.</p>
          </Col>
          <Col sm={12} lg={6} className={s.gif + ' ' + s.margin}>
            <a href="/quizzes"><Image src={require("./par.gif")} responsive className={s.gif}/></a>
            <p className={s.subText}><b>Participant</b></p>
            <p className={s.subText} style={{marginBottom: '50px'}}>Be a part of linguistics research and support our scientists.</p>
          </Col>
        </Row>
      </div>
    );
  }

}

export default HomePage;
