import React from 'react';
import axios from 'axios';
import server from '../config/server';
import SearchOptionsAdvanced from "./components/SearchOptionsAdvanced"
import SearchOptionsSimple from "./components/SearchOptionsSimple"
import IdQuerySelector from './components/IdQuerySelector';
import FontAwesome from 'react-fontawesome';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

export class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      docType: "Liturgical",
      docTypes: [
        {label: "All", value: "all"}
        , {label: "Biblical", value: "Biblical"}
        , {label: "Liturgical", value: "Liturgical"}
      ]
      ,
      domain: "*"
      ,
      selectedBook: "*"
      ,
      selectedChapter: "*"
      ,
      query: ""
      ,
      matcher: "c"
      ,
      matcherTypes: [
        {label: "contains", value: "c"}
        , {label: "starts with", value: "sw"}
        , {label: "ends with", value: "ew"}
        , {label: "matches regular expression", value: "rx"}
      ]
      ,
      suggestedQuery: ""
      ,
      docProp: "nnp"
      ,
      propertyTypes: [
        {label: "ID", value: "id"}
        , {label: "Value (insensitive)", value: "nnp"}
        , {label: "Value (sensitive)", value: "value"}
      ]
      ,
      docPropMessage: ""
      ,
      docPropMessageById: "Search By ID searches the ID of the docs, with the parts domain~topic~key, e.g. gr_gr_cog~actors~Priest."
      ,
      docPropMessageByValue: "Search By Value is insensitive to accents, case, and punctuation."
      ,
      docPropMessageByValueSensitive: "Search By Value (sensitive) is sensitive to accents, case, and punctuation."
      ,
      message: "Important messages will appear here..."
      ,
      messageIcon: this.messageIcons.info
      ,
      searchFormToggle: this.messageIcons.toggleOff
      ,
      showSearchForm: true
      ,
      advancedSearchFormToggle: this.messageIcons.toggleOn
      ,
      searchFormToggleMessage: "show advanced options"
      ,
      simpleSearchMessage: "hide advanced options"
      ,
      advancedSearchMessage: "show advanced options"
      ,
      searchFormType: "simple"
      ,
      showSearchResults: false
      ,
      data: {values: [{"doc.id": "", "doc.value:": ""}]}
      ,
      options: {
        sizePerPage: 30
        , sizePerPageList: [5, 15, 30]
        , onSizePerPageList: this.onSizePerPageList
        , hideSizePerPage: true
        , paginationShowsTotal: true
      }
      ,
      selectRow: {
        mode: 'radio' // or checkbox
        , hideSelectColumn: true
        , clickToSelect: true
        , onSelect: this.handleRowSelect
      }
      ,
      selectedID: ""
      ,
      selectedIdPartsPrompt: "Select one or more ID parts, then click on the search icon:"
      ,
      selectedIdParts: [
        {key: "domain", label: ""},
        {key: "topic", label: ""},
        {key: "key", label: ""}
      ]
      ,
      showIdPartSelector: false
      ,
    };
    this.handleIdQuerySelection = this.handleIdQuerySelection.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.onSizePerPageList = this.onSizePerPageList.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
    this.toggleSearchForm = this.toggleSearchForm.bind(this);
    this.handleAdvancedSearchSubmit = this.handleAdvancedSearchSubmit.bind(this);
    this.handleSimpleSearchSubmit = this.handleSimpleSearchSubmit.bind(this);
    this.getSearchForm = this.getSearchForm.bind(this);
    this.searchFormOptions = this.searchFormOptions.bind(this);
    this.searchFormOptionIcons = this.searchFormOptionIcons.bind(this);
    this.handleSearchFormTypeChange = this.handleSearchFormTypeChange.bind(this);
    this.toogleIdPattern = this.toogleIdPattern.bind(this);
  }

  componentWillMount = () => {
    this.setState({
          message: "Important messages will appear here..."
          , messageIcon: this.messageIcons.info
          , docPropMessage: this.state.docPropMessageByValue
        }
    );
    let config = {
      auth: {
        username: this.props.username
        , password: this.props.password
      }
    };
    let path = server.getServerDbApi() + 'dropdowns';
    axios.get(path, config)
        .then(response => {
          this.setState({
                dropdowns: {
                  Biblical: {
                    all: {
                      books: response.data.values[0]["all"][0]["books"]
                      , chapters: response.data.values[0]["all"][0]["chapters"]
                    }
                    , domains: response.data.values[0]["domains"]
                    , topics: response.data.values[0]["topics"]
                  }
                  , Liturgical: {
                    all: {
                      books: response.data.values[1]["all"][0]["books"]
                    }
                    , domains: response.data.values[1]["domains"]
                    , topics: response.data.values[1]["topics"]
                  }
                  , loaded: true
                }
              }
          );
        })
        .catch((error) => {
          let message = error.message;
          let messageIcon = this.messageIcons.error;
          if (error && error.response && error.response.status === 401) {
            message = "this is a protected database";
            messageIcon = this.messageIcons.error;
          } else if (error && error.response && error.response.status === 404) {
            message = "error retrieving values for dropdowns";
            messageIcon = this.messageIcons.error;
          } else if (error && error.message && error.message.toLowerCase() === "network error") {
            message = "The database server is not available.";
            messageIcon = this.messageIcons.error;
          }
          this.setState({data: message, message: message, messageIcon: messageIcon});
        });
  };

  toggleSearchForm = () => {
    let showing = this.state.searchFormType;
    let searchFormToggleIcon;
    let searchFormToggleMessage;

    if (showing) {
      searchFormToggleIcon = this.messageIcons.toggleOn;
      searchFormToggleMessage = this.state.advancedSearchMessage;
    } else {
      searchFormToggleIcon = this.messageIcons.toggleOff;
      searchFormToggleMessage = this.state.simpleSearchMessage;
    }
    this.setState({
      searchFormType: !showing
      , searchFormToggle: searchFormToggleIcon
      , searchFormToggleMessage: searchFormToggleMessage
  });
  }
  searchFormOptionIcons() {
    return (
        <div>
          Search Type:
          <span className="App-search-options">
          <label
              id={this.searchFormTypes.simple}
              className="App-search-form-option-label control-label"
              onClick={this.handleSearchFormTypeChange}>
            <FontAwesome
                id={this.searchFormTypes.simple}
                onClick={this.handleSearchFormTypeChange}
                name={this.messageIcons.simpleSearch}
            />Simple
          </label>
          <label
              id={this.searchFormTypes.advanced}
              onClick={this.handleSearchFormTypeChange}
              className="App-search-form-option-label control-label">
            <FontAwesome
                id={this.searchFormTypes.advanced}
                onClick={this.handleSearchFormTypeChange}
                name={this.messageIcons.advancedSearch}
            />
            Advanced
          </label>
          <label
              id={this.searchFormTypes.idPattern}
              onClick={this.handleSearchFormTypeChange}
              className="App-search-form-option-label control-label">
            <FontAwesome
                id={this.searchFormTypes.idPattern}
                onClick={this.handleSearchFormTypeChange}
                name={this.messageIcons.idPatternSearch}
            />
            ID parts
          </label>
          </span>
        </div>
    );
  }

  handleSearchFormTypeChange (event) {
    switch(event.target.id) {
      case (this.searchFormTypes.simple): {
        this.setState({
          searchFormType: this.searchFormTypes.simple
        });
        break;
      }
      case (this.searchFormTypes.advanced): {
        this.setState({
          searchFormType: this.searchFormTypes.advanced
        });
        break;
      }
      case (this.searchFormTypes.idPattern): {
        this.setState({
          searchFormType: this.searchFormTypes.idPattern
        });
        break;
      }
      default: {
        break;
      }
    }
  }

  formOptionStyles = {
    hidden: { display: 'none' }
    , visible: { display: 'inline' }
  }

  toogleIdPattern (id) {
    if (id.length > 0) {
      return this.formOptionStyles.visible;
    } else {
      return this.formOptionStyles.hidden;
    }
  }


  searchFormOptions(id) {
    return (
        <div>
          Search form:
        <label className="App-search-checkbox">
              <input
                  type="radio"
                  name="docprop"
                  value="id"
                  onChange={this.handleSearchFormTypeChange}
                  checked={this.state.docProp === 'id'}
              />
               <span className="control-label App-search-form-option-label">simple</span>
            </label>
            <label className="App-search-checkbox">
              <input
                  type="radio"
                  name="docprop"
                  value="nnp"
                  onChange={this.handleSearchFormTypeChange}
                  checked={this.state.docProp === 'nnp'}
              />
              <span className="control-label App-search-form-option-label">advanced</span>
            </label>
          {id.length > 0 &&
            <label className="App-search-checkbox">
              <input
                  type="radio"
                  name="docprop"
                  value="value"
                  onChange={this.handleSearchFormTypeChange}
                  checked={this.state.docProp === 'value'}
              />
              <span className="control-label App-search-form-option-label">ID parts</span>
            </label>
          }
      </div>
    );
  }
  getSearchForm(type) {
    switch(type) {
      case (this.searchFormTypes.advanced): {
        return (
            <SearchOptionsAdvanced
                docTypes={this.state.docTypes}
                dropDowns={this.state.dropdowns}
                properties={this.state.propertyTypes}
                propertyTitle="and property:"
                matchers={this.state.matcherTypes}
                matcherTitle=""
                valueTitle=""
                handleSubmit={this.handleAdvancedSearchSubmit}
            />
        );
      }
      case (this.searchFormTypes.idPattern): {
        if (this.state.selectedId && this.state.selectedId.length > 0) {
          return (
              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12">
                  <IdQuerySelector
                      items={this.state.selectedIdParts}
                      handleSelection={this.handleIdQuerySelection}
                      prompt={this.state.selectedIdPartsPrompt}
                  />
                </div>
              </div>
          );
        } else {
          return (
            <div className="control-label">You must first use the simple or advanced search.  Once you have results, click on a row.  You will then see the parts of the ID and be able to search based on the ID parts.</div>
          );
        }
      }
      default: {
        return (
            <SearchOptionsSimple
                valueTitle=""
                placeholder="enter a word or phrase and press the search icon..."
                handleSubmit={this.handleSimpleSearchSubmit}
            />
        );
      }
    }
  }


  handleIdQuerySelection(value) {
    this.setState({
          domain: "*"
          , selectedBook: "*"
          , selectedChapter: "*"
          , docProp: "id"
          , matcher: "rx"
          , query: value
        }
        , function () {
          this.fetchData();
        }
    );
  }

  handleAdvancedSearchSubmit = (
      type
      , domain
      , book
      , chapter
      , property
      , matcher
      , value
  ) => {
    this.setState({
      docType: type
      , domain: domain
      , selectedBook: book
      , selectedChapter: chapter
      , docProp: property
      , matcher: matcher
      , query: value
      }
      , function () {
          this.fetchData();
        }
    );
  };

  handleSimpleSearchSubmit = (value) => {
    this.setState({
         docType: "Liturgical"
         , domain: "*"
          , selectedBook: "*"
         , selectedChapter: "*"
         , docProp: "nnp"
         , matcher: "c"
         , query: value
        }
        , function () {
          this.fetchData();
        }
    );
  };


  handleRowSelect = (row, isSelected, e) => {
    let idParts = row["doc.id"].split("~");
    this.setState({
      selectedId: row["doc.id"]
      , selectedIdParts: [
        {key: "domain", label: idParts[0]},
        {key: "topic", label: idParts[1]},
        {key: "key", label: idParts[2]}
      ]
      , showIdPartSelector: true
    });
  }

  onSizePerPageList = (sizePerPage) => {
    this.setState({
      options: {sizePerPage: sizePerPage}
    });
  }

  /**
   * font-awesome icons for messages
   * @type {{info: string, warning: string, error: string}}
   */
  messageIcons = {
    info: "info-circle"
    , warning: "lightbulb-o"
    , error: "exclamation-triangle"
    // , toggleOn: "eye"
    // , toggleOff: "eye-slash"
    , toggleOn: "toggle-on"
    , toggleOff: "toggle-off"
    , simpleSearch: "minus"
    , advancedSearch: "bars"
    , idPatternSearch: "key"
  }

  searchFormTypes = {
    simple: "simple"
    , advanced: "advanced"
    , idPattern: "id"
  }

  setMessage(message) {
    this.setState({
      message: message
    });
  }

  fetchData(event) {
    this.setState({message: "Searching...", messageIcon: this.messageIcons.info});
    let config = {
      auth: {
        username: this.props.username
        , password: this.props.password
      }
    };

    let parms =
            "?t=" + encodeURIComponent(this.state.docType)
            + "&d=" + encodeURIComponent(this.state.domain)
            + "&b=" + encodeURIComponent(this.state.selectedBook)
            + "&c=" + encodeURIComponent(this.state.selectedChapter)
            + "&q=" + encodeURIComponent(this.state.query)
            + "&p=" + encodeURIComponent(this.state.docProp)
            + "&m=" + encodeURIComponent(this.state.matcher)
        ;
    let path = server.getServerDbApi() + 'docs' + parms;
    axios.get(path, config)
        .then(response => {
          this.setState({
                data: response.data
              }
          );
          let message = "No docs found...";
          if (response.data.valueCount && response.data.valueCount > 0) {
            message = "Found " + response.data.valueCount + " docs.  You can filter the docs using the box below..."
          }
          this.setState({
                message: message
                , messageIcon: this.messageIcons.info
                , showSearchResults: true
              }
          );
        })
        .catch((error) => {
          let message = error.message;
          let messageIcon = this.messageIcons.error;
          if (error && error.response && error.response.status === 404) {
            message = "no docs found";
            messageIcon = this.messageIcons.warning;
            this.setState({data: message, message: message, messageIcon: messageIcon});
          }
        });
  }

  /**
   * If the type of doc is
   *  Liturgical
   * and selected selectedBook is
   *  eothinon
   *  menaion
   *  octoechos
   * then display the additional two dropdown boxes, e.g. for month and day
   *
   *  Biblical
   *  then display selectedChapter numbers <-- must vary based on selectedBook!
   *
   * TODO: in Java, query database for each domain and collect the possible values for each part of the topic.
   * @returns {XML}
   */

