import React from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import {Alert, Glyphicon} from 'react-bootstrap';
import auth from '../components/Auth'
import server from '../../config/server';
import {SearchText} from 'ioc-liturgical-react';

export class SearchPage extends React.Component {

  render() {
    return (
        <div className="App-page App-search">
          <SearchText
              restServer={server.getWsServerPath()}
              username={auth.getUsername()}
              password={auth.getPassword()}
              searchLabels={this.props.labels.search}
              resultsTableLabels={this.props.labels.resultsTable}
          />
          <Alert bsStyle="info"><Glyphicon glyph="bullhorn" /> If you want to work with us to add your language to the user interface, or the translation of the liturgical texts in your language, please contact us. We are especially looking for volunteers to translate the user interface for this website into: Arabic, Chinese, French, Spanish, and Swahili. Also, we are looking for volunteers to enter officially approved Arabic, Chinese, French, Spanish, and Swahili translations of the liturgical texts. See how to contact us by looking at the bottom of the About page.</Alert>
          <Alert bsStyle="warning"><Glyphicon glyph="warning-sign" /> From time to time, we need to update the web app or the database. If you suddenly see messages about network errors or something not being available, wait a few minutes and try again.</Alert>
        </div>
    )
  }
}

export default SearchPage;