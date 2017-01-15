/**
 * Created by mac002 on 12/30/16.
 */

import React from 'react';
import auth from '../components/Auth'

export class Logout extends React.Component {
  componentDidMount() {
    auth.logout()
  }

  render() {
    return <div className="App-page-logout"><p>You are now logged out...</p></div>
  }}

export default Logout;