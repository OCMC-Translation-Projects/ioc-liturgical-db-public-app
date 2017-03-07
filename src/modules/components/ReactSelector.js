import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


export class ReactSelector extends React.Component {

  constructor(props) {
    super(props);
    console.log(this.props.resources)
    this.state = {
      value: this.props.initialValue
    };
  }

  handleChange = (selection) => {
    this.setState(
        { value: selection }
    ,this.props.changeHandler(selection, true)
    );
  };

  render () {
    return (
        <div className="resourceSelector">
          <div className="resourceSelectorPrompt">{this.props.title}</div>
          <Select
              name="form-field-name"
              value={this.props.initialValue}
              options={this.props.resources}
              onChange={this.handleChange}
          />
        </div>
    )
  }
}

export default ReactSelector;