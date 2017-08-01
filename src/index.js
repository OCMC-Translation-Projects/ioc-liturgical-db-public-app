import React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';
import auth from './modules/components/Auth'
import App from './modules/App';
import About from './modules/pages/About';
import Help from './modules/pages/Help';
import Search from './modules/pages/SearchPage';
import Login from './modules/pages/Login'
import Logout from './modules/pages/Logout'
import server from './config/server';
import 'react-select/dist/react-select.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './App.css';
import { createStore } from 'redux'
import { reducers } from './reducers/index';
import { Provider } from 'react-redux';

/**
 * To add a new route:
 * 1. in /modules, create the component for the route
 * 2. add the new route to /modules/Header.js
 * 3. add the new route to here...
 *
 * Note: /public/index.html has a redirect to /search
 * when the page loads: window.location = "/#/search";
 */

const store = createStore(reducers);

function requireAuth(nextState, replace) {
  if (server.isReadOnly()) {
    console.log(`requireAuth: server is read only`);
   // do nothing
  } else if (auth.isAuthenticated()) {
    console.log(`requireAuth: user is authenticated`);
    // do nothing
  } else { // require login
    console.log(`requireAuth: routing to login page`);
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}
//  onEnter={requireAuth}

render((
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Search} onEnter={requireAuth}/>
        <Route path="/search" component={Search}/>
        <Route path="/home" component={Search } />
        <Route path="/about" component={About}/>
        <Route path="/help" component={Help}/>
        <Route path="/login" component={Login}/>
        <Route path="/logout" component={Logout} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'))
