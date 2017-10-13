import local from './localAxios';

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
    local.get('/getAllForumPost').then(res => {
      return dispatch(sendAllPosts(res.data));
    });
  };
}
export function makePost(payload) {
  return dispatch => {
    local.post('/api/createPost', payload).then(res => {
      return dispatch(createPost(res));
    });
  };
}
