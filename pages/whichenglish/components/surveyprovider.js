/* eslint-disable max-len */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import MultiChoice from './content/multichoice';
import MultiPicture from './content/multipicture';
import MultiSelect from './content/multiselect';
import Instruction from './content/instruction';
import ResultsContainer from '../../containers/ResultsContainer';
import { Scripts } from './scripts';
import { questionList } from '../../../actions/questionlist';
import { postAnswerGetQuestion } from '../../../actions/questionque';
import { saveAnswers } from '../../../actions/saveanswers';
import { startInstruction } from '../../../actions/instruction';

class SurveyProvider extends React.Component {
  componentWillMount() {
    console.log("i'm scripts ",Scripts)
    // uncomment line 30 to save answers
    // you can find your answers saved under state.questionque -> answers
    //this.props.dispatch(saveAnswers());
    this.props.dispatch(startInstruction(Scripts.instruction))
  }
  buildInitial = () => {
    this.props.dispatch(questionList());
  }
  fetchNextQuestion = (response, answer) => {
    const props = this.props;
    if (!response.choiceId) {
      console.log(response, 'had no choice id');
    } else {
      props.dispatch(postAnswerGetQuestion(response));
    }
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
  render() {
    if (this.props.questionque.instruction) {
      return (
        <Instruction
          text={this.props.questionque.instruction}
          buidInitial={this.buildInitial}
        />
      )
    }
    if (this.props.questionque.isFetching && !this.props.questionque.current) {
      return <h3>Loading ... </h3>;
    }
    if (!this.props.questionque.current && !this.props.questionque.isFetching) {
      return <ResultsContainer />
    }
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
              progress={this.props.progress}
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
                progress={this.props.progress}
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
              progress={this.props.progress}
              userId={this.props.userInfo.id}
            />
          </div>
        );
      }
      default:
        return null;
    }
  }
}
export default connect(state => state)(SurveyProvider);
