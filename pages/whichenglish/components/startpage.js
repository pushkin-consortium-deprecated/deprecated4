/* eslint-disable max-len */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Intro from './content/intro';
import { Scripts } from './scripts';
import { userInfo } from '../../../actions/userinfo';

class StartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      content: Scripts[1],
    };
    this.handleStart = this.handleStart.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
  }
  dispatchUserInfo(state) {
    this.props.dispatch(userInfo(state));
  }
  handleStateChange(key, value) {
    const state = this.state;
    state[key] = value;
    this.setState(state);
  }
  handleStart() {
    this.setState({
      page: parseInt(this.state.page, 10) + 1,
      content: Scripts[parseInt(this.state.page, 10) + 1],
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
  handleTextChange() {
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
          Next
        </button>
      </div>
    );
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
          <div className="col-xs-4">
            <img src={logo} alt="" />
            <p>Which of the world&apos;s Englishes do you speak? Take this quiz, and our computer algorithm will try to guess. 10 minutes</p>
          </div>
        </div>
      </div>
    );
  }
}
StartPage.propTypes = {
  dispatch: React.PropTypes.func,
};

export default(connect(state => state))(StartPage);
