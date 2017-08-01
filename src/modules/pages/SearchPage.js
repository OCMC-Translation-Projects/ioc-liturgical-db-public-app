import React from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import {Alert, Glyphicon} from 'react-bootstrap';
import { connect } from 'react-redux';
import server from '../../config/server';
import {SearchText} from 'ioc-liturgical-react';

class SearchPage extends React.Component {

  render() {
    return (
        <div className="App-page App-search">
          <SearchText
              restServer={server.getWsServerPath()}
              username={this.props.app.user.username}
              password={this.props.app.user.password}
              searchLabels={this.props.app.language.labels.search}
              resultsTableLabels={this.props.app.language.labels.resultsTable}
              initialDocType="Liturgical"
          />
          <Alert bsStyle="info"><Glyphicon glyph="bullhorn" /> If you want to work with us to add your language to the user interface, or the translation of the liturgical texts in your language, please contact us. We are especially looking for volunteers to translate the user interface for this website into: Arabic, Chinese, French, Spanish, and Swahili. Also, we are looking for volunteers to enter officially approved Arabic, Chinese, French, Spanish, and Swahili translations of the liturgical texts. See how to contact us by looking at the bottom of the About page.</Alert>
          <Alert bsStyle="warning"><Glyphicon glyph="warning-sign" /> From time to time, we need to update the web app or the database. If you suddenly see messages about network errors or something not being available, wait a few minutes and try again.</Alert>
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
export default connect(mapStateToProps) (SearchPage);