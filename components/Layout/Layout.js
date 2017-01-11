/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import cx from 'classnames';
import Header from './Header';
import Footer from './Footer';
import * as b from 'react-bootstrap';
import s from './Layout.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class Layout extends React.Component {

  static propTypes = {
    className: PropTypes.string,
  };

  constructor(props){
    super(props);
    this.state = {};
    this.updateDimensions = this.updateDimensions.bind(this);
    this.imageLoaded = this.imageLoaded.bind(this);
    this.imageErrored = this.imageErrored.bind(this);
    this.bodyLoaded = this.bodyLoaded.bind(this);
    this.bodyErrored = this.bodyErrored.bind(this);
  }

  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
    window.removeEventListener('resize', this.updateDimensions);
  }

  home() {
    if ((window.location.pathname.toString()).split('/')[1] === '') {
      return true;
    }
    else {
      return false;
    }
  }

  bodyLoaded() {
    this.setState({bodyStatus: true});
  }

  bodyErrored() {
    this.setState({bodyStatus: false});
  }

  imageLoaded() {
    this.setState({imageStatus: true});
  }

  imageErrored() {
    this.setState({imageStatus: true});
  }

  updateDimensions() {
    if (window.innerWidth < 768 || this.home()) {
      this.setState({mobile: true});
    }
    else {
      this.setState({mobile: false});
    }
  }

  render() {
    return (
      <div ref={node => (this.root = node)}>
        <Header onLoad={this.imageLoaded} onError={this.imageErrored} />
          {this.state.imageStatus ? <div {...this.props} onLoad={this.bodyLoaded} onError={this.bodyErrored} className={cx(s.content, this.props.className)} style={{marginBottom: '120px'}} /> : null}
        {this.state.bodyStatus ? <Footer imageStatus={this.state.bodyStatus}/> : null}
      </div>
    );
  }
}

export default Layout;
