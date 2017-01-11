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
import * as i from 'react-social-icons';
import * as f from 'react-foundation';
import s from './Footer.css';

class Footer extends React.Component {

  constructor(){
    super();
    this.state = {};
    this.state.display = {display: 'none'};
    this.resize = this.resize.bind(this);
  }

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillMount() {
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
    window.removeEventListener('resize', this.resize);
  }

  getLocation() {
    return (window.location.pathname.toString()).split('/')[1];
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.bodyStatus !== this.state.imageStatus) {
      this.setState({ imageStatus: nextProps.imageStatus });
      this.resize();
    }
  }

  resize() {
    if (window.innerWidth < 768) {
      this.setState({mobile: {height: 35, width: 35}});
      this.setState({pad: s.pad5});
    }
    else {
      this.setState({mobile: null});
      this.setState({pad: s.pad7});
    }
    if (document.getElementById('container').scrollHeight <= window.innerHeight) {
      this.setState({bottom: null});
      this.setState({sticky: true});
    }
    else {
      let num = document.getElementById('container').scrollHeight - window.innerHeight;
      if (num <= 90 && this.state.sticky === true) {
        this.setState({bottom: {bottom: '-' + num.toString() + 'px'}});
      }
      else {
        this.setState({bottom: null});
        this.setState({sticky: false});
      }
    }
  }

  home() {
    if ((window.location.pathname.toString()).split('/')[1] === '') {
      return true;
    }
    else {
      return false;
    }
  }


  render() {
    return (
      <footer ref={node => (this.root = node)}>
        <f.Callout className={this.state.sticky ? s.sticky : s.normal} style={this.state.bottom} > 
          <div className={s.vert}>
                <nobr>
                <span className={this.state.pad}><i.SocialIcon style={this.state.mobile} color={this.home() ? '#ebebe1' : '#ffffff'} network="twitter" /></span>
                <span className={this.state.pad}><i.SocialIcon style={this.state.mobile} color={this.home() ? '#ebebe1' : '#ffffff'} network="facebook" /></span>
                <span className={this.state.pad}><i.SocialIcon style={this.state.mobile} color={this.home() ? '#ebebe1' : '#ffffff'} network="google" /></span>
                <span className={this.state.pad}><i.SocialIcon style={this.state.mobile} color={this.home() ? '#ebebe1' : '#ffffff'} network="linkedin" /></span>
                <span className={this.state.pad}><i.SocialIcon style={this.state.mobile} color={this.home() ? '#ebebe1' : '#ffffff'} network="pinterest" /></span>
                <span className={this.state.pad}><i.SocialIcon style={this.state.mobile} color={this.home() ? '#ebebe1' : '#ffffff'} network="vk" /></span>
                <span className={this.state.pad}><i.SocialIcon style={this.state.mobile} color={this.home() ? '#ebebe1' : '#ffffff'} network="email" /></span>
                </nobr>
          </div>
        </f.Callout>
      </footer>
    );
  }
}

export default Footer;

