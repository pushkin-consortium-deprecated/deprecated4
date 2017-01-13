import {
  USER_RESPONSES,
} from '../actions/userresponses';

export default function responses(state = {}, action) {
  switch (action.type) {
    case USER_RESPONSES: {
      return {
        ...state,
        answer: action.response.response,
        time_elapsed: action.response.time_elapsed,
        trial_type: action.response.trial_type,
      };
    }
    default:
      return state;
  }
}
