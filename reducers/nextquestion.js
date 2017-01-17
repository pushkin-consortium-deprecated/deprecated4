import {
  NEXT_QUESTION,
} from '../actions/nextquestion';
export default function nextQuestion(state = {}, action) {
  switch (action.type) {
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
