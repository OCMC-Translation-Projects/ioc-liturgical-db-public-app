/**
 * Created by mac002 on 12/7/16.
 */
import React from 'react';
import {Login as IocLogin, UiSchemas} from 'ioc-liturgical-react'
import server from '../../config/server';
import { connect } from 'react-redux';
import Actions from '../../reducers/actionTypes';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
      , password: ""
      ,loginFormMsg: ""
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.handleDropdownsCallback = this.handleDropdownsCallback.bind(this);
  }

  onSubmit = (status, valid, username, password, userinfo) => {
    let theStatusMsg = this.props.app.session.labels.pageLogin.good;
    if (status === 200) {
      let userInfo = {
        username: username
        , password: password
        , firstName: userinfo.firstname
        , lastName: userinfo.lastname
        , title: userinfo.title
        , domain: userinfo.domain
        , email: userinfo.email
        , authenticated: valid
      }
      this.props.dispatch(
          {
            type: Actions.SET_SESSION_USER_LOGIN
            , userInfo: userInfo
          }
      );
      this.setState(
          {
            username: username
            , password: password
            , loginFormMsg: theStatusMsg
          }
      );
    } else {
      theStatusMsg = this.props.app.language.labels.pageLogin.bad;
      this.setState(
          {
            username: username
            , password: password
            , loginFormMsg: theStatusMsg
          }
      );
    }
  };

  handleDropdownsCallback = (response) => {
    let forms = response.data;
    let domains = forms.domains;
    let uiSchemas = new UiSchemas(
        forms.formsDropdown
        , forms.valueSchemas
        , forms.values
    );
    let dropdowns = {
      biblicalBooksDropdown: forms.biblicalBooksDropdown
      , biblicalChaptersDropdown: forms.biblicalChaptersDropdown
      , biblicalVersesDropdown: forms.biblicalVersesDropdown
      , biblicalSubversesDropdown: forms.biblicalSubversesDropdown
      , formsDropdown: forms.formsDropdown
      , ontologyTypesDropdown: forms.ontologyTypesDropdown
      , templateNewTemplateDropdown: forms.templateNewTemplateDropdown
      , templatePartsDropdown: forms.templatePartsDropdown
      , templateWhenDayNameCasesDropdown: forms.templateWhenDayNameCasesDropdown
      , templateWhenDayOfMonthCasesDropdown: forms.templateWhenDayOfMonthCasesDropdown
      , templateWhenDayOfSeasonCasesDropdown: forms.templateWhenDayOfSeasonCasesDropdown
      , templateWhenModeOfWeekCasesDropdown: forms.templateWhenModeOfWeekCasesDropdown
      , templateWhenMonthNameCasesDropdown: forms.templateWhenMonthNameCasesDropdown
    };
    this.props.dispatch(
        {
          type: Actions.SET_SESSION_DROPDOWNS
          , formsLoaded: true
          , forms: forms.data
          , domains: domains
          , uiSchema: uiSchemas
          , dropdowns: dropdowns
        }
    )
  }


  render() {
    return (
        <div className="App-login">
          <IocLogin
              restServer={server.getWsServerPath()}
              username={this.state.username}
              password={this.state.password}
              loginCallback={this.onSubmit}
              formPrompt={this.props.app.session.labels.pageLogin.prompt}
              formMsg={this.state.loginFormMsg}
              dropdownsCallback={this.handleDropdownsCallback}
          />
        </div>
    );
  }
}

/**
 * Maps the redux store state to this component's props.
 * @param state
 * @returns {{app: *}}
 */
function mapStateToProps(state) {
  return (
      {
        app: state
      }
  );
}
export default connect(mapStateToProps) (Login);