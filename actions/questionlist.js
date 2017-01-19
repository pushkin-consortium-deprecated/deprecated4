import client from './axiosConfig';
import { nextQuestion } from './nextquestion';

export const QUESTION_LIST = 'QUESTION_LIST';

function sendQuestion(data) {
  return {
    type: QUESTION_LIST,
    data,
  };
}
export function questionList() {
  return (dispatch, getState) => {
    return client.get('initialQuestions')
    .then((resp) => {
      if (resp.error) {
        return console.log(resp.error);
      }
      return resp.data.map(currentQuestion => {
        return dispatch(sendQuestion(currentQuestion))
      })
    })
    .then(() => {
      const state = getState();
      console.log("i'm state!", state)
      const list = state.questionlist.data;
      return dispatch(nextQuestion(list[0]));
    });
  };
}
