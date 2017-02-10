import React from 'react'
import server from '../../config/server';

export default React.createClass({
  render() {
    // because of the way the install bash script works
    // the last number needs to be 9 or less
    const version = "1.4.2";
    return <div className="App-page App-page-about">
      <h2>{this.props.labels.pageAbout.pageTitle}</h2>
      <div className="jumbotron">
        <p>
          {this.props.labels.pageAbout.para01}
        </p>
        <p>
          {this.props.labels.pageAbout.para02}
        </p>
        <p>
          {this.props.labels.pageAbout.para03s1}
          <a href="http://www.ocmc.org/" target="_blank"> (OCMC)</a>.
        </p>
        <p>
          {this.props.labels.pageAbout.para03s2}
        </p>
        <p>
          {this.props.labels.pageAbout.para04s1}
          <a href="http://www.agesinitiatives.org/" target="_blank"> AGES Initiatives, Inc.</a>
        </p>
        <p>
          {this.props.labels.pageAbout.para04s2}
          <a href="http://www.agesinitiatives.com/dcs/public/dcs/dcs.html" target="_blank"> Digital Choir Stand</a>.
        </p>
        <p>
          {this.props.labels.pageAbout.para04s3}
        </p>
      </div>
      <p>{this.props.labels.pageAbout.appVersion} {version}.</p>
      <p>{this.props.labels.pageAbout.DbServer} {server.getDbServerPath()}</p>
      <p>{this.props.labels.pageAbout.RestServer} {server.getWsServerPath()}</p>
    </div>
  }
})
