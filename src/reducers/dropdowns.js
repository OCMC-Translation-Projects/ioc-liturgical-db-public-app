/**
 * Created by mac002 on 7/31/17.
 */
import Actions from './actionTypes';

export default function dropdowns(
    state = {
      formsLoaded: true
      , forms: undefined
      , domains: undefined
      , formsDropdown: undefined
      , formsValueSchemas: undefined
      , formsValues: undefined
      , ontologyDropdowns: undefined
      , biblicalBooksDropdown: undefined
      , biblicalChaptersDropdown: undefined
      , biblicalVersesDropdown: undefined
      , biblicalSubversesDropdown: undefined
    }
    , action
  ) {
  let new_state;
  switch (action.type) {
    case Actions.SET_DROPDOWNS: {
      console.log(action);
      new_state = {
        formsLoaded: true
        , forms: action.forms
        , domains: action.domains
        , formsDropdown: action.formsDropdown
        , formsValueSchemas: action.formsValueSchemas
        , formsValues: action.formsValues
        , ontologyDropdowns: action.ontologyDropdowns
        , biblicalBooksDropdown: action.biblicalBooksDropdown
        , biblicalChaptersDropdown: action.biblicalChaptersDropdown
        , biblicalVersesDropdown: action.biblicalVersesDropdown
        , biblicalSubversesDropdown: action.biblicalSubversesDropdown
      };
      return new_state;
    }
    default:
      return state;
  }

}