import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import userInfo from './userInfo';
import nextpage from './nextpage';
import questionque from './questionque';
import questionlist from './questionlist';
import error from './error';


export const rootReducer = combineReducers({
  nextpage,
  questionque,
  questionlist,
  userInfo,
  error,
  routing: routerReducer,
});
