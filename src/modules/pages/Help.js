/**
 * Created by mac002 on 12/7/16.
 */
import React from 'react';
import {HelpSearch} from 'ioc-liturgical-react'

export class Help extends React.Component {
  render() {
    console.log(this.props.labels.help);
    return (
        <div className="App-page App-help">
          <HelpSearch labels={this.props.labels.help.search}/>
        </div>
    )
  }
}

export default Help;