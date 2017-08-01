/**
 * Created by mac002 on 12/30/16.
 */

import React from 'react';
import auth from '../components/Auth'
import { connect } from 'react-redux';
import Actions from '../../reducers/actionTypes';

class Logout extends React.Component {
  componentDidMount() {
//    console.log(`Logout.js logging out ${this.props.app.user.username}`);
    auth.logout();
    this.props.dispatch(
      {
        type: Actions.USER_LOGOUT
      }
    );
    const { location } = this.props
    if (location.state && location.state.nextPathname) {
      this.props.router.replace(this.location.state.nextPathname)
    } else {
      this.props.router.replace('/')
    }
  }

  render() {
//    console.log(this.props.app);
    return <div className="App-page-logout"><p>You are now logged out...</p></div>
  }}

/**
 * Maps the redux store state to this component's props.
 * @param state
 * @returns {{app: *}}
 */
function mapStateToProps(state) {
  return (
      {
        app: state
      }
  );
}
export default connect(mapStateToProps) (Logout);