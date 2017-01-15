/**
 * Created by mac002 on 12/7/16.
 */
import React from 'react';
import axios from 'axios';
import auth from '../components/Auth'
import server from '../../config/server';
import Form from "react-jsonschema-form";

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path:""
      , schema: {"uiSchema":{"password":{"ui:widget":"password"},"ui:order":["username","password"]},"schema":{"type":"object","properties":{"password":{"type":"string"},"username":{"type":"string"}},"$schema":"http://json-schema.org/draft-04/schema#"},"items":[{"username":"","password":""}]}
    };
  }

  onSubmit = ({formData}) => {
    var config = {
      auth: {
        username: formData.username
        , password: formData.password
      }
    };
    axios.get(server.getDbUserAuthPath() + formData.username, config)
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

  render() {
        var formData = {username: this.props.username, password: this.props.password};
        return (
            <div className="App-login">
              <h3>Please login to view the requested page:</h3>
              <Form schema={this.state.schema.schema}
                    uiSchema={this.state.schema.uiSchema}
                    formData={formData}
                    onSubmit={this.onSubmit}
              />
            </div>
        );
  }
}

export default Login;