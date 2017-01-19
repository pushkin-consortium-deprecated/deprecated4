import {
  CURRENT_QUESTION,
  NEXT_QUESTION,
  COMPLETE_QUESTION,
} from '../actions/questionque';

export default function nextQuestion(state = {
  next: null,
  current: null,
  complete: [],
}, action) {
  switch (action.type) {
    case CURRENT_QUESTION: {
      return {
        ...state,
        current: action.currentQuestion,
      };
    }
    case NEXT_QUESTION: {
      return {
        ...state,
        next: action.nextQuestion,
      };
    }
    case COMPLETE_QUESTION: {
      return {
        ...state,
        complete: [...state.complete, action.completeQuestion],
      };
    }
    default:
      return state;
  }
}
