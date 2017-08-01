/**
 * Created by mac002 on 7/31/17.
 */
import Actions from './actionTypes';

export default function user(
    state = {
      authenticated: false
      , username: ""
      , password: ""
    }
    , action) {

  let new_state;

//  console.log(`action = ${action.type}`);
//  console.log(JSON.stringify(state));

  switch (action.type) {
    case Actions.USER_LOGIN: {
      new_state = JSON.parse(JSON.stringify(state)); // preserve immutability of current state
      new_state = action.user;
      return new_state;
    }
    case Actions.USER_LOGOUT: {
      new_state = JSON.parse(JSON.stringify(state)); // preserve immutability of current state
      new_state = {
        authenticated: false
        , username: ""
        , password: ""
      };
      return new_state;
    }
    default: {
      return state;
    }
  }
}