/* eslint-disable max-len */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Intro from './content/intro';
import { Scripts } from './scripts';
import { userInfo } from '../../../actions/userinfo';
import { Line } from 'rc-progress';
import Globe from './globe';
import MultiChoice from './content/multichoice';
import MultiPicture from './content/multipicture';
import MultiSelect from './content/multiselect';
import ResultsContainer from '../../containers/ResultsContainer';
import LastPage from './content/lastPage';

import { nextPage, progressPrecent } from '../../../actions/nextpage';
import { postAnswerGetQuestion } from '../../../actions/questionque';
import { questionList } from '../../../actions/questionlist';

class StartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.props.dispatch(questionList());
  }
  dispatchUserInfo(state) {
    this.props.dispatch(userInfo(state));
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
  handleProgressBar() {
    if (this.props.nextpage.page > 2) {
      return (
        <div style={{ marginTop: 10 }}>
          <label> Progress: {this.props.nextpage.precent} / 38 </label>
          <Line
            percent={this.props.nextpage.precent}
            strokeWidth="4"
            strokeColor="#68C8F5"
          />
        </div>
      );
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
    this.dispatchUserInfo(this.state);
    this.dispatchProgress();
  };
  dispatchProgress = () => {
    const props = this.props;
    props.dispatch(progressPrecent(parseInt(props.nextpage.precent, 10) + 1));
  };
  addCompleteQuestion = response => {
    const props = this.props;
    props.dispatch(completeQuestion(response));
  };
  handlePictureChoices(currentQuestion) {
    if(currentQuestion.type === "survey-multi-picture") {
      return currentQuestion.choices.map(currentChoice => {
        return {
          url: currentChoice.imageUrl,
          label: currentChoice.displayText,
          choiceId: currentChoice.id
        };
      });
    }
    return currentQuestion.choices.map(currentChoice => {
      return currentChoice.imageUrl;
    })
  }
  fetchNextQuestion = response => {
    const props = this.props;
    props.dispatch(postAnswerGetQuestion(response));
  };
  handleTextChange() {
    let buttonText;
    if (this.props.nextpage.page === 2) {
      buttonText = 'Start Quiz';
    } else {
      buttonText = 'Next';
    }
    if (this.props.nextpage.page === 6) {
      if (this.props.questionque.isFetching) {
        return <h3>Loading ... </h3>;
      }
      if (!this.props.questionque.current) {
        return <ResultsContainer />
      } else {
        const choices = this.handlePictureChoices(this.props.questionque.current);
        switch (this.props.questionque.current.type) {
          case "survey-multi-picture" : {
            return (
              <div>
                <MultiPicture
                  question={this.props.questionque.current.prompt}
                  choices={choices}
                  questionId={this.props.questionque.current.choices[0].questionId}
                  trialId={this.props.questionque.current.trialId}
                  nextQuestion={this.fetchNextQuestion}
                  completeQuestion={this.addCompleteQuestion}
                  progress={this.dispatchProgress}
                  userId={this.props.userInfo.id}
                />
                {this.handleProgressBar()}
              </div>
            );
          }
          case "survey-multi-choice" : {
            return (
              <div>
                <MultiChoice
                    question={this.props.questionque.current.prompt}
                    choices={choices}
                    allChoices = {this.props.questionque.current.choices}
                    questionId={this.props.questionque.current.choices[0].questionId}
                    trialId={this.props.questionque.current.trialId}
                    nextQuestion={this.fetchNextQuestion}
                    completeQuestion={this.addCompleteQuestion}
                    progress={this.dispatchProgress}
                    userId={this.props.userInfo.id}
                />
                {this.handleProgressBar()}
              </div>
            );
          }
          case "survey-multi-select" : {
            return (
              <div>
                <MultiSelect
                      question={this.props.questionque.current.prompt}
                      choices={choices}
                      allChoices={this.props.questionque.current.choices}
                      questionId={this.props.questionque.current.choices[0].questionId}
                      trialId={this.props.questionque.current.trialId}
                      nextQuestion={this.fetchNextQuestion}
                      completeQuestion={this.addCompleteQuestion}
                      progress={this.dispatchProgress}
                      userId={this.props.userInfo.id}
                />
                {this.handleProgressBar()}
              </div>
            );
          }
        }
      }
    }
    return (
      <div>
        <Intro
          content={this.props.nextpage.content}
          page={this.props.nextpage.page}
          setState={this.handleStateChange}
        />
        <button
          onClick={this.dispatchNextPage}
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
    if (this.props.nextpage.page !== 5) {
      const logo = require('../../../public/img/globe.jpg');
      return <Globe logo={logo} content={Scripts[0]} />;
    }
    return null;
  }
  render() {
    if (this.props.questionque.isFetching) {
      return <h3> loading ... </h3>;
    }
    const logo = require('../../../public/img/globe.jpg');
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
StartPage.propTypes = { dispatch: React.PropTypes.func };

export default connect(state => state)(StartPage);
