/**
 * Created by mac002 on 12/7/16.
 */
import React from 'react';
import Iframe from 'react-iframe';
import server from '../../config/server';

export class Browser extends React.Component {

  render() {
    return (
          <div className="App-page App-browser-iFrame">
            <Iframe url={server.getDbServerPath()} height="100%" width="100%"/>
          </div>
    )
  }
}

export default Browser;