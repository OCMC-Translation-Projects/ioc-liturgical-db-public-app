import React from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import { connect } from 'react-redux';
import {SearchText} from 'ioc-liturgical-react';

class SearchPage extends React.Component {

  componentWillMount = () => {
  }

render() {
    return (
        <div className="App-page App-search">
          <SearchText
              session={this.props.app.session}
              searchLabels={this.props.app.session.labels.search}
              resultsTableLabels={this.props.app.session.labels.resultsTable}
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