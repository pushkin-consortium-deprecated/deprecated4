import {
  SUBMIT_USER_INFO_BEGIN,
  SUBMIT_USER_INFO_SUCCESS,
  SUBMIT_COMMENTS_BEGIN,
  SUBMIT_COMMENTS_SUCCESS,
  USER_ID,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  LOGIN_LOCATION,
  TEMP_USER_ID
} from '../actions/userinfo';

// import {
//   SET_RESULTS
// } from '../actions/questionque';

export default function userInfo(state = { profile: null }, action) {
  switch (action.type) {
    case SUBMIT_USER_INFO_SUCCESS: {
      return {
        ...state,
        gender: action.data.gender,
        age: action.data.age,
        takenBefore: action.data.takenBefore,
        languageDisorder: action.data.languageDisorder,
        education: action.data.education,
        isFetching: false
      };
    }
    case SUBMIT_USER_INFO_BEGIN: {
      return {
        ...state,
        isFetching: true
      };
    }
    case USER_ID: {
      return {
        ...state,
        id: action.id,
        isFetching: false
      };
    }
    case SUBMIT_COMMENTS_BEGIN: {
      return {
        ...state,
        isFetching: true
      };
    }
    case SUBMIT_COMMENTS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        nativeLanguages: action.data.nativeLanguages,
        primaryLanguages: action.data.primaryLanguages
      };
    }
    case LOGIN_LOCATION: {
      return {
        ...state,
        loginLocation: action.location
      };
    }
    case TEMP_USER_ID: {
      return {
        ...state,
        tempUserId: action.id
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        profile: action.profile
      };
    }
    case LOGIN_ERROR: {
      return {
        ...state,
        error: action.error
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        profile: null
      };
    }
    default:
      return state;
  }
}
