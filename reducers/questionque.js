import {
  NEXT_QUESTION,
  REQUEST_QUESTION_BEGIN,
} from '../actions/questionque';
import {
  BUILD_INITIAL,
} from '../actions/questionlist';

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
    case BUILD_INITIAL: {
      return {
        ...state,
        current: action.list[0],
        next: action.list[1],
        isFetching: false
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
    default:
      return state;
  }
}
