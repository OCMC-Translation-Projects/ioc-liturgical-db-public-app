import React, { Component , PropTypes} from 'react';
import Checkbox from './Checkbox';
import FontAwesome from 'react-fontawesome';

class IdQuerySelector extends Component {


  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  }

  toggleCheckbox = (label, key) => {
    var item = key + ":" + label;
    if (this.selectedCheckboxes.has(item)) {
      this.selectedCheckboxes.delete(item);
    } else {
      this.selectedCheckboxes.add(item);
    }
  }

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();
    var domain, topic, key = "";
    var domainQuery, topicQuery, keyQuery = "";
    for (const checkbox of this.selectedCheckboxes) {
      if (checkbox.startsWith("domain")) {
        domain = checkbox.split(":")[1];
      } else if (checkbox.startsWith("topic")) {
        topic = checkbox.split(":")[1];
      } else {
        let parts = checkbox.split(":");
        key = parts[1];
        if (parts.length > 2) {
          key += ":" + parts[2];
        }
      }
    }
    if (domain && domain.length > 0) {
      domainQuery = domain + "~";
    } else {
      domainQuery = ".*~";
    }
    if (topic && topic.length > 0) {
      topicQuery = topic + "~";
    } else {
      topicQuery = ".*~";
    }
    if (key && key.length > 0) {
      keyQuery = key;
    } else {
      keyQuery = ".*";
    }
    let query = domainQuery + topicQuery + keyQuery;

    if (query !== ".*~.*~.*") {
      this.props.handleSelection(query);
    }
  }

  createCheckbox = item => {
    console.log("createCheckBox(item): " + item.label + ", " + item.key);
    if (this.state.itemsLoaded) {
      return  (
          <Checkbox
              label={item.label}
              handleCheckboxChange={this.toggleCheckbox}
              key={item.key}
              id={item.key}
          />
      )
    }
  }

  render() {
    return (
        <div className="container">
          <div className="row">
            <div className="col-sm-12">

              <form onSubmit={this.handleFormSubmit}>
                <Checkbox
                    label={this.props.items[0].label}
                    handleCheckboxChange={this.toggleCheckbox}
                    key={this.props.items[0].key}
                    id={this.props.items[0].key}
                />
                <Checkbox
                    label={this.props.items[1].label}
                    handleCheckboxChange={this.toggleCheckbox}
                    key={this.props.items[1].key}
                    id={this.props.items[1].key}
                />
                <Checkbox
                    label={this.props.items[2].label}
                    handleCheckboxChange={this.toggleCheckbox}
                    key={this.props.items[2].key}
                    id={this.props.items[2].key}
                />
                <div className="control-label" type="submit">
                  {this.props.prompt}
                  <FontAwesome
                      className="App-search-by-id-parts-icon"
                      name="search"
                      onClick={this.handleFormSubmit}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
    );
  }
}

IdQuerySelector.propTypes = {
  prompt: PropTypes.string.isRequired
  , items: PropTypes.array.isRequired
  , handleSelection: PropTypes.func.isRequired
};


export default IdQuerySelector;