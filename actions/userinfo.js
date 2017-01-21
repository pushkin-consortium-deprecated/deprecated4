export const USER_INFO = 'USER_INFO';
export const SUBMIT_COMMENTS_BEGIN = 'SUBMIT_COMMENTS_BEGIN';
export const SUBMIT_COMMENTS_SUCCESS = 'SUBMIT_COMMENTS_SUCCESS';
import local from './axiosConfigInitial';

export function userInfo(info) {
  return { type: USER_INFO, info };
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
      const payload = {
        userId,
        nativeLanguages: comments.nativeLanguages,
        primaryLanguages: comments.primaryLanguages,
        learnEnglishAge: comments.learnEnglishAge
      };

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
