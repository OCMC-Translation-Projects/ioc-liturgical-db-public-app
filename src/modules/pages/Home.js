/**
 * Created by mac002 on 12/7/16.
 */
import React from 'react';
import { connect } from 'react-redux';
import {Alert, Glyphicon} from 'react-bootstrap';

class Home extends React.Component {

  render() {
    return (
        <div className="App-page App-page-home">
          <h3 className="App-page-home-welcome-title"> Welcome!</h3>
          <Alert bsStyle="info"><Glyphicon glyph="bullhorn" /> If you want to work with us to add your language to the user interface, or the translation of the liturgical texts in your language, please contact us. We are especially looking for volunteers to translate the user interface for this website into: Arabic, Chinese, French, Spanish, and Swahili. Also, we are looking for volunteers to enter officially approved Arabic, Chinese, French, Spanish, and Swahili translations of the liturgical texts. See how to contact us by looking at the bottom of the About page.</Alert>
          <Alert bsStyle="warning"><Glyphicon glyph="warning-sign" /> From time to time, we need to update the web app or the database. If you suddenly see messages about network errors or something not being available, wait a few minutes and try again.</Alert>
        </div>
    );
  }
}

/**
 * Maps the redux store state to this component's props.
 * @param state
 * @returns {{app: *}}
 */
function mapStateToProps(state) {
  console.log(state);
  return (
      {
        app: state
      }
  );
}
export default connect(mapStateToProps) (Home);