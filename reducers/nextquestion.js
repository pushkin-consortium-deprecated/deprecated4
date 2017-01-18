import {
  NEXT_QUESTION,
  INITIAL_QUESTION,
} from '../actions/nextquestion';
export default function nextQuestion(state = {}, action) {
  switch (action.type) {
    case INITIAL_QUESTION: {
      return {
        ...state,
        initalquestion: action.data,
      };
    }
    case NEXT_QUESTION: {
      return {
        ...state,
        question: action.question,
      };
    }
    default:
      return state;
  }
}
