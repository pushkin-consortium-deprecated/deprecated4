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
import Layout from '../../components/Layout';
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
      this.setState({mobile: true});
    }
    else {
      this.setState({mobile: false});
    }
  }

  render() {
    return (
      <div>
        <f.Callout className={s.white}>
          <f.Row className="display" style={{marginTop: '90px', marginBottom: '90px'}}>
            <f.Column small={12} large={6} className={s.textCenter}>
              <b.Image src="/../../gif/3.gif" responsive className={s.gif}/>
            </f.Column>
            <f.Column small={12} large={5} className={s.textCenter}>
              <p className={s.title}><b>Contribute to linguistics research.</b></p>
              <p className={s.blurb}>With modern technology, it is the perfect time for professional and amateur scientists to collaborate. Together, we can explore the human mind by tackling the most pressing questions about our ability to acquire and learn language. What are you waiting for?</p>
            </f.Column>
          </f.Row>
        </f.Callout>
            {this.state.mobile 
            ?
            <f.Callout className={s.tan}>
              <f.Row className="display" style={{marginTop: '90px', marginBottom: '90px'}}>
                  <f.Column small={12} className={s.textCenter}>
                    <b.Image src="/../../gif/2.gif" responsive className={s.gif}/>
                  </f.Column>
                  <f.Column small={12} className={s.textCenter}>
                    <p className={s.title}><b>Collaborate with citizen scientists.</b></p>
                    <p className={s.blurb}>It doesn't matter who you are. Join our interdisciplinary team of psychologists, computer scientists, and linguists today. Whether it's contributing to our blog or posting a question in the forum, you can advance science and mingle with people who are just as interested in research as you are.</p> 
                  </f.Column>
              </f.Row>
            </f.Callout>
            : 
            null
            }
            {this.state.mobile 
            ? 
            null
            :
            <f.Callout className={s.tan}>
              <f.Row className="display" style={{marginTop: '90px', marginBottom: '90px'}}>
                  <f.Column large={1} />
                  <f.Column large={5} className={s.textCenter}>
                    <p className={s.title}><b>Collaborate with citizen scientists.</b></p>
                    <p className={s.blurb}>It doesn't matter who you are. Join our interdisciplinary team of psychologists, computer scientists, and linguists today. Whether it's contributing to our blog or posting a question in the forum, you can advance science and mingle with people who are just as interested in research as you are.</p>
                  </f.Column>
                  <f.Column large={6} className={s.textCenter}>
                    <b.Image src="/../../gif/2.gif" responsive className={s.gif}/>
                  </f.Column>
              </f.Row>
            </f.Callout>
            }

        <f.Callout className={s.white}>
          <f.Row className="display" style={{marginTop: '90px', marginBottom: '0px'}}>
            <f.Column small={12} large={6} className={s.textCenter}>
              <b.Image src="/../../gif/1.gif" responsive className={s.gif}/>
            </f.Column>
            <f.Column small={12} large={5} className={s.textCenter}>
              <p className={s.title}><b>Discover new findings and learn.</b></p>
              <p className={s.blurb}>As volunteer scientists, you deserve to know the various exciting results produced from the lab. Head on over to the blog for articles, subscribe to our mailing list, and get ready to unlock the mysteries of human language.</p>
            </f.Column>
          </f.Row>
        </f.Callout>
      </div>

    );
  }

}

export default HomePage;