//          <div>Search Form: <FontAwesome onClick={this.toggleSearchForm} name={this.state.searchFormToggle}/>{this.state.searchFormToggleMessage}</div>


  render() {
    return (
        <div className="App-search">
          <div>{this.searchFormOptionIcons()}</div>
          <div className="App-search-form">
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-12">
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-12">
                {this.getSearchForm(this.state.searchFormType)}
              </div>
            </div>
          </div>

          <div>Search Result: <span className="App-message"><FontAwesome
              name={this.state.messageIcon}/>{this.state.message}</span>
          </div>
          {this.state.showSearchResults &&
          <div className="App-search-results">
            <div className="row">
              <BootstrapTable
                  data={this.state.data.values}
                  trClassName={"App-data-tr"}
                  search
                  searchPlaceholder='type here to filter search results...'
                  striped
                  hover
                  pagination
                  options={ this.state.options }
                  selectRow={ this.state.selectRow }
              >
                <TableHeaderColumn
                    isKey
                    dataField='doc.id'
                    dataSort={ true }
                    hidden
                    width='1px'>ID</TableHeaderColumn>
                <TableHeaderColumn
                    dataField='doc.domain'
                    dataSort={ true }
                    width='10%'>Domain</TableHeaderColumn>
                <TableHeaderColumn
                    dataField='doc.topic'
                    dataSort={ true }
                    width='10%'>Topic</TableHeaderColumn>
                <TableHeaderColumn
                    dataField='doc.key'
                    dataSort={ true }
                    width='10%'>Key</TableHeaderColumn>
                <TableHeaderColumn
                    dataField='doc.value'
                    dataSort={ true }
                    width='60%'>Value</TableHeaderColumn>
              </BootstrapTable>
            </div>
          </div>
          }
        </div>
    )
  }
}

export default Search;