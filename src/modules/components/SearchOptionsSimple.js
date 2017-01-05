import React, { Component , PropTypes} from 'react';
import FontAwesome from 'react-fontawesome';

class SearchOptions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ""
    }
    this.setValue = this.setValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setValue = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    this.props.handleSubmit(this.state.value);
  }

  render() {
    return (
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="control-label">{this.props.valueTitle}</div>
              <input
                  type="text"
                  placeholder={this.props.placeholder}
                  onChange={this.setValue}
                  className="App-search-text-input"
                  name="search"/>
              <span className="App-text-search-icon" >
                  <FontAwesome
                      onClick={this.handleSubmit}
                      name={"search"}/>
                </span>
            </div>
          </div>
        </div>
    );
  }
}

SearchOptions.propTypes = {
  valueTitle: PropTypes.string.isRequired
  , placeholder: PropTypes.string.isRequired
  , handleSubmit: PropTypes.func.isRequired
};


export default SearchOptions;