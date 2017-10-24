import Axios from 'axios';
import { AUTH_CONFIG } from './auth0-variables';
import { browserHistory } from 'react-router';

export default class Auth {
  lock = new Auth0Lock(AUTH_CONFIG.clientId, AUTH_CONFIG.domain, {
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
        scope: 'openid' // Learn about scopes: https://auth0.com/docs/scopes
        // state: 36000
      }
    }
  });
  setHeaders = idToken => {
    return {
      Authorization: 'Bearer ' + idToken
    };
  };
  checkIdToken = idToken => {
    return Axios.get('http://localhost/api/checkJWT', {
      headers: this.setHeaders(idToken)
    })
      .then(resp => {
        return resp.status;
      })
      .catch(error => {
        throw error;
      });
  };
  checkLogin = () => {
    return new Promise((res, rej) => {
      return this.lock.on('authenticated', authResult => {
        return res(authResult);
      });
    }).then(authResult => {
      return this.checkIdToken(authResult.idToken)
        .then(resp => {
          if (resp === 200) {
            let expiration;
            const oneDay = 1000 * 60 * 60 * 24;
            authResult.expiresIn
              ? (expiration = authResult.expiresIn * 100)
              : (expiration = oneDay);
            let expiresAt = JSON.stringify(expiration + new Date().getTime());
            localStorage.setItem('access_token', authResult.accessToken);
            localStorage.setItem('id_token', authResult.idToken); // static method
            localStorage.setItem('expires_at', expiresAt);
            document.cookie = `access_token=Bearer ${authResult.accessToken}`;
          } else {
            browserHistory.replace('/error');
          }
        })
        .catch(error => {
          throw error;
        });
    });
  };
  updateUser = (payload, userId) => {
    const data = {
      user_metadata: { ...payload }
    };
    const idToken = localStorage.getItem('id_token');
    return this.checkIdToken(idToken)
      .then(resp => {
        if (resp === 200) {
          return new Promise((res, rej) => {
            return Axios.patch(
              `https://gww.auth0.com/api/v2/users/${userId}`,
              data,
              {
                headers: this.setHeaders(idToken)
              }
            )
              .then(resp => {
                return res(resp.data);
              })
              .catch(error => {
                return rej(error);
              });
          });
        } else {
          browserHistory.replace('/error');
        }
      })
      .catch(error => {
        throw error;
      });
  };
  isAuthenticated = () => {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  };
  getUserMetadata = userId => {
    const idToken = localStorage.getItem('id_token');
    return this.checkIdToken(idToken)
      .then(resp => {
        if (resp === 200) {
          return new Promise((res, rej) => {
            return Axios.get(`https://gww.auth0.com/api/v2/users/${userId}`, {
              headers: this.setHeaders(idToken)
            })
              .then(resp => {
                return res(resp.data.user_metadata);
              })
              .catch(error => {
                return rej(error);
              });
          });
        } else {
          browserHistory.replace('/error');
        }
      })
      .catch(error => {
        throw error;
      });
  };
  getAccessToken = () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      return null;
    }
    return accessToken;
  };
  resetPassword = email => {
    return new Promise((res, rej) => {
      const payload = {
        client_id: 'OIzT7gmLYcxbLZWGDz7LAsX6i2iCP2tc',
        email: email,
        connection: 'Username-Password-Authentication'
      };
      return Axios.post(
        'https://gww.auth0.com/dbconnections/change_password',
        payload
      )
        .then(resp => {
          return res(resp);
        })
        .catch(error => {
          return rej(error);
        });
    });
  };
}
