import React from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import { connect } from 'react-redux';
import server from '../../config/server';
import {SearchText} from 'ioc-liturgical-react';

class SearchPage extends React.Component {

  componentWillMount = () => {
  }

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