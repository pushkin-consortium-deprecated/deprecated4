import local from './axiosConfigInitial';

import { currentQuestion, nextQuestion } from './questionque';
import { error } from './error';

export const QUESTION_LIST = 'QUESTION_LIST';
export const ADD_QUESTION_TO_LIST = 'ADD_QUESTION_TO_LIST';
export const USER_ID = 'USER_ID';

function sendQuestion(data) {
  return {
    type: QUESTION_LIST,
    data,
  };
}
function sendUserId(id) {
  return {
    type: USER_ID,
    id,
  };
}
export function questionList() {
  return (dispatch, getState) => {
    return local.get('initialQuestions')
    .then((resp) => {
      if (resp.error) {
        return dispatch(error(resp.error));
      }
      resp.data.questions.map(cq => {
        return dispatch(sendQuestion(cq));
      });
      return resp.data;
    })
    .then((resp) => {
      return dispatch(sendUserId(resp.user.id));
    })
    .then(() => {
      const state = getState();
      const list = state.questionlist.data;
      return dispatch(currentQuestion(list[0]));
    })
    .then(() => {
      const state = getState();
      const list = state.questionlist.data;
      return dispatch(nextQuestion(list[1]));
    })
    .catch((err) => {
      return dispatch(error(err));
    });
  };
}
