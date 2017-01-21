
import local from './axiosConfigInitial';
import { requestQuestionBegin } from './fetch';
import { error } from './error';

export const CURRENT_QUESTION = 'CURRENT_QUESTION';
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const COMPLETE_QUESTION = 'COMPLETE_QUESTION';
export const SET_RESULTS = 'SET_RESULTS';

export function nextQuestion(nextQuestion) {
  return {
    type: NEXT_QUESTION,
    nextQuestion,
  };
}
export function currentQuestion(currentQuestion) {
  return {
    type: CURRENT_QUESTION,
    currentQuestion,
  };
}
function completeQuestion(completeQuestion) {
  return {
    type: COMPLETE_QUESTION,
    completeQuestion,
  }
}
function setResults(results) {
  return {
    type: SET_RESULTS,
    results,
  };
}
export function postAnswerGetQuestion(response) {
  return (dispatch, getState) => {
    dispatch(requestQuestionBegin());
    return local.post('response', response)
    .then((resp) => {
      if(resp.error) {
        return dispatch(error(resp.error));
      }
      const state = getState();
      // TODO: make a dispatch to add this to the question list
      const ql = state.questionlist.data;
      if (!resp.data) {
        return local.get(`/results/${state.userInfo.id}`)
        .then(resp => resp.data.results)
        .then(results=> {
          dispatch(setResults(results));
          dispatch(nextQuestion(null))
          // dispatch(currentQuestion(null))
        });
      } else {
        ql.push(resp.data);
        dispatch(nextQuestion(resp.data));
        // dispatch(currentQuestion(state.questionque.next));
        // dispatch(completeQuestion(state.questionque.current));
      }
    })
    .catch(error => {
      return dispatch(error(error));
    });
  };
}


