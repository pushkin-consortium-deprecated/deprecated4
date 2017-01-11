import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import userInfo from './userinfo';

export const rootReducer = combineReducers({
  userInfo,
  routing: routerReducer,
});
