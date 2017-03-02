import React from 'react';
import axios from 'axios';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import server from '../../config/server';
import SearchOptionsAdvanced from "../components/SearchOptionsAdvanced";
import SearchOptionsSimple from "../components/SearchOptionsSimple";
import ModalCompareDocs from '../components/ModalCompareDocs';
import FontAwesome from 'react-fontawesome';
import {Alert, Glyphicon, Panel, PanelGroup} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import auth from '../components/Auth';

export class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      docType: "Liturgical",
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
      searchFormToggle: this.messageIcons.toggleOff
      ,
      showSearchForm: true
      ,
      filterMessage: this.props.labels.search.msg5
      ,
      selectMessage: this.props.labels.search.msg6
      ,
      searchFormType: "simple"
      ,
      showSearchResults: false
      ,
      resultCount: 0
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
        , hideSelectColumn: false
        , clickToSelect: false
        , onSelect: this.handleRowSelect
        , className: "App-row-select"
      }
      ,
      showSelectionButtons: false
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
      , showModalCompareDocs: false
      , idColumnSize: "80px"
      , message: this.props.labels.search.msg1
      , messageIcon: this.messageIcons.info
    };
    this.handleIdQuerySelection = this.handleIdQuerySelection.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.onSizePerPageList = this.onSizePerPageList.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
    this.toggleSearchForm = this.toggleSearchForm.bind(this);
    this.handleAdvancedSearchSubmit = this.handleAdvancedSearchSubmit.bind(this);
    this.handleSimpleSearchSubmit = this.handleSimpleSearchSubmit.bind(this);
    this.getSearchForm = this.getSearchForm.bind(this);
    this.getSearchAccordion = this.getSearchAccordion.bind(this);
    this.searchFormOptionIcons = this.searchFormOptionIcons.bind(this);
    this.handleSearchFormTypeChange = this.handleSearchFormTypeChange.bind(this);
    this.toogleIdPattern = this.toogleIdPattern.bind(this);
    this.showSelectionButtons = this.showSelectionButtons.bind(this);
    this.handleCompareRequest = this.handleCompareRequest.bind(this);
    this.handleExpandRequest = this.handleExpandRequest.bind(this);
    this.getSelectedDocOptions = this.getSelectedDocOptions.bind(this);
    this.showRowComparison = this.showRowComparison.bind(this);
    this.getDocComparison = this.getDocComparison.bind(this);
    this.handleCloseDocComparison = this.handleCloseDocComparison.bind(this);
    this.getBars = this.getBars.bind(this);
    this.getDocTypeOptions = this.getDocTypeOptions.bind(this);
    this.getMatcherOptions = this.getMatcherOptions.bind(this);
  }

  componentWillMount = () => {
    this.setState({
          message: this.props.labels.search.msg1
          , messageIcon: this.messageIcons.info
          , docPropMessage: this.state.docPropMessageByValue
        }
    );
    let config = {
      auth: {
        username: auth.getUsername()
        , password: auth.getPassword()
      }
    };
    let path = server.getWsServerDbApi() + 'dropdowns';
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
            message = server.getDbServerPath() + " is a protected database.  Please login and try again.";
            messageIcon = this.messageIcons.error;
          } else if (error && error.response && error.response.status === 404) {
            message = "error retrieving values for dropdowns";
            messageIcon = this.messageIcons.error;
          } else if (error && error.message && error.message.toLowerCase() === "network error") {
            message = "The database server " + server.getDbServerPath() + " is not available.";
            messageIcon = this.messageIcons.error;
          }
          this.setState({data: message, message: message, messageIcon: messageIcon});
        });
  };

  login(loginRequired) {
    if (loginRequired) {
      this.props.router.replace('/login');
    }
  }

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

  getDocTypeOptions () {
    return (
        [
            {label: this.props.labels.search.docTypeAny, value: "all"}
            , {label: this.props.labels.search.docTypeBiblical, value: "Biblical"}
            , {label: this.props.labels.search.docTypeLiturgical, value: "Liturgical"}
        ]
    )
  }
  getMatcherOptions () {
    return (
        [
            {label: this.props.labels.search.matchesAnywhere, value: "c"}
            , {label: this.props.labels.search.matchesAtTheStart, value: "sw"}
            , {label: this.props.labels.search.matchesAtTheEnd, value: "ew"}
            , {label: this.props.labels.search.matchesRegEx, value: "rx"}
        ]
    );
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

   getSearchAccordion() {
         return (
             <PanelGroup defaultActiveKey="1" accordion>
               <Panel  className="App-search-panel" header={this.props.labels.search.simple} eventKey="1">
                 <SearchOptionsSimple
                     valueTitle=""
                     placeholder={this.props.labels.compSimpleSearch.prompt}
                     handleSubmit={this.handleSimpleSearchSubmit}
                 />
               </Panel>
               <Panel className="App-search-panel" header={this.props.labels.search.advanced} eventKey="2">
                 {this.state.dropdowns ?
                     <SearchOptionsAdvanced
                         docTypes={this.getDocTypeOptions()}
                         dropDowns={this.state.dropdowns}
                         properties={this.state.propertyTypes}
                         matchers={this.getMatcherOptions()}
                         handleSubmit={this.handleAdvancedSearchSubmit}
                         labels={this.props.labels.search}
                     />
                     : "Loading dropdowns for advanced search..."}
               </Panel>
             </PanelGroup>
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
                 matchers={this.state.matcherTypes}
                 handleSubmit={this.handleAdvancedSearchSubmit}
                 labels={this.props.labels.search}
             />
         );
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

  handleCompareRequest() {
    if (this.state.selectedIdParts) {
      this.setState({
            domain: "*"
            , selectedBook: "*"
            , selectedChapter: "*"
            , docProp: "id"
            , matcher: "rx"
            , query: ".*"
              + this.state.selectedIdParts[1].label
              + "~.*"
              + this.state.selectedIdParts[2].label
          }
          , function () {
            this.fetchData();
          }
      );
    }
  }

  handleExpandRequest() {
    if (this.state.selectedIdParts) {
      this.setState({
            domain: "*"
            , selectedBook: "*"
            , selectedChapter: "*"
            , docProp: "id"
            , matcher: "rx"
            , query: this.state.selectedIdParts[0].label
            + "~"
            + this.state.selectedIdParts[1].label
            + "~.*"
          }
          , function () {
            this.fetchData();
          }
      );
    }
  }

  getSelectedDocOptions() {
    return (
        <div>Selected doc: <span className="App-selected">{this.state.selectedID}</span>
          <span
              className="App-search-form-option-label"
              onClick={this.handleCompareRequest}>
                <FontAwesome name="ellipsis-v"/>Compare
              </span>
          <span
              className="App-search-form-option-label"
              onClick={this.handleExpandRequest}>
                <FontAwesome name="arrows-h"/>Expand
              </span>
        </div>
    )
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
      , showModalCompareDocs: true
    }, this.showRowComparison(row["doc.id"]));
  }
