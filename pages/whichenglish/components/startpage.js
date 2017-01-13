/* eslint-disable max-len */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Intro from './content/intro';
import { Scripts } from './scripts';
import { userInfo } from '../../../actions/userinfo';
import { Line } from 'rc-progress';
import Globe from './globe';
import Test from './content/test';

class StartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      content: Scripts[1],
      precent: -2,
    };
  }
  dispatchUserInfo(state) {
    this.props.dispatch(userInfo(state));
  }
  handleStateChange = (key, value) => {
    const state = this.state;
    state[key] = value;
    this.setState(state);
  }
  handleStart = () => {
    this.setState({
      page: parseInt(this.state.page, 10) + 1,
      content: Scripts[parseInt(this.state.page, 10) + 1],
      precent: parseInt(this.state.precent, 10) + 1,
    }, () => {
      this.dispatchUserInfo(this.state);
    });
  }
  handleDisable() {
    if (this.state.page === 3) {
      if (this.state.gender && this.state.age) {
        return false;
      }
      return true;
    }
    if (this.state.page === 4) {
      if (this.state.takenBefore && this.state.education && this.state.languageDisorder) {
        return false;
      }
      return true;
    }
    return null;
  }
  handleProgressBar() {
    if (this.state.page > 2) {
      return (
        <div style={{ marginTop: 10 }}>
          <label> Progress: {this.state.precent} / 38 </label>
          <Line percent={this.state.precent} strokeWidth="4" strokeColor="#68C8F5" />
        </div>
      );
    }
    return null;
  }
  handleTextChange() {
    let buttonText;
    if (this.state.page === 2) {
      buttonText = 'Start Quiz';
    } else {
      buttonText = 'Next';
    }
    if (this.state.page > 5) {
      return (
        <Test />
      );
    }
    return (
      <div>
        <Intro
          content={this.state.content}
          page={this.state.page}
          setState={this.handleStateChange}
        />
        <button
          onClick={this.handleStart}
          style={{ marginTop: 30, width: 180 }}
          className="btn btn-success"
          disabled={this.handleDisable()}
        >
          {buttonText}
        </button>
        {this.handleProgressBar()}
      </div>
    );
  }
  handleLogo() {
    if (this.state.page !== 5) {
      const logo = require('../../../public/img/globe.jpg')
      return (
        <Globe
          logo={logo}
          content={Scripts[0]}
        />
      );
    }
    return null;
  }
  render() {
    const logo = require('../../../public/img/globe.jpg')
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-8">
            <h5 style={{ marginTop: 20 }}>Which English?</h5>
            {this.handleTextChange()}
          </div>
          {this.handleLogo()}
        </div>
      </div>
    );
  }
}
StartPage.propTypes = {
  dispatch: React.PropTypes.func,
};

export default(connect(state => state))(StartPage);
