/**
 * Created by mac002 on 12/7/16.
 */
import React from 'react';
import auth from '../components/Auth'
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
    this.setCredentials = this.setCredentials.bind(this);
    this.dropdownsCallback = this.dropdownsCallback.bind(this);
  }

  setCredentials = (status, valid, username, password) => {
    this.setState(
        {
          username: username
          , password: password
          , valid: valid
        }
    );

    auth.setCredentials(
        username
        , password
        , valid
    );
    if (status === 200) {
      const { location, router } = this.props;
      if (location.state && location.state.nextPathname) {
        router.replace(location.state.nextPathname)
      } else {
        router.replace('/')
      }
    }
  }

  onSubmit = (status, valid, username, password) => {
    console.log(status);
    let theStatusMsg = "";
    if (status === 200) {
//      this.setCredentials(status, valid, username,password);
      console.log(`Login.onSubmit ${valid} ${username} ${password}`);
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
      const { location, router } = this.props;
      if (location.state && location.state.nextPathname) {
        router.replace(location.state.nextPathname)
      } else {
        router.replace('/')
      }
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

  dropdownsCallback = () => {

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
              dropdownsCallback={this.dropdownsCallback}
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