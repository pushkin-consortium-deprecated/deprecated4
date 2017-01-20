import local from './axiosConfigInitial';

import { currentQuestion, nextQuestion } from './questionque';
import { sendUser } from './user';

export const QUESTION_LIST = 'QUESTION_LIST';
export const ADD_QUESTION_TO_LIST = 'ADD_QUESTION_TO_LIST';

function sendQuestion(data) {
  return {
    type: QUESTION_LIST,
    data,
  };
}
export function questionList() {
  return (dispatch, getState) => {
    return local.get('initialQuestions')
    .then((resp) => {
      if (resp.error) {
        return console.error(resp.error);
      }
      return resp.data.map(cq => {
        return dispatch(sendQuestion(cq));
      });
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
    .then(() => {
      return local.post('/users', {
        name: 'Test',
      })
      .then((resp) => {
        return dispatch(sendUser(resp.data));
      });
    })
    .catch((error) => {
      return console.error(error);
    });
  };
}
