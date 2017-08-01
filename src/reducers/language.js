/**
 * Created by mac002 on 7/31/17.
 */
import Actions from './actionTypes';
import {Labels} from 'ioc-liturgical-react';

export default function labels(
    state = {
      code: "en"
      , labels: Labels.getAllLabels("en")
    }
    , action) {

  let new_state;

  switch (action.type) {
    case Actions.LANGUAGE_SET_CODE: {
      // preserve immutability of current state
      new_state = JSON.parse(JSON.stringify(state));
      if (action.code) {
        new_state = {
          code: action.code
          , labels: Labels.getAllLabels(action.code)
        }
      }
      return new_state;
    }
    default: {
      return state;
    }
  }
}