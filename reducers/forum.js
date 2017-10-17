import { CREATE_POST, FETCH_ALL_POSTS, FETCHING } from '../actions/forum';

export default function forum(state = {}, action) {
  switch (action.type) {
    case CREATE_POST: {
      return {
        ...state,
        post: action.post
      };
    }
    case FETCH_ALL_POSTS: {
      return {
        ...state,
        fetching: false,
        allposts: action.data
      };
    }
    case FETCHING: {
      return {
        ...state,
        fetching: true
      };
    }
    default:
      return state;
  }
}
