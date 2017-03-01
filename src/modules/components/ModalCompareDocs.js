import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import FontAwesome from 'react-fontawesome';
import axios from 'axios';
import server from '../../config/server';
import auth from '../components/Auth';

/**
 * Display modal content.
 */
export class ModalCompareDocs extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showSearchResults: false
      , message: this.props.labels.msg1
      ,
      messageIcon: this.messageIcons.info
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
    }

    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.setMessage = this.setMessage.bind(this);
  };

  componentWillMount = () => {
    this.setState({
          showModal: this.props.showModal
          , domain: "*"
          , selectedBook: "*"
          , selectedChapter: "*"
          , docProp: "id"
          , matcher: "rx"
          , query: ".*"
          + this.props.selectedIdParts[1].label
          + "~.*"
          + this.props.selectedIdParts[2].label
        }
        , function () {
          this.fetchData();
        }
    );

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

  setMessage(message) {
    this.setState({
      message: message
    });
  }

  fetchData() {
    this.setState({message: this.props.labels.msg2, messageIcon: this.messageIcons.info});
    let config = {
      auth: {
        username: auth.getUsername()
        , password: auth.getPassword()
      }
    };

    let parms =
            "?t=" + encodeURIComponent(this.props.docType)
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
          let message = "No docs found...";
          if (response.data.valueCount && response.data.valueCount > 0) {
            message = this.props.labels.msg3
                + " "
                + response.data.valueCount
                + " "
                + this.props.labels.msg4
                + "."
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


  close() {
      this.setState({showModal: false});
      this.props.onClose();
    };

    open() {
      this.setState({showModal: true});
    };

    render() {
      return (
          <div>
            <Modal show={this.state.showModal} onHide={this.close}>
              <Modal.Header closeButton>
                <Modal.Title>{this.props.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>{this.props.labels.resultLabel}: <span className="App-message"><FontAwesome
                    name={this.state.messageIcon}/>{this.state.message}</span>
                </div>
                {this.state.showSelectionButtons && this.getSelectedDocOptions()}
                {this.state.showModalCompareDocs && this.getDocComparison()}
                {this.state.showSearchResults &&
                <div className="App-search-results">
                  <div className="row">
                    <BootstrapTable
                        data={this.state.data.values}
                        trClassName={"App-data-tr"}
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
                          width={this.state.idColumnSize}>Domain</TableHeaderColumn>
                      <TableHeaderColumn
                          dataField='doc.value'
                          dataSort={ true }
                      >Value</TableHeaderColumn>
                    </BootstrapTable>
                  </div>
                </div>
                }
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.close}>{this.props.labels.close}</Button>
              </Modal.Footer>
            </Modal>
          </div>
      );
    }
}
export default ModalCompareDocs;
