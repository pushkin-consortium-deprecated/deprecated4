import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import userInfo from './userinfo';
import responses from './userresponses';
import status from './receivefetch';
import nextpage from './nextpage';
import nextquestion from './nextquestion';
import initialquestion from './initialquestion';

export const rootReducer = combineReducers({
  responses,
  nextpage,
  nextquestion,
  status,
  initialquestion,
  userInfo,
  routing: routerReducer,
});
