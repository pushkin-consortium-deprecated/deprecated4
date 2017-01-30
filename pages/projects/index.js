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
    if (window.innerWidth < 992) {
      this.setState({mobile: true, border: {borderBottom: 'dashed #a9a9a9'}});
    }
    else {
      this.setState({mobile: false, border: {borderRight: 'dashed #a9a9a9'}});
    }
  }

  render() {
    return (
      <div>
        <b.Image style={{display: 'none'}} src="/../../img/favicon.ico" />
        <div >
          <b.Row>
            <b.Col xs={12}>
              <div className={s.blurb} style={this.state.mobile ? null : {marginRight: '20px', fontSize: '18px'}}>
                <p>Want to participate in science not just as a subject but as a researcher? Professional researchers are increasingly <a href="http://en.wikipedia.org/wiki/Citizen_science">turning to amateurs</a> to solve critical scientific problems. Help out with one of our projects below.</p>
                <hr />
                <p className={s.title} style={{marginBottom: '0px'}}><a href="http://gameswithwords.org/VerbCorner">VerbCorner</a></p>
                <p className={s.blurb}>Help us crowdsource the structure of language, meaning, and thought</p>
                <hr />
                <p>More coming soon... In the meantime, check <a href="http://scistarter.org">SciStarter.org</a> for more &quot;citizen science&quot; projects.</p>
              </div>
            </b.Col>
          </b.Row>
        </div>
      </div>
    );
  }

}

export default HomePage;
