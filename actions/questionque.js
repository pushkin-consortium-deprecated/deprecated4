
import local from './axiosConfigInitial';
import { requestQuestionBegin } from './fetch';
import { error } from './error';

export const NEXT_QUESTION = 'NEXT_QUESTION';
export const SET_RESULTS = 'SET_RESULTS';

export function nextQuestion(nextQuestion) {
  return {
    type: NEXT_QUESTION,
    nextQuestion,
  };
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
      const state = getState();
      if (resp.error) {
        return dispatch(error(resp.error));
      }
      if (!resp.data) {
        return local.get(`/results/${state.userInfo.id}`)
        .then(resp => resp.data.results)
        .then(results=> {
          dispatch(setResults(results));
          dispatch(nextQuestion(null))
        });
      } else {
        dispatch(nextQuestion(resp.data));
      }
    })
    .catch(err => {
      return dispatch(error(err));
    });
  };
}


