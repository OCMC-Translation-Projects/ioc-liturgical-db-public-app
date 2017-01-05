/**
 * Created by mac002 on 12/7/16.
 */
import React from 'react';
import axios from 'axios';
import auth from './Auth'
import config from '../config/default.json';
import Form from "react-jsonschema-form";

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path:""
      , server: {
        root: config.server
        , adminApi: config.adminApi
      }
  };
  }

  onSubmit = ({formData}) => {
    var config = {
      auth: {
        username: formData.username
        , password: formData.password
      }
    };
    axios.get(this.state.server.root + this.state.server.adminApi + "resources", config)
        .then(response => {
          auth.setCredentials(
              formData.username
              , formData.password
              , true
          );
          const { location } = this.props

          if (location.state && location.state.nextPathname) {
            this.props.router.replace(location.state.nextPathname)
          } else {
            this.props.router.replace('/')
          }

        })
        .catch( (error) => {
          auth.setCredentials(formData.username, formData.password, false, []);
        });
  }

  fetchData() {
    axios.get(this.state.server.root + this.state.server.adminApi + "login")
        .then(response => {
          this.setState( { data: response.data , path: this.props.path} );
        })
        .catch( (error) => {
          this.setState( { data: error.message, path: this.props.path });
        });
  }

  render() {
    if (this.state.path !== this.props.path) {
      this.fetchData();
    }
    if (this.state.data) {
      if (this.state.data.schema) {
        var formData = {username: this.props.username, password: this.props.password};
        return (
            <div className="App-login">
              <h3>Please login to view the requested page:</h3>
              <Form schema={this.state.data.schema}
                    uiSchema={this.state.data.uiSchema}
                    formData={formData}
                    onSubmit={this.onSubmit}
              />
            </div>
        );
      } else {
        return (
            <div className="App-login">
              <p>{this.props.path}</p>
              <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
            </div>
        );

      }
    } else {
      return (<div className="Resource"><p>Loading {this.props.path} from {this.root}!</p></div>);
    }
  }
}

export default Login;