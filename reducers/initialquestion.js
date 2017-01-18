import {
  QUESTION_LIST,
} from '../actions/initialquestion';

export default function initialQuestion(state = { data: [] }, action) {
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
