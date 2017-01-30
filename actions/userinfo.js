import local from './axiosConfigInitial';
export const SUBMIT_USER_INFO_BEGIN = 'SUBMIT_USER_INFO_BEGIN';
export const SUBMIT_USER_INFO_SUCCESS = 'SUBMIT_USER_INFO_SUCCESS';
export const SUBMIT_COMMENTS_BEGIN = 'SUBMIT_COMMENTS_BEGIN';
export const SUBMIT_COMMENTS_SUCCESS = 'SUBMIT_COMMENTS_SUCCESS';

function submitUserInfoBegin() {
  return {
    type: SUBMIT_USER_INFO_BEGIN
  }
}
function submitUserInfoSuccess(data) {
  return {
    type: SUBMIT_USER_INFO_SUCCESS,
    data,
  }
}
export function submitUserInfo(info) {
  return (dispatch, getState) => {
    const state = getState();
    const userId = state.userInfo.id;
    delete info.id;
    const payload = {...info, id: userId};
    dispatch(submitUserInfoBegin());
    local.put(`users/${userId}`, payload, {
      headers: { 'Content-Type': 'application/json' }
    })
    .then(resp => resp.data)
    .then(data => {
      return dispatch(submitUserInfoSuccess(data))
    });
  }
}

function submitCommentsBegin() {
  return { type: SUBMIT_COMMENTS_BEGIN };
}

function submitCommentsSuccess(data) {
  return { type: SUBMIT_COMMENTS_SUCCESS, data };
}
export function submitComments(comments) {
  return (dispatch, getState) => {
    const state = getState();
    if (state.userInfo.id) {
      const userId = state.userInfo.id;
      let payload;
      if (comments.nativeLanguages) {
        payload = {
          userId,
          ...comments,
        };
      }

      dispatch(submitCommentsBegin());
      local
        .post('/comments', payload, {
          headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.data)
        .then(data => {
          const nativeLanguages = new Set();
          const primaryLanguages = new Set();
          for (let i = 0; i < data.userLanguages.length; i++) {
            const lang = data.userLanguages[i];
            if (lang.primary) {
              primaryLanguages.add(lang.language.name);
            }
            if (lang.native) {
              nativeLanguages.add(lang.language.name);
            }
          }
          const obj = {
            nativeLanguages: [ ...nativeLanguages ],
            primaryLanguages: [ ...primaryLanguages ]
          };
          return dispatch(submitCommentsSuccess(obj));
        });
    } else {
      throw new Error(
        'there is no user id to attach these comments and demographic data too'
      );
    }
  };
}