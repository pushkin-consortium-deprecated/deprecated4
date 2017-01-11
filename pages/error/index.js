/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import history from '../../core/history';
import Link from '../../components/Link';
import Layout from '../../components/Layout';
import * as b from 'react-bootstrap';
import s from './styles.css';

class ErrorPage extends React.Component {

  static propTypes = {
    error: React.PropTypes.object,
  };

  constructor(){
    super();
    this.state = {};
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentWillMount() {
    window.addEventListener('resize', this.updateDimensions);
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

  componentDidMount() {
    this.updateDimensions();
    document.title = this.props.error && this.props.error.status === 404 ?
      'Page Not Found' : 'Error';
  }

  goBack = event => {
    event.preventDefault();
    history.goBack();
  };

  render() {
    // if (this.props.error) console.error(this.props.error); // eslint-disable-line no-console

    const [code, title] = this.props.error && this.props.error.status === 404 ?
      ['404', 'Page not found'] :
      // ['Error', this.props.error.toString()];
      ['Error', 'Oops, something went wrong'];

    return (
      <div>
        {/* needed for sticky footer */}
        <b.Image style={{display: 'none'}} src="/../../img/favicon.ico" />
        <div style={{margin: '20px', marginTop: this.state.mobile ? '50px' : '100px'}}>
          <b.Row>
            <b.Col xs={12}>
              <div className={s.center} style={this.state.mobile ? null : {marginRight: '20px'}}>
                <h1 className={s.code}>{code}</h1>
                <p className={s.title}>{title}</p>
                {code === '404' &&
                  <p className={s.text}>
                    The page you're looking for does not exist or an another error occurred.
                  </p>
                }
                <p className={s.text}>
                  <a href="/" onClick={this.goBack}>Go back</a>, or select an option from the menu above.
                </p>
              </div>
            </b.Col>
          </b.Row>
        </div>



      </div>
    );
  }

}

export default ErrorPage;
