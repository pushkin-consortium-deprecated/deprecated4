import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import userInfo from './userinfo';
import responses from './userresponses';
import status from './receivefetch';
import nextpage from './nextpage';

export const rootReducer = combineReducers({
  responses,
  nextpage,
  status,
  userInfo,
  routing: routerReducer,
});
