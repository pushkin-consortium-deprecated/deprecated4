import local from './axiosConfigInitial';

import { currentQuestion, nextQuestion } from './questionque';
import { error } from './error';

export const QUESTION_LIST = 'QUESTION_LIST';
export const ADD_QUESTION_TO_LIST = 'ADD_QUESTION_TO_LIST';
export const USER_ID = 'USER_ID';
export const FETCHING_LIST = 'FETCHING_LIST';

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
function fetchingList() {
  return {
    type: FETCHING_LIST,
  };
}
function buildInitial(list) {
  return {
    type: 'BUILD_INITIAL',
    list,
  }
}
export function questionList() {
  return (dispatch, getState) => {
    dispatch(fetchingList());
    return local.get('initialQuestions')
    .then((resp) => {
      if (resp.error) {
        return dispatch(error(resp.error));
      }
      resp.data.questions.map(cq => {
        return dispatch(sendQuestion(cq));
      });
      dispatch(buildInitial(resp.data.questions));
      return resp.data;
    })
    .then((data) => {
      return dispatch(sendUserId(data.user.id));
    })
    .catch((err) => {
      return dispatch(error(err));
    });
  };
}
