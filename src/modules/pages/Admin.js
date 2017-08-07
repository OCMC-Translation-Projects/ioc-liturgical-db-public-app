/**
 * Created by mac002 on 12/30/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import {Administrator} from 'ioc-liturgical-react';
import server from '../../config/server';

class Admin extends React.Component {


  componentDidMount() {
  }

  render() {
    return (
    <div className="App-page-admin"><p>Admin page...</p>
      <Administrator
          restServer={server.getWsServerPath()}
          username={this.props.app.user.username}
          password={this.props.app.user.password}
          languageCode={this.props.app.language.code}
          domains={this.props.app.dropdowns.domains}
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