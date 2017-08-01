/**
 * Created by mac002 on 7/31/17.
 */
import Actions from './actionTypes';

export default function db(state = {isProtected: true}, action) {
  let new_state;
  switch (action.type) {
    case Actions.DB_SET_PROTECTED: {
      new_state = JSON.parse(JSON.stringify(state)); // preserve immutability of current state
      new_state = {isProtected: true};
      return new_state;
    }
    default:
      return state;
  }

}