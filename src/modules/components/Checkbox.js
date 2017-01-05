import React, { Component, PropTypes } from 'react';

class Checkbox extends Component {
  state = {
    isHidden: false,
  }

  toggleCheckboxChange = () => {

    const { handleCheckboxChange, label, id } = this.props;

    this.setState(({ isChecked }) => (
        {
          isHidden: !isChecked,
        }
    ));

    handleCheckboxChange(label, id);
  }

  render() {
    const { id, label } = this.props;
    const { isChecked } = this.state;

    return (
        <div className="checkbox">
          <label>
            <input
                id={id}
                type="checkbox"
                value={label}
                checked={isChecked}
                onChange={this.toggleCheckboxChange}
            />

            {label}
          </label>
        </div>
    );
  }
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

export default Checkbox;