/**
 * Created by mac002 on 12/30/16.
 */

import React from 'react';
import auth from './Auth'

export class Logout extends React.Component {
  componentDidMount() {
    auth.logout()
  }

  render() {
    return <p>You are now logged out</p>
  }}

export default Logout;