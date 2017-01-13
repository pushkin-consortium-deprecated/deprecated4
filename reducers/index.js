import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import userInfo from './userinfo';
import responses from './userresponses';

export const rootReducer = combineReducers({
  responses,
  userInfo,
  routing: routerReducer,
});
