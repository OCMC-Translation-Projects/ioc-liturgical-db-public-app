/**
 * Created by mac002 on 7/31/17.
 */
import Actions from './actionTypes';

export default function db(
    state = {
      infoNotRetrieved: true
      , domain: undefined
      , isProtected: true
      , isReadOnly: false
      , wsVersion: undefined
    }
    , action
  ) {
  let new_state;
  switch (action.type) {
    case Actions.DB_SET_INFO: {
      new_state = JSON.parse(JSON.stringify(state)); // preserve immutability of current state
      new_state = {
        infoNotRetrieved: false
        , domain: action.domain
        , isProtected: action.isProtected
        , isReadOnly: action.isReadOnly
        , wsVersion: action.wsVersion
      };
      return new_state;
    }
    default:
      return state;
  }

}