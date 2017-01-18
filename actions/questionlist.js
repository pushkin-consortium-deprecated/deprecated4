import client from './axiosConfig';

export const QUESTION_LIST = 'QUESTION_LIST';

function sendQuestion(data) {
  console.log("getting called", data)
  return {
    type: QUESTION_LIST,
    data,
  };
}
export function initialQuestion() {
  return (dispatch) => {
    return client.get('initialQuestions')
    .then((resp) => {
      console.log("resp", resp)
      if (resp.error) {
        return console.log(resp.error);
      }
      return resp.data.map(currentQuestion => {
        return dispatch(sendQuestion(currentQuestion))
      })
    });
  };
}
