import React from 'react'
import Header from './components/Header'
import Logo from './components/images/Logo';
import { connect } from 'react-redux';
import server from '../config/server';
import Actions from '../reducers/actionTypes';

class App extends React.Component {

  componentWillMount = () => {
    server.getDbInfo()
        .then(response => {
          let {
            wsVersion
            , dbServerDomain
            , databaseReadOnly
            , databaseProtected
          } = response;
          this.props.dispatch(
              {
                type: Actions.DB_SET_INFO
                , domain: dbServerDomain
                , isProtected: databaseProtected
                , isReadOnly: databaseReadOnly
                , wsVersion: wsVersion
              }
          );
        })
        .catch( (error) => {
          this.props.dispatch(
              {
                type: Actions.DB_SET_INFO
                , domain: undefined
                , isProtected: true
                , isReadOnly: false
                , wsVersion: undefined
              }
          );
        });
  }

  render() {
    return (
        <div className="App">
          <Logo/>
          <Header/>
          <div className="row App-content-row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              {this.props.children}
            </div>
          </div>
        </div>
    )
  }
}

export default connect() (App);

