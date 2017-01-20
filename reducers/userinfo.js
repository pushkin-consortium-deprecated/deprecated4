import {
  USER_INFO,
} from '../actions/userinfo';
import {
  USER_ID,
} from '../actions/questionlist';

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
    default:
      return state;
  }
}
