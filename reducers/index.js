import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import userInfo from './userinfo';
import nextpage from './nextpage';
import questionque from './questionque';
import error from './error';
import { reducer as formReducer } from 'redux-form';

const SAVE_ANSWERS = 'SAVE_ANSWERS';
function saveAnswers(state = { saveAnswers: false }, action) {
  switch (action.type) {
    case SAVE_ANSWERS: {
      return {
        saveAnswers: true,
      };
    }
    default:
      return state;
  }
}
export const rootReducer = combineReducers({
  options: saveAnswers,
  nextpage,
  questionque,
  userInfo,
  error,
  routing: routerReducer,
  form: formReducer,
});
