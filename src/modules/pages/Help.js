/**
 * Created by mac002 on 12/7/16.
 */
import React from 'react';
import {HelpSearch} from 'ioc-liturgical-react'
import { connect } from 'react-redux';

export class Help extends React.Component {
  render() {
    return (
        <div className="App-page App-help">
          <HelpSearch labels={this.props.app.session.labels.help.search}/>
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
export default connect(mapStateToProps) (Help);
