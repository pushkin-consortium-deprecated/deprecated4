export const USER_RESPONSES = 'USER_RESPONSES';
export const FETCH_QUESTION = 'FETCH_QUESTION';
import axios from 'axios';
export const SUBMIT_COMMENTS_BEGIN = 'SUBMIT_COMMENTS_BEGIN';
export const SUBMIT_COMMENTS_SUCCESS = 'SUBMIT_COMMENTS_SUCCESS';

export function received() {
  return {
    type: FETCH_QUESTION,
  };
}
export function userResponse(response) {
  // for collecting information of the user to store in schema
  return {
    type: USER_RESPONSES,
    response,
  };
}

function submitCommentsBegin() {
  return {
    type: SUBMIT_COMMENTS_BEGIN,
  };
}
function submitCommentsSuccess() {
  return {
    type: SUBMIT_COMMENTS_SUCCESS,
  };
}

export function submitComments(comments) {
  return (dispatch) => {
    dispatch(submitCommentsBegin());
    axios.post('/api/comments', comments, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.data).then(data => {
        console.log(data);
      });
  };
}
