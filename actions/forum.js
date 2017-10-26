import local from './localAxios';
import { error } from './error';
export const FETCH_ALL_POSTS = 'FETCH_ALL_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const FETCHING = 'FETCHING';
export const FETCH_ONE_POST = 'FETCH_ONE_POST';

function sendAllPosts(data) {
  return {
    type: FETCH_ALL_POSTS,
    data
  };
}
function sendOnePost(post) {
  return {
    type: FETCH_ONE_POST,
    post
  };
}
function createPost(post) {
  return {
    type: CREATE_POST,
    post
  };
}
function fetchAllPostsBegin() {
  return {
    type: FETCHING
  };
}
export function fetchAllPosts() {
  fetchAllPostsBegin();
  return dispatch => {
    local
      .get('/getAllForumPost')
      .then(res => {
        return dispatch(sendAllPosts(res.data));
      })
      .catch(err => {
        return dispatch(error(err));
      });
  };
}
export function getOnePost(id) {
  return new Promise((resolve, reject) => {
    return local
      .get(`/forumPosts/${id}`)
      .then(res => {
        return res.data;
      })
      .then(post => {
        return local
          .get(`/getAuth0User/${post.auth0_id}`, {
            params: {
              auth0_id: post.auth0_id
            }
          })
          .then(user => {
            resolve({
              ...post,
              ...user.data
            });
          });
      });
  }).catch(err => {
    throw err;
  });
}
export function makePost(payload, cb) {
  return dispatch => {
    local
      .post('/forumPosts', payload, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('id_token')
        }
      })
      .then(res => {
        return dispatch(createPost(res));
      })
      .then(() => {
        swal({
          title: 'Post created',
          type: 'success',
          text: 'You could track your post on the dashboard',
          onClose: cb()
        });
      })
      .catch(err => {
        return dispatch(error(err));
      });
  };
}
