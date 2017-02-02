/* eslint-disable max-len */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Intro from './content/intro';
import { Scripts } from './scripts';
import { submitUserInfo, getUserId } from '../../../actions/userinfo';
import Globe from './globe';
import Progress from './progress';
import SurveyProvider from './surveyprovider';
import { nextPage, progressPrecent } from '../../../actions/nextpage';

class StartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.props.dispatch(getUserId());
  }
  dispatchUserInfo(state) {
    this.props.dispatch(submitUserInfo(state));
  }
  handleStateChange = (key, value) => {
    const state = this.state;
    state[key] = value;
    this.setState(state);
  };
  handleDisable() {
    if (this.props.nextpage.page === 3) {
      if (this.state.gender && this.state.age) {
        return false;
      }
      return true;
    }
    if (this.props.nextpage.page === 4) {
      if (
        this.state.takenBefore &&
          this.state.education &&
          this.state.languageDisorder
      ) {
        return false;
      }
      return true;
    }
    return null;
  }
  dispatchNextPage = () => {
    const props = this.props;
    props.dispatch(
      nextPage({
        page: parseInt(this.props.nextpage.page, 10) + 1,
        content: Scripts[parseInt(this.props.nextpage.page, 10) + 1]
      })
    );
    if(this.state.age && this.state.education && this.state.gender && this.state.languageDisorder && this.state.takenBefore) {
      this.dispatchUserInfo(this.state);
    }
    this.dispatchProgress();
  };
  dispatchProgress = () => {
    const props = this.props;
    props.dispatch(progressPrecent(Math.round((parseFloat(props.nextpage.precent) + 2.70) * 100) / 100));
  };
  handleTextChange() {
    let buttonText;
    if (this.props.nextpage.page === 2) {
      buttonText = 'Start Quiz';
    } else {
      buttonText = 'Next';
    }
    if (this.props.nextpage.page === 6) {
      return (
        <SurveyProvider 
          progress={this.dispatchProgress}
        />
      )
    }
    return (
      <div>
        <Intro
          content={this.props.nextpage.content}
          timeLimit={Scripts[0]}
          page={this.props.nextpage.page}
          setState={this.handleStateChange}
        />
        <button
          onClick={this.dispatchNextPage}
          style={{ marginTop: 40, width: 180 }}
          className="btn btn-success col-xs-offset-4"
          disabled={this.handleDisable()}
        >
          {buttonText}
        </button>
      </div>
    );
  }
  handleLogo() {
    if (this.props.nextpage.page < 3) {
      const logo = require('../../../public/img/globe.jpg');
      return <Globe logo={logo} content={Scripts[0]} />;
    }
    if (this.props.questionque.current) {
      if (this.props.questionque.current.type === 'survey-multi-choice' || this.props.questionque.current.type === 'survey-multi-select') {
        return <Globe logo={this.props.questionque.current.choices[0].imageUrl} content={null} />;
      }
    }
    return null;
  }
  handleProgressBar() {
    if( this.props.nextpage.page >=3 ) {
      return (
        <Progress strokeWidth="1" precent={this.props.nextpage.precent} />
      )
    }
  }
  render() {
    return (
      <div className="container row">
        <div className="col-xs-8">
          <h5 >Which English?</h5>
          {this.handleTextChange()}
          {this.handleProgressBar()}
        </div>
        {this.handleLogo()}
      </div>
    );
  }
}
StartPage.propTypes = { dispatch: React.PropTypes.func };

export default connect(state => state)(StartPage);
