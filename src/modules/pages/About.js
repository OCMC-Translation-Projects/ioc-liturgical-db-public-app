import React from 'react'
import server from '../../config/server';
import Email from "../components/images/SsEmailContact"
import {Configuration} from 'ioc-liturgical-react'

export default React.createClass({
  render() {
    // because of the way the install bash script works
    // the last number needs to be 9 or less
    const version = "1.5.5";
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
      <h2>{this.props.labels.pageAbout.acknowledgements}</h2>
      <div className="jumbotron">
        <p>{this.props.labels.pageAbout.ackPara01s1} <a href="http://www.agesinitiatives.com/dcs/public/dcs/about.html" target="_blank">{this.props.labels.pageAbout.ackPara01s2}</a> {this.props.labels.pageAbout.ackPara01s3}</p>
        <p/>
        <p>{this.props.labels.pageAbout.ackPara02s1} <a href="http://ccat.sas.upenn.edu/gopher/text/religion/biblical/lxxmorph/" target="_blank">{this.props.labels.pageAbout.website}</a>.</p>
        <p/>
        <p>{this.props.labels.pageAbout.ackPara03s1} <a href="http://ebible.org/find/show.php?id=eng-webbe" target="_blank">{this.props.labels.pageAbout.website}</a>.</p>
        <p/>
        <p>{this.props.labels.pageAbout.ackPara04s1} <a href="http://ebible.org/eng-lxx2012/" target="_blank">{this.props.labels.pageAbout.website}</a>.</p>
      </div>
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
