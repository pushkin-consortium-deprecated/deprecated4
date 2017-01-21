import {
  USER_INFO,
  SUBMIT_COMMENTS_BEGIN,
  SUBMIT_COMMENTS_SUCCESS,
} from '../actions/userinfo';
import {
  USER_ID,
} from '../actions/questionlist';
import {
  SET_RESULTS
} from '../actions/questionque';

export default function userInfo(state = {}, action) {
  switch (action.type) {
    case USER_INFO: {
      return {
        ...state,
        gender: action.info.gender,
        age: action.info.age,
        takenBefore: action.info.takenBefore,
        languageDisorder: action.info.languageDisorder,
        education: action.info.education,
      };
    }
    case USER_ID: {
      return {
        ...state,
        id: action.id,
      };
    }
    case SUBMIT_COMMENTS_BEGIN: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case SUBMIT_COMMENTS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        nativeLanguages: action.data.nativeLanguages,
        primaryLanguages: action.data.primaryLanguages,
      };
    }
    case SET_RESULTS: {
      return {
        ...state,
        results: action.results,
      };
    }
    default:
      return state;
  }
}
