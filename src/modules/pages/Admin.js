/**
 * Created by mac002 on 12/30/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import {Administrator} from 'ioc-liturgical-react';

class Admin extends React.Component {
  render() {
    return (
        <div className="App-page-admin"><p>Admin page...</p>
          <Administrator
              session={this.props.app.session}
          />
        </div>
    )
  }
}

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
export default connect(mapStateToProps) (Admin);