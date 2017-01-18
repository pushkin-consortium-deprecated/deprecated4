import {
  QUESTION_LIST,
} from '../actions/questionlist';

export default function questionList(state = { data: [] }, action) {
  switch (action.type) {
    case QUESTION_LIST: {
      return {
        ...state,
        data: [...state.data, action.data],
      };
    }
    default:
      return state;
  }
}
