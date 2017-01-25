import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import userInfo from './userinfo';
import nextpage from './nextpage';
import questionque from './questionque';
import error from './error';
import { reducer as formReducer } from 'redux-form';


export const rootReducer = combineReducers({
  nextpage,
  questionque,
  userInfo,
  error,
  routing: routerReducer,
  form: formReducer,
});
