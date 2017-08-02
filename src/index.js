import React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';
import App from './modules/App';
import About from './modules/pages/About';
import Help from './modules/pages/Help';
import Home from './modules/pages/Home';
import Search from './modules/pages/SearchPage';
import Login from './modules/pages/Login'
import Logout from './modules/pages/Logout'
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
  let theStore = store.getState();
  if (theStore.db.isProtected && ! theStore.user.authenticated) {
    console.log("redirect to login");
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}
//  onEnter={requireAuth}

render((
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="/search" component={Search} onEnter={requireAuth}/>
        <Route path="/home" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/help" component={Help}/>
        <Route path="/login" component={Login}/>
        <Route path="/logout" component={Logout} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'))
