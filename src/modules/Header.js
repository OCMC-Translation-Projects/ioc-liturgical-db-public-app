import React from 'react'
import NavLink from './NavLink'
import Logo from './Logo'

/**
 * Note: for some reason, need to list the menu items in reverse order
 */
export default React.createClass({
  render() {
    return <div className="App-header">
          <NavLink className="App-logo" to="/" onlyActiveOnIndex>IOC <Logo /> Liturgical Database</NavLink>
          <ul className="nav">
            <li><NavLink to="/help">Help</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/">Search</NavLink></li>
          </ul>
        </div>
  }
})
