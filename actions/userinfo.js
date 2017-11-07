import Axios from 'axios';
import local from './axiosConfigInitial';
import { browserHistory } from 'react-router';
import { error } from './error';
import { sendTempResponse, sendTempStimulusResponse } from './tempResponse';
import Auth from '../core/auth';
export const SUBMIT_USER_INFO_BEGIN = 'SUBMIT_USER_INFO_BEGIN';
export const SUBMIT_USER_INFO_SUCCESS = 'SUBMIT_USER_INFO_SUCCESS';
export const SUBMIT_COMMENTS_BEGIN = 'SUBMIT_COMMENTS_BEGIN';
export const SUBMIT_COMMENTS_SUCCESS = 'SUBMIT_COMMENTS_SUCCESS';
export const USER_ID = 'USER_ID';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const GENERATE_QUIZ_USER = 'GENERATE_QUIZ_USER';
export const LOGIN_LOCATION = 'LOGIN_LOCATION';
export const TEMP_USER_ID = 'TEMP_USER_ID';
const auth = new Auth();

function loginRequest() {
  return {
    type: LOGIN_REQUEST
  };
}
function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error
  };
}
function resetPasswordEmailSent() {
  return {
    type: 'RESET_PASSWORD_EMAIL_SENT'
  };
}
export function login() {
  auth.lock.show();
  return dispatch => {
    return dispatch(loginRequest());
  };
}
export function loginSuccess(profile) {
  return {
    type: LOGIN_SUCCESS,
    profile
  };
}

export function loginLocation(location) {
  return {
    type: 'LOGIN_LOCATION',
    location
  };
}
export function checkLogin(location) {
  return (dispatch, getState) => {
    return auth
      .checkLogin()
      .then(() => {
        return dispatch(getUserInfo());
      })
      .catch(err => {
        return dispatch(error(err));
      });
  };
}
export function resetPassword(email) {
  return dispatch => {
    return auth.resetPassword(email).then(resp => {
      swal(resp.data, null, 'success');
      return dispatch(resetPasswordEmailSent());
    });
  };
}
export function logout() {
  localStorage.clear();
  browserHistory.replace('/dashboard');
  return {
    type: LOGOUT_SUCCESS
  };
}
export function updateUser(payload, userId) {
  return dispatch => {
    return auth.updateUser(payload, userId).then(resp => {
      return {
        email: resp.email,
        user_id: resp.user_id,
        user_metadata: resp.user_metadata
      };
    });
  };
}
export function isAuthenticated() {
  return auth.isAuthenticated();
}
export function sendTempId(id) {
  return {
    type: TEMP_USER_ID,
    id
  };
}
export function getUserInfo() {
  let accessToken = auth.getAccessToken();
  return (dispatch, getState) => {
    if (!accessToken) {
      return dispatch(
        loginSuccess({
          anonymous: true
        })
      );
    }
    return new Promise((res, rej) => {
      auth.lock.getUserInfo(accessToken, (error, profile) => {
        if (error) {
          return rej(error);
        }
        return res(profile);
      });
    })
      .then(profile => {
        return auth.getUserMetadata(profile.sub).then(meta => {
          if (!meta) {
            return auth.updateUser({}, profile.sub).then(resp => {
              return {
                email: resp.email,
                user_id: resp.user_id,
                user_metadata: resp.user_metadata
              };
            });
          }
          return {
            user_metadata: meta,
            email: profile.email,
            user_id: profile.sub
          };
        });
      })
      .then(profile => {
        const tempId = localStorage.getItem('tempUser');
        return local
          .post('/createUser', { auth0_id: profile.user_id, user_id: tempId })
          .then(res => {
            //comment get this back to the way it was
            dispatch(
              loginSuccess({
                ...profile,
                ...res.data
              })
            );
            return {
              ...profile,
              ...res.data
            };
          })
          .then(data => {
            const tempUser = localStorage.getItem('tempUser');
            const tempResponses = getState().tempResponses.tempResponse;
            const tempStimulusResponse = getState().tempStimulusResponse;
            if (tempUser) {
              if (tempResponses) {
                tempResponses.map(response => {
                  response.user_id = data.id;
                  return local.post('/response', response).then(res => {
                    res.json(data);
                  });
                });
              }
              if (tempStimulusResponse) {
                tempStimulusResponse.map(response => {
                  response.user_id = data.id;
                  return local.post('/stimulusResponse', response).then(res => {
                    res.json(data);
                  });
                });
              }
            }
            return tempUser;
          })
          .then(tempUser => {
            if (tempUser) {
              return local.post('/deleteUser', { id: tempUser }).then(data => {
                dispatch(sendTempResponse([]));
                dispatch(sendTempStimulusResponse([]));
                localStorage.removeItem('tempUser');
              });
            }
          });
      })
      .catch(error => {
        return dispatch(loginError(error));
      });
  };
}
export function generateAnonymousUser() {
  return dispatch => {
    return local.post('/createUser').then(resp => {
      localStorage.setItem('tempUser', resp.data.id);
      return dispatch(loginSuccess(resp.data));
    });
  };
}
export function updateUserWithAuth0Id(auth0_id, user_id) {
  return dispatch => {
    return local
      .post('/updateUser', { auth0_id: auth0_id, user_id: user_id })
      .then(resp => {
        return dispatch(loginSuccess(resp.data));
      });
  };
}
function submitUserInfoBegin() {
  return {
    type: SUBMIT_USER_INFO_BEGIN
  };
}
function submitUserInfoSuccess(data) {
  return {
    type: SUBMIT_USER_INFO_SUCCESS,
    data
  };
}
export function getUserId() {
  return dispatch => {
    dispatch(submitUserInfoBegin());
    return local
      .get('initialQuestions')
      .then(resp => {
        if (resp.error) {
          return dispatch(error(resp.error));
        }
        return dispatch(sendUserId(resp.data.user.id));
      })
      .catch(err => {
        throw err;
      });
  };
}
export function submitUserInfo(info) {
  return (dispatch, getState) => {
    const state = getState();
    const userId = state.userInfo.id;
    const payload = { ...info, id: userId };
    dispatch(submitUserInfoBegin());
    local
      .put(`users/${userId}`, payload, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then(resp => resp.data)
      .then(data => {
        return dispatch(submitUserInfoSuccess(data));
      });
  };
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
          ...comments
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
            nativeLanguages: [...nativeLanguages],
            primaryLanguages: [...primaryLanguages]
          };
          return dispatch(submitCommentsSuccess(obj));
        })
        .then(() => {
          browserHistory.push(`/results/user/${userId}`);
        });
    } else {
      throw new Error(
        'there is no user id to attach these comments and demographic data too'
      );
    }
  };
}
