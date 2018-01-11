/**
 * Created by mac002 on 7/31/17.
 */
import { combineReducers } from 'redux';
import session from './session';

// Only have one reducer, but this structure supports adding more...
export const reducers = combineReducers({
  session: session
});