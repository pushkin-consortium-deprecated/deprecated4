import Axios from 'axios';
import local from './axiosConfigInitial';
import { browserHistory } from 'react-router';
import { error } from './error';
import { AUTH_CONFIG } from './auth0-variables';

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

const lock = new Auth0Lock(AUTH_CONFIG.clientId, AUTH_CONFIG.domain, {
  languageDictionary: {
    title: 'Pushkin'
  },
  // allowedConnections: ['facebook', 'Username-Password-Authentication'],
  // oidcConformant: true,
  autoclose: true,
  autoParseHash: true,
  auth: {
    autoParseHash: true,
    // connectionScopes: {
    //   facebook: ['email']
    // },
    // redirectUrl: AUTH_CONFIG.callbackUrl,
    // redirectUrl: 'http://localhost:8000/loading',
    redirect: false,
    // popup: true,
    // sso: true,
    responseType: 'token id_token',
    // audience: AUTH_CONFIG.audience,

    params: {
      scope: 'openid email' // Learn about scopes: https://auth0.com/docs/scopes
      // state: 36000
    }
  }
});
export function login() {
  lock.show();
  return dispatch => {
    return dispatch(loginRequest());
  };
}
function loginRequest() {
  return {
    type: LOGIN_REQUEST
  };
}

export function loginSuccess(profile) {
  return {
    type: LOGIN_SUCCESS,
    profile
  };
}

function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error
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
    const location = getState().userInfo.loginLocation;
    // Add callback for lock's `authenticated` event
    lock.on('authenticated', authResult => {
      return new Promise((res, rej) => {
        res(authResult);
      })
        .then(authResult => {
          let expiresAt = JSON.stringify(36000 * 1000 + new Date().getTime());
          localStorage.setItem('access_token', authResult.accessToken);
          localStorage.setItem('id_token', authResult.idToken); // static method
          localStorage.setItem('expires_at', expiresAt);
          return authResult;
        })
        .then(authResult => {
          return dispatch(getUserInfo());
        });
    });
    // });
    // Add callback for lock's `authorization_error` event
    lock.on('authorization_error', error => dispatch(loginError(error)));
  };
}
export function updateUser(payload, userId) {
  const data = {
    user_metadata: { ...payload }
  };
  return dispatch => {
    return Axios.patch(`https://gww.auth0.com/api/v2/users/${userId}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('id_token')
      }
    }).then(resp => {
      return {
        email: resp.data.email,
        user_id: resp.data.user_id,
        user_metadata: resp.data.user_metadata
      };
    });
  };
}

export function resetPassword(email) {
  return dispatch => {
    const payload = {
      client_id: 'OIzT7gmLYcxbLZWGDz7LAsX6i2iCP2tc',
      email: email,
      connection: 'Username-Password-Authentication'
    };
    return Axios.post(
      'https://gww.auth0.com/dbconnections/change_password',
      payload,
      {
        headers: { 'content-type': 'application/json' }
      }
    ).then(resp => {
      swal(resp.data, null, 'success');
      return dispatch(resetPasswordEmailSent());
    });
  };
}
function resetPasswordEmailSent() {
  return {
    type: 'RESET_PASSWORD_EMAIL_SENT'
  };
}
export function logout() {
  localStorage.clear();
  browserHistory.replace('/dashboard');
  return {
    type: LOGOUT_SUCCESS
  };
}
export function isAuthenticated() {
  let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
  return new Date().getTime() < expiresAt;
}
function getAccessToken() {
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    return null;
  }
  return accessToken;
}
function getUserMetadata(userId) {
  return Axios.get(`https://gww.auth0.com/api/v2/users/${userId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('id_token')
    }
  }).then(resp => {
    return resp.data.user_metadata;
  });
}
export function getUserInfo() {
  let accessToken = getAccessToken();
  return (dispatch, getState) => {
    return new Promise((res, rej) => {
      if (!accessToken) {
        return local.post('/createUser').then(resp => {
          return dispatch(loginSuccess(resp.data));
        });
      }
      lock.getUserInfo(accessToken, (error, profile) => {
        if (error) {
          return rej(error);
        }
        return res(profile);
      });
    })
      .then(profile => {
        return getUserMetadata(profile.sub).then(meta => {
          if (!meta) {
            return updateUser({}, profile.sub);
          }
          return {
            user_metadata: meta,
            email: profile.email,
            user_id: profile.sub
          };
        });
      })
      .then(profile => {
        return local
          .post('/createUser', { auth0_id: profile.user_id })
          .then(res => {
            return dispatch(
              loginSuccess({
                ...profile,
                ...res.data
              })
            );
          });
      })
      .catch(error => {
        return dispatch(loginError(error));
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
        return dispatch(error(err));
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
