/**
 * Created by mac002 on 12/30/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import Actions from '../../reducers/actionTypes';

class Logout extends React.Component {
  componentDidMount() {
    this.props.dispatch(
      {
        type: Actions.USER_LOGOUT
      }
    );
    const { location } = this.props
    if (location.state && location.state.nextPathname) {
      this.props.history.replace(this.location.state.nextPathname)
    } else {
      this.props.history.replace('/')
    }
  }

  render() {
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