/**
 * Created by mac002 on 7/31/17.
 */
import { combineReducers } from 'redux';
import db from './db';
import language from './language';
import user from './user';

export const reducers = combineReducers({
  db: db
  , language: language
  , user: user
});