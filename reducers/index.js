import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import userdemographics from './userinfo';
import responses from './userresponses';
import status from './receivefetch';
import nextpage from './nextpage';
import questionque from './questionque';
import questionlist from './questionlist';
import userid from './user';


export const rootReducer = combineReducers({
  responses,
  nextpage,
  questionque,
  status,
  questionlist,
  userdemographics,
  userid,
  routing: routerReducer,
});
