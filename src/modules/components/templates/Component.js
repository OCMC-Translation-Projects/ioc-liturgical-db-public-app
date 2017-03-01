import React from 'react';
/**
 * Copy this to create a new component.
 */
export class Component extends React.Component {

  constructor(props) {
    super(props);
    this.state = {someProp: ""}

    this.someFunction = this.someFunction.bind(this);
  };

  someFunction = (event) => {
  };

  render() {
    return (
        <div className="App-component-name">
        </div>
    )
  }
}

export default Component;

