import {
  QUESTION_LIST,
  FETCHING_LIST,
} from '../actions/questionlist';

export default function questionList(state = { data: [], isFetching: false }, action) {
  switch (action.type) {
    case FETCHING_LIST: {
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
