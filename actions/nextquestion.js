import client from './axiosConfig';

export const NEXT_QUESTION = 'NEXT_QUESTION';
export const INITIAL_QUESTION = 'INITIAL_QUESTION';

function sendQuestion(data) {
  return {
    type: INITIAL_QUESTION,
    data,
  };
}
export function initialQuestion() {
  return (dispatch) => {
    return client.get('initialQuestions')
    .then((resp) => {
      if (resp.error) {
        return console.log(resp.error);
      }
      console.log("resp", resp)
      return dispatch(sendQuestion(resp.data));
    });
  };
}
export function nextQuestion(question) {
  // make response a param of this nextquestion
  // post response obj to endpoint
  // dispatch resp from api to redux store as question
  // return axios.post(api, response)
  // pass the first questions and options off to test component
  // on submit, fire nextQustion again to feed it user response
  // if response is undefined then its first question
  // do a simple get
  // else do a post with user response to get the new question
  return {
    type: NEXT_QUESTION,
    question,
  };
}

