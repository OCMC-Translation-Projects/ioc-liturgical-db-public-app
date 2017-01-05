/**
 * Created by mac002 on 12/7/16.
 */
import React from 'react';
import Iframe from 'react-iframe'

export class Browser extends React.Component {

  render() {
    return (
          <div className="App-browser-iFrame">
            <Iframe url="https://ioc-liturgical-db.net" height="100%" width="100%"/>
          </div>
    )
  }
}

export default Browser;