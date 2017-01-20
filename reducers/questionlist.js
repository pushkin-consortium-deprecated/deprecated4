import {
  QUESTION_LIST,
} from '../actions/questionlist';
import {
  REQUEST_QUESTION_BEGIN,
} from '../actions/fetch';

export default function questionList(state = { data: [], isFeching: false }, action) {
  switch (action.type) {
    case REQUEST_QUESTION_BEGIN: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case QUESTION_LIST: {
      return {
        ...state,
        data: [...state.data, action.data],
        isFetching: false,
      };
    }
    default:
      return state;
  }
}
