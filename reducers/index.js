import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import userinfo from './userinfo';
import nextpage from './nextpage';
import questionque from './questionque';
import questionlist from './questionlist';
import error from './error';


export const rootReducer = combineReducers({
  nextpage,
  questionque,
  questionlist,
  userinfo,
  error,
  routing: routerReducer,
});
