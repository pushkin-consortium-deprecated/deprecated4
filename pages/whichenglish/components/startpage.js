/* eslint-disable max-len */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Intro from './content/intro';
import { Scripts } from './scripts';

class StartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      content: Scripts[1],
    };
    this.handleStart = this.handleStart.bind(this);
  }
  handleStart() {
    this.setState({
      page: parseInt(this.state.page, 10) + 1,
      content: Scripts[parseInt(this.state.page, 10) + 1],
    }, ()=>{
      console.log("this.state", this.state)
    });
  }
  handleTextChange() {
    return (
      <div>
        <Intro
          content={this.state.content}
          page={this.state.page}
        />
        <button
          onClick={this.handleStart}
          style={{ marginTop: 30, width: 180 }}
          className="btn btn-success"
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
            <p>Which of the world&aposs Englishes do you speak? Take this quiz, and our computer algorithm will try to guess. 10 minutes</p>
          </div>
        </div>
      </div>
    );
  }
}
export default(connect(state => state))(StartPage)