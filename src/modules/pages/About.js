import React from 'react'
import server from '../../config/server';
import Email from "../components/images/SsEmailContact"
import {AboutDatabase, Configuration} from 'ioc-liturgical-react'
import VersionNumbers from "../../config/VersionNumbers";

export default React.createClass({
  render() {
    const version = VersionNumbers.getPackageNumber();
    return <div className="App-page App-page-about">
      <AboutDatabase labels={this.props.labels.pageAbout}/>
      {this.props.labels.pageAbout.contact} <Email />
      <p/>
      <Configuration
          appVersion={version}
          appVersionLabel={this.props.labels.pageAbout.appVersion}
          restServer={server.getWsServerPath()}
          restServerLabel={this.props.labels.pageAbout.RestServer}
          wsVersionLabel={this.props.labels.pageAbout.wsVersion}
          dbServerLabel={this.props.labels.pageAbout.DbServer}
      />
    </div>
  }
})
