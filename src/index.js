import React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';
import auth from './modules/components/Auth'
import App from './modules/App';
import About from './modules/pages/About';
import Help from './modules/pages/Help';
import Search from './modules/pages/SearchPage';
import Browser from './modules/pages/Browser';
import Login from './modules/pages/Login'
import Logout from './modules/pages/Logout'
import server from './config/server';
//import 'bootstrap/dist/css/bootstrap.css';
import 'react-select/dist/react-select.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './App.css';

/**
 * To add a new route:
 * 1. in /modules, create the component for the route
 * 2. add the new route to /modules/Header.js
 * 3. add the new route to here...
 *
 * Note: /public/index.html has a redirect to /search
 * when the page loads: window.location = "/#/search";
 */


function requireAuth(nextState, replace) {
  if (!auth.isAuthenticated()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}
//  onEnter={requireAuth}

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Search}/>
      {server.isReadOnly() ?
          <Route path="/search" component={Search } />
          :
          <Route  path="/search" component={Search } onEnter={requireAuth}/>
      }
      <Route path="/home" component={Search } />
      <Route path="/browser" component={Browser } onEnter={requireAuth}/>
      <Route path="/about" component={About}/>
      <Route path="/help" component={Help}/>
      <Route path="/login" component={Login}/>
      <Route path="/logout" component={Logout} />
    </Route>
  </Router>
), document.getElementById('root'))
