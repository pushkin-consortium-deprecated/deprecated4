/* eslint-disable max-len */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { userInfo } from '../../../../actions/userinfo';

class Intro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: null,
      age: null,
      takenBefore: null,
      languageDisorder: null,
      education: null,
    };
    this.handleGender = this.handleGender.bind(this);
    this.handleAge = this.handleAge.bind(this);
    this.handleTakenBefore = this.handleTakenBefore.bind(this);
    this.handleEducation = this.handleEducation.bind(this);
    this.handleDisorder = this.handleDisorder.bind(this);
  }
  dispatchUserInfo(state) {
    this.props.dispatch(userInfo(state));
  }
  validateState() {
    if (this.state.gender && this.state.age && this.state.takenBefore && this.state.languageDisorder && this.state.education) {
      this.dispatchUserInfo(this.state)
    }
  }
  
  handleGender(e) {
    this.setState({
      gender: e.target.value,
    }, ()=>{
      this.validateState()
    })
  }
  handleAge(e) {
    this.setState({
      age: e.target.value,
    }, ()=>{
      this.validateState()
    })
  }
  handleTakenBefore(e) {
    this.setState({
      takenBefore: e.target.value,
    }, ()=>{
      this.validateState()
    })
  }
  handleDisorder(e) {
    this.setState({
      languageDisorder: e.target.value,
    }, ()=>{
      this.validateState()
    })
  }
  handleEducation(e) {
    this.setState({
      education: e.target.value,
    }, ()=>{
      console.log("this.state", this.state)
      this.validateState()
    })
  }
  showContent() {
    const location = this.props.page;
    console.log("i'm in showcontent", location)
    switch (location) {
      case 1:
        return (
          <div>
            <p>{this.props.content}</p>
          </div>
        );
      case 2:
        return (
          <div>
            <p>{this.props.content}</p>
          </div>
        );
      case 3:
        return (
          <div>
            <p>{this.props.content}</p>
            <div>
              <label>Gender:</label>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="optradio"
                  value="female"
                  onChange={this.handleGender}
                />
                Female
              </label>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="optradio"
                  value="male"
                  onChange={this.handleGender}
                />
                Male
              </label>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="optradio"
                  value="other"
                  onChange={this.handleGender}
                />
                Other
              </label>
            </div>
            <div className="form-group">
              <label>Age:</label>
              <input
                type="number"
                className="form-control"
                id="age"
                onBlur={this.handleAge}
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <div className="form-group">
            <label>Have you taken this quiz before?</label>
            <label className="radio-inline" id="group2">
              <input
                type="radio"
                name="group2"
                value="true"
                onChange={this.handleTakenBefore}
              />
              Yes
            </label>
            <label className="radio-inline" id="group2">
              <input
                type="radio"
                name="group2"
                value="false"
                onChange={this.handleTakenBefore}
              />
              No
            </label>
            </div>
            <label>Have you been diagnosed with dyslexia or another language or learning disorder?</label>
            <label className="radio-inline" id="group3">
              <input
                type="radio"
                name="group3"
                value="true"
                onChange={this.handleDisorder}
              />
              Yes
            </label>
            <label className="radio-inline" id="group3">
              <input
                type="radio"
                name="group3"
                value="false"
                onChange={this.handleDisorder}
              />
              No
            </label>
            <label>Highest level of education:</label>
            <select className="form-control" onChange={this.handleEducation}>
              <option value="Graduate Degree">Graduate Degree</option>
              <option value="Some Graduate School">Some Graduate School</option>
              <option value="three">Undergraduate Degree (3-5 years higher ed)</option>
              <option value="Some Undergrad (higher ed)">Some Undergrad (higher ed)</option>
              <option value="High School Degree (12-13 years ed)">High School Degree (12-13 years ed)</option>
              <option value="Haven't finished High School (less than 13 years ed)">Haven't finished High School (less than 13 years ed)</option>
            </select>
          </div>
        );
      default:
        return null;
    }
  }
  render() {
    console.log("this.props intro", this.props)
    return (
      <div>
      {this.showContent()}
      </div>
    );
  }
}
export default(connect(state => state))(Intro)
