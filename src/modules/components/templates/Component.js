import React from 'react';
import { connect } from 'react-redux';
import Actions from '../../reducers/actionTypes';

/**
 * Copy this to create a new component.
 */
export class Component extends React.Component {

  constructor(props) {
    super(props);
    this.state = {someProp: ""}

    this.someFunction = this.someFunction.bind(this);
  };

  // example of how to set state in the redux store
  someFunction = (event) => {
    this.props.dispatch(
        {
          type: Actions.USER_LOGOUT
        }
    );

  };

  render() {
    return (
        <div className="App-component-name">
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
export default connect(mapStateToProps) (Component);
