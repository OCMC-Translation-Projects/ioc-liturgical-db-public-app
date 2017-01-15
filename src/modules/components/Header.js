import React from 'react';
import NavLink from './NavLink';
import Logo from './images/Globe';
import OCMC from './images/OCMC';
import auth from './Auth';

/**
 * Note: for some reason, need to list the menu items in reverse order
 */
export default React.createClass({
  render() {
    return <div className="App-header">
      <ul className="nav App-menu">
        {! auth.isAuthenticated() ?
            <li><NavLink to="/login">Login</NavLink></li>
            : <li><NavLink to="/logout">Logout</NavLink></li>
        }
        <li><NavLink to="/help">Help</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/browser">Browser</NavLink></li>
        <li><NavLink to="/">Search</NavLink></li>
      </ul>
      <div className="App-logo" ><OCMC/> <Logo /> IOC Liturgical Database
      </div>
      </div>
  }
})
