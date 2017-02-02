import {
  NEXT_QUESTION,
  ANSWER_COLLECTION,
} from '../actions/questionque';
import {
  BUILD_INITIAL,
} from '../actions/questionlist';
import {
  REQUEST_QUESTION_BEGIN,
} from '../actions/fetch';

export default function nextQuestion(state = {
  isFetching: false,
  next: null,
  current: null,
  complete: [],
  answers: [],
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
    case ANSWER_COLLECTION: {
      return {
        ...state,
        answers: [...state.answers, action.answer],
      };
    }
    default:
      return state;
  }
}
