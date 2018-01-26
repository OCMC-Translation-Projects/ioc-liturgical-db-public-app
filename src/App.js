/**
 * Created by mac002 on 8/2/17.
 */
import React from 'react'
import { connect } from 'react-redux';
import Actions from './reducers/actionTypes';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import 'react-select/dist/react-select.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './App.css';

import server from './config/server';

import About from './modules/pages/About';
import Admin from './modules/pages/Admin';
import Help from './modules/pages/Help';
import Home from './modules/pages/Home';
import Login from './modules/pages/Login';
import Logout from './modules/pages/Logout';
import Search from './modules/pages/SearchPage';

import Header from './modules/components/Header'

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
      <Route
          {...rest}
          render={(props) => authed === true
              ? <Component {...props} />
              : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
      />
  )
}

class App extends React.Component {

  componentWillMount = () => {
    this.props.dispatch({
          type: Actions.SET_SESSION_REST_SERVER
          , restServer: server.getWsServerPath()
        }
    );
    server.getDbInfo()
        .then(response => {
          let {
            wsVersion
            , dbServerDomain
            , databaseReadOnly
            , databaseProtected
          } = response;
          let db = {
            domain: dbServerDomain
            , isProtected: databaseProtected
            , isReadOnly: databaseReadOnly
            , wsVersion: wsVersion
          };
          this.props.dispatch(
              {
                type: Actions.SET_SESSION_DB_INFO
                , db: db
              }
          );
        })
        .catch((error) => {
          let db = {
            domain: undefined
            , isProtected: true
            , isReadOnly: false
            , wsVersion: undefined
          };
          this.props.dispatch(
              {
                type: Actions.SET_SESSION_DB_INFO
                , db: db
              }
          );
        });
  }


  render = () => {
    return (
        <div className="App ">
          <Router>
            <div>
              <Header/>
              <div className="row App-content-row">
                <div className="col-sm-12 col-md-12 col-lg-12">
                  <Route exact path="/" component={Home} />
                  <PrivateRoute
                      authed={this.props.app.session.userInfo.authenticated}
                      path='/search'
                      component={Search}
                  />
                  <Route path="/home" component={Home}/>
                  <PrivateRoute
                      authed={this.props.app.session.userInfo.authenticated}
                      path='/admin'
                      component={Admin}
                  />
                  <Route path="/about" component={About}/>
                  <Route path="/help" component={Help}/>
                  <Route path="/login" component={Login} />
                  <Route path="/logout" component={Logout}/>
                </div>
              </div>
            </div>
          </Router>
        </div>
    )
  }
}
//                <Route path="/login" render={props => <Login {...props} />} />

const mapStateToProps = (state) => {
  return {
    app:  state
  };
};

export default
    connect(
        mapStateToProps
    )(App);