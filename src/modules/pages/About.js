import React from 'react'
import server from '../../config/server';
import Email from "../components/images/SsEmailContact"
import {AboutDatabase, Configuration} from 'ioc-liturgical-react'
import VersionNumbers from "../../config/VersionNumbers";
import { connect } from 'react-redux';

class About extends React.Component {
  render() {
    const version = VersionNumbers.getPackageNumber();
    return <div className="App-page App-page-about">
      <AboutDatabase labels={this.props.app.language.labels.pageAbout}/>
      {this.props.app.language.labels.pageAbout.contact} <Email />
      <p/>
      <Configuration
          appVersion={version}
          appVersionLabel={this.props.app.language.labels.pageAbout.appVersion}
          restServer={server.getWsServerPath()}
          restServerLabel={this.props.app.language.labels.pageAbout.RestServer}
          wsVersionLabel={this.props.app.language.labels.pageAbout.wsVersion}
          dbServerLabel={this.props.app.language.labels.pageAbout.DbServer}
      />
    </div>
  }
};

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
export default connect(mapStateToProps) (About);
