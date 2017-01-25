import {
  CURRENT_QUESTION,
  NEXT_QUESTION,
  COMPLETE_QUESTION,
  REQUEST_QUESTION_BEGIN,
} from '../actions/questionque';

export default function nextQuestion(state = {
  isFetching: false,
  next: null,
  current: null,
  complete: [],
}, action) {
  switch (action.type) {
    case REQUEST_QUESTION_BEGIN: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case 'BUILD_INITIAL': {
      return {
        ...state,
        current: action.list[0],
        next: action.list[1],
      };
    }
    case CURRENT_QUESTION: {
      return {
        ...state,
        current: action.currentQuestion,
        isFetching: false,
      };
    }
    case NEXT_QUESTION: {
      return {
        ...state,
        next: action.nextQuestion,
        current: state.next,
        complete: [...state.complete, state.current],
        isFetching: false,
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
