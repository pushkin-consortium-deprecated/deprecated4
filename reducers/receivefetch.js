import {
  FETCH_QUESTION,
} from '../actions/userresponses';

export default function status(state = { action: null }, action) {
  switch (action.type) {
    case FETCH_QUESTION: {
      return {
        ...state,
        action: 'FETCH_QUESTION',
      };
    }
    default:
      return state;
  }
}
