export const USER_INFO = 'USER_INFO';
export const SUBMIT_COMMENTS_BEGIN = 'SUBMIT_COMMENTS_BEGIN';
export const SUBMIT_COMMENTS_SUCCESS = 'SUBMIT_COMMENTS_SUCCESS';
import local from './axiosConfigInitial';

export function userInfo(info) {
  return {
    type: USER_INFO,
    info,
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
    local.post('/api/comments', comments, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.data).then(data => {
        console.log(data);
      });
  };
}

