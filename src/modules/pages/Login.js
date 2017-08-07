/**
 * Created by mac002 on 12/7/16.
 */
import React from 'react';
import {Login as IocLogin} from 'ioc-liturgical-react'
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

  onSubmit = (status, valid, username, password) => {
    let theStatusMsg = this.props.app.language.labels.pageLogin.good;
    if (status === 200) {
      this.props.dispatch(
          {
            type: Actions.USER_LOGIN
            , user: {
              authenticated: valid
              , username: username
              , password: password
            }
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
    this.props.dispatch(
        {
          type: Actions.SET_DROPDOWNS
          , formsLoaded: true
          , forms: forms.data
          , domains: forms.domains
          , formsDropdown: forms.formsDropdown
          , formsValueSchemas: forms.valueSchemas
          , formsValues: forms.values
          , ontologyDropdowns: forms.ontologyDropdowns
          , biblicalBooksDropdown: forms.biblicalBooksDropdown
          , biblicalChaptersDropdown: forms.biblicalChaptersDropdown
          , biblicalVersesDropdown: forms.biblicalVersesDropdown
          , biblicalSubversesDropdown: forms.biblicalSubversesDropdown
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
              formPrompt={this.props.app.language.labels.pageLogin.prompt}
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
  console.log(state);
  return (
      {
        app: state
      }
  );
}
export default connect(mapStateToProps) (Login);