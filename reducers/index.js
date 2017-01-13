import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import userInfo from './userinfo';
import responses from './userresponses';
import status from './receivefetch';

export const rootReducer = combineReducers({
  responses,
  status,
  userInfo,
  routing: routerReducer,
});