//    }, this.showSelectionButtons(row["doc.id"]));

  showRowComparison = (id) => {
    this.setState({
      showModalCompareDocs: true
      , selectedID: id
    })
  }

  handleCloseDocComparison = () => {
    this.setState({
      showModalCompareDocs: false
    })
  }

  getDocComparison = () => {
    return (
        <ModalCompareDocs
            showModal={this.state.showModalCompareDocs}
            title={this.state.selectedID}
            docType={this.state.docType}
            selectedIdParts={this.state.selectedIdParts}
            onClose={this.handleCloseDocComparison}
            labels={this.props.labels.search}
        />
    )
  }

  showSelectionButtons = (id) => {
    this.setState({
      showSelectionButtons: true
      , selectedID: id
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
    this.setState({message: this.props.labels.search.msg2, messageIcon: this.messageIcons.info});
    let config = {
      auth: {
        username: auth.getUsername()
        , password: auth.getPassword()
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
    let path = server.getWsServerDbApi() + 'docs' + parms;
    axios.get(path, config)
        .then(response => {
          this.setState({
                data: response.data
              }
          );
          let resultCount = 0;
          let message = "No docs found...";
          if (response.data.valueCount && response.data.valueCount > 0) {
            resultCount = response.data.valueCount;
            message = this.props.labels.search.msg3
                + " "
                + response.data.valueCount
                + " "
                + this.props.labels.search.msg4
                + "."
          } else {
            message = this.props.labels.search.msg3
                + " 0 "
                + this.props.labels.search.msg4
                + "."
          }
          this.setState({
                message: message
                , resultCount: resultCount
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

  getBars = () => {
      return (
        <span><FontAwesome name="bars"/></span>
      )
    };

  render() {
    return (
        <div className="App-page App-search">
          <h3>{this.props.labels.search.pageTitle}</h3>
          <div className="App-search-form">
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-12">
                {this.getSearchAccordion(this.state.searchFormType)}
              </div>
            </div>
          </div>

          <div>{this.props.labels.search.resultLabel}: <span className="App-message"><FontAwesome
              name={this.state.messageIcon}/>{this.props.labels.search.msg3} {this.state.resultCount} {this.props.labels.search.msg4} </span>
          </div>
          {this.state.showSearchResults &&
              <div>
                {this.props.labels.search.msg5} {this.props.labels.search.msg6}
              </div>
          }
          {this.state.showSelectionButtons && this.getSelectedDocOptions()}
          {this.state.showModalCompareDocs && this.getDocComparison()}
          {this.state.showSearchResults &&
          <div className="App-search-results">
            <div className="row">
              <BootstrapTable
                  data={this.state.data.values}
                  trClassName={"App-data-tr"}
                  search
                  searchPlaceholder={this.props.labels.compTable.filterPrompt}
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
                    >ID</TableHeaderColumn>
                <TableHeaderColumn
                    dataField='doc.domain'
                    dataSort={ true }
                    width={this.state.idColumnSize}>{this.props.labels.compTable.headerDomain}</TableHeaderColumn>
                <TableHeaderColumn
                    dataField='doc.topic'
                    dataSort={ true }
                    width={this.state.idColumnSize}>{this.props.labels.compTable.headerTopic}</TableHeaderColumn>
                <TableHeaderColumn
                    dataField='doc.key'
                    dataSort={ true }
                    width={this.state.idColumnSize}>{this.props.labels.compTable.headerKey}</TableHeaderColumn>
                <TableHeaderColumn
                    dataField='doc.value'
                    dataSort={ true }
                    >{this.props.labels.compTable.headerValue}</TableHeaderColumn>
              </BootstrapTable>
            </div>
          </div>
          }
          <Alert bsStyle="info"><Glyphicon glyph="bullhorn" /> If you want to work with us to add your language to the user interface, or the translation of the liturgical texts in your language, please contact us. We are especially looking for volunteers to translate the user interface for this website into: Arabic, Chinese, French, Spanish, and Swahili. Also, we are looking for volunteers to enter officially approved Arabic, Chinese, French, Spanish, and Swahili translations of the liturgical texts. See how to contact us by looking at the bottom of the About page.</Alert>
          <Alert bsStyle="warning"><Glyphicon glyph="warning-sign" /> From time to time, we need to update the web app or the database. If you suddenly see messages about network errors or something not being available, wait a few minutes and try again.</Alert>
        </div>
    )
  }
}

export default Search;