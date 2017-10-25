import local from './localAxios';
import { error } from './error';
export const FETCH_ALL_POSTS = 'FETCH_ALL_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const FETCHING = 'FETCHING';

function sendAllPosts(data) {
  return {
    type: FETCH_ALL_POSTS,
    data
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
      .catch(error => {
        return dispatch(error(error));
      });
  };
}
export function makePost(payload, cb) {
  return dispatch => {
    local
      .post('/createForumPost', payload, {
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
