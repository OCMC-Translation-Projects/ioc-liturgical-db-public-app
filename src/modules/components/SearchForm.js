import React, { Component } from 'react';

class SearchForm extends Component {
  render() {
    return (
        <div className="container">
          <fieldset>
            <legend>Search form</legend>
            <div className="input-holder">
              <div className="input-frame">
                <input
                    type="text"
                    value=""
                    title="Passage &amp; keyword search"
                    tabindex="0"
                    name="query"
                    className="ui-autocomplete-input hint"
                    autocomplete="off"/>
                  <span
                      role="status"
                      aria-live="polite"
                      className="ui-helper-hidden-accessible">
                  </span>
              </div>
              <ul
                  className="ui-autocomplete ui-menu ui-widget ui-widget-content ui-corner-all"
                  id="ui-id-1"
                  tabindex="0"
              >
              </ul>
            </div>
            <button
                type="submit"
                value="Search"
                className="btn-search"
                tabindex="0">
              <i className="icon-search"></i>
            </button>
          </fieldset>
        </div>
    );
  }
}

export default SearchForm;