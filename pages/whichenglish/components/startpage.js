/* eslint-disable max-len */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Intro from './content/intro';
import { Scripts } from './scripts';
import { submitUserInfo } from '../../../actions/userinfo';
import { Line, Circle } from 'rc-progress';
import Globe from './globe';
import Progress from './progress';
import MultiChoice from './content/multichoice';
import MultiPicture from './content/multipicture';
import MultiSelect from './content/multiselect';
import ResultsContainer from '../../containers/ResultsContainer';
import LastPage from './content/lastPage';

import { nextPage, progressPrecent } from '../../../actions/nextpage';
import { postAnswerGetQuestion } from '../../../actions/questionque';
import { questionList } from '../../../actions/questionlist';
import { saveAnswers } from '../../../actions/saveanswers';

class StartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    // uncomment line 30 to save answers
    // you can find your answers saved under state.questionque -> answers
    //this.props.dispatch(saveAnswers());
    this.props.dispatch(questionList());
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
    props.dispatch(progressPrecent((parseFloat(props.nextpage.precent) + 2.63).toFixed(2)));
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
      return currentChoice.displayText;
    })
  }
  fetchNextQuestion = (response, answer) => {
    const props = this.props;
    if (!response.choiceId) {
      console.log(response, 'had no choice id');
    } else {
      props.dispatch(postAnswerGetQuestion(response));
    }
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
      </div>
    );
  }
  handleLogo() {
    if (this.props.nextpage.page < 3) {
      const logo = require('../../../public/img/globe.jpg');
      return <Globe logo={logo} content={Scripts[0]} />;
    }
    if(this.props.questionque.current) {
      if (this.props.questionque.current.type === 'survey-multi-choice' || this.props.questionque.current.type === 'survey-multi-select') {
        return <Globe logo={this.props.questionque.current.choices[0].imageUrl} content={null} />;
      }
    }
    return null;
  }
  handleProgressBar() {
    if(this.props.questionque.current && this.props.nextpage.page >=3 ) {
      return (
        <Progress strokeWidth="1" precent={this.props.nextpage.precent} />
      )
    }
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
            <h5 >Which English?</h5>
            {this.handleTextChange()}
            {this.handleProgressBar()}
          </div>
          {this.handleLogo()}
        </div>
      </div>
    );
  }
}
StartPage.propTypes = { dispatch: React.PropTypes.func };

export default connect(state => state)(StartPage);
