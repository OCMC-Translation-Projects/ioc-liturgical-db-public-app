/**
 * Created by mac002 on 12/7/16.
 */
import React from 'react';
import auth from '../components/Auth'
import {Login as IocLogin} from 'ioc-liturgical-react'
import server from '../../config/server';

export class Login extends React.Component {
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
    auth.setCredentials(
        username
        , password
        , valid
    );
    if (status === 200) {
      const { location } = this.props
      if (location.state && location.state.nextPathname) {
        this.props.router.replace(location.state.nextPathname)
      } else {
        this.props.router.replace('/')
      }
    }
  }

  onSubmit = (status, valid, username, password) => {
    let theStatusMsg = "";
    if (status !== 200) {
      theStatusMsg = this.props.labels.pageLogin.bad;
      this.setState(
          {
            username: username
            , password: password
            , loginFormMsg: theStatusMsg
          }
      );
    } else {
      this.setCredentials(status, valid, username,password)
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
              formPrompt={this.props.labels.pageLogin.prompt}
              formMsg={this.state.loginFormMsg}
              dropdownsCallback={this.dropdownsCallback}
          />
        </div>
    );
  }
}

export default Login;