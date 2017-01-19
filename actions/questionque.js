
import local from './axiosConfigInitial';
import remote from './axiosConfig';
import { addToList } from './questionlist';

export const CURRENT_QUESTION = 'CURRENT_QUESTION';
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const COMPLETE_QUESTION = 'COMPLETE_QUESTION';

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
export function postAnswerGetQuestion(response) {
  return (dispatch, getState) => {
    const state = getState();
    const next = state.questionque.next;
    console.log("response here!", response)
    return remote.post('response', response)
    .then((resp) => {
      console.log("yo in level 1", resp)
      dispatch(addToList(resp.data));
      return resp;
    })
    .then((resp) => {
      console.log("yo in level 2", resp)
      return dispatch(nextQuestion(resp.data));
    })
    .then(() => {
      return dispatch(currentQuestion(next));
    })
    .catch(error => {
      return console.error(error);
    });
  };
}
export function completeQuestion(completeQuestion) {
  return {
    type: COMPLETE_QUESTION,
    completeQuestion,
  }
}

