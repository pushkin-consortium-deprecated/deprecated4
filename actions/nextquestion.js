
export const NEXT_QUESTION = 'NEXT_QUESTION';

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

