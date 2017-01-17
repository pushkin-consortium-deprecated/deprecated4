import {
  USER_RESPONSES,
} from '../actions/userresponses';

export default function responses(state = { response: [] }, action) {
  switch (action.type) {
    case USER_RESPONSES: {
      return {
        ...state,
        response: [...state.response, action.response]
      };
    }
    default:
      return state;
  }
}
