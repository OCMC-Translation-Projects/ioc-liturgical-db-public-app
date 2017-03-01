import React, { Component , PropTypes} from 'react';
import ResourceSelector from './ReactSelector'
import FontAwesome from 'react-fontawesome';

/**
 * To future maintainers of this code.
 * Two months ago, I had never coded using React Js.
 * The code I have written without a doubt needs to be
 * examined carefully if you are skilled in React JS.
 * Michael Colburn, March 1, 2017
 */
class SearchOptions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      docType: "Liturgical"
      , domain: "*"
      , selectedBook: "*"
      , selectedChapter: "*"
      , property: "nnp"
      , matcher: "c"
      , value: ""
      , dropdowns: {Biblical: [], Liturgical: [], loaded: false}
      , dropDownDomains: {
        show: false
        , msg: this.props.labels.domainIs
        , source: []
        , initialValue: "*"
      }
      ,
      dropDownBooks: {
        show: true
        , msg: this.props.labels.bookIs
        , source: []
        , initialValue: "*"
      }
      ,
      dropDownChapters: {
        show: false
        , msg: ""
        , initialValue: "*"
        , source: []
      }
    };
    this.handleDocTypeChange = this.handleDocTypeChange.bind(this);
    this.handleDomainChange = this.handleDomainChange.bind(this);
    this.handleBookChange = this.handleBookChange.bind(this);
    this.handleChapterChange = this.handleChapterChange.bind(this);
    this.handlePropertyChange = this.handlePropertyChange.bind(this);
    this.handleMatcherChange = this.handleMatcherChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setBookDropdown = this.setBookDropdown.bind(this);
    this.setChaptersDropdown = this.setChaptersDropdown.bind(this);
    this.setDomainDropdown = this.setDomainDropdown.bind(this);
    this.setGenericBookDropdown = this.setGenericBookDropdown.bind(this);
    this.setGenericChaptersDropdown = this.setGenericChaptersDropdown.bind(this);
    this.suggestedQuery = this.suggestedQuery.bind(this);
    this.getDropdownChapterTitle = this.getDropdownChapterTitle.bind(this);
    this.getDropdownSectionTitle = this.getDropdownSectionTitle.bind(this);
    this.resetDropDownBooksState = this.resetDropDownBooksState.bind(this);
    this.cascadeDocTypeChange = this.cascadeDocTypeChange.bind(this);
  }

  componentWillMount = () => {
    this.setState(
        {
          dropdowns: {
            Biblical: {
              all: {
                books: this.props.dropDowns.Biblical.all.books
                , chapters: this.props.dropDowns.Biblical.all.chapters
              }
              , domains: this.props.dropDowns.Biblical.domains
              , topics: this.props.dropDowns.Biblical.topics
            }
            , Liturgical: {
              all: {
                books: this.props.dropDowns.Liturgical.all.books
              }
              , domains: this.props.dropDowns.Liturgical.domains
              , topics: this.props.dropDowns.Liturgical.topics
            }
            , loaded: true
          }
        }
        , function () {
          this.handleDocTypeChange({
            value: "Liturgical"
          })
        }
    )
  }

  resetDropDownBooksState() {
    this.setState({
      selectedBook: "*"
      , dropDownBooks: {
        show: this.state.docType !== "Any"
        , msg: this.props.labels.bookIs
        , source: []
        , initialValue: "*"
      }
    });
  }

  handleDocTypeChange = (selection) => {
      this.setState({
        docType: selection["value"]
        , suggestedQuery: this.suggestedQuery(selection["value"])
        , domain: "*"
        , selectedBook: "*"
        , selectedChapter: "*"
      }, this.cascadeDocTypeChange(selection["value"]));
//      this.setGenericBookDropdown(selection["value"]);
//      this.setGenericChaptersDropdown(selection["value"]);
  };

  cascadeDocTypeChange(selection) {
      this.setDomainDropdown(selection);
      this.setGenericBookDropdown(selection);
      this.setGenericChaptersDropdown(selection);
  }

  handlePropertyChange = (item) => {
    this.setState({property: item.value});
  }

  handleMatcherChange = (item) => {
    this.setState({matcher: item.value});
  }

  handleValueChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    this.props.handleSubmit(
        this.state.docType
        , this.state.domain
        , this.state.selectedBook
        , this.state.selectedChapter
        , this.state.property
        , this.state.matcher
        , this.state.value
    );
    event.preventDefault();
  }

  handleDomainChange = (selection) => {
    this.setState({domain: selection["value"]}, this.setBookDropdown(selection["value"]));
  };

  handleBookChange = (selection) => {
    this.setState({
      selectedBook: selection["value"]
    }, this.setChaptersDropdown(selection["value"]));
  };


  handleChapterChange = (selection) => {
    this.setState({
      selectedChapter: selection["value"]
      , dropDownChapters: {
          show: this.state.dropDownChapters.show
          , msg: this.state.dropDownChapters.msg
          , source: this.state.dropDownChapters.source
          , initialValue: selection["value"]
      }
    });
  }


  setDomainDropdown = (docType) => {
    let msg = "";
    let show = false;
    let source = {};
    let showBooks = false;
    let bookMsg = "";
    let bookSource = [];
    switch (docType) {
      case "All": {
        show = false;
        break;
      }
      case "Biblical": {
        msg = this.props.labels.domainIs;
        show = true;
        if (this.state.dropdowns.loaded) {
          source = this.state.dropdowns.Biblical.domains;
        }
        break;
      }
      case "Liturgical": {
        msg = this.props.labels.domainIs;
        show = true;
        if (this.state.dropdowns.loaded) {
          source = this.state.dropdowns.Liturgical.domains;
          showBooks = true;
          bookMsg = this.props.labels.bookIs;
          bookSource = this.state.dropdowns.Liturgical["all"].books;
        }
        break;
      }
      default: {
        show = false;
        break;
      }
    }
    this.setState({
      dropDownDomains: {
        show: show
        , msg: msg
        , source: source
        , initialValue: "*"
      },
      dropDownBooks: {
        show: showBooks
        , msg: bookMsg
        , source: bookSource
        , initialValue: "*"
      },
      dropDownChapters: {
        show: false
        , msg: ""
        , source: []
        , initialValue: "*"
      }
    });
  }


  setGenericBookDropdown(type) {
    try {
      let msg = this.props.labels.bookIs;
      let show = false;
      let source = {};
      if (this.props.dropDowns) {
        if (type === "Biblical" && this.state.dropdowns.Biblical) {
          show = true;
          source = this.state.dropdowns.Biblical.all.books;
        } else if (type === "Liturgical" && this.state.dropdowns.Liturgical) {
          show = true;
          source = this.state.dropdowns.Liturgical.all.books;
        } // end of if
      }
      this.setState({
        dropDownBooks: {
          show: show
          , msg: msg
          , source: source
          , initialValue: "*"
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  } // end of method

  setBookDropdown(domain) {
    let msg = this.props.labels.bookIs;
    let show = false;
    let source = {};
    if (this.state.docType === "Biblical") {
      show = true;
      source = this.state.dropdowns.Biblical.topics[domain];
    } else if (this.state.docType === "Liturgical") {
      show = true;
      source = this.state.dropdowns.Liturgical["all"].books;
//      source = this.state.dropdowns.Liturgical.topics[domain];
    } // end of if
    this.setState({
      dropDownBooks: {
        show: show
        , msg: msg
        , source: source
      }
    });
  } // end of method

  setChaptersDropdown(book) {
    let msg = "";
    let show = false;
    let source = {};
    if (this.state.docType === "Biblical") {
      if (this.state.domain === "*") {
        msg = this.props.labels.chapterIs;
        show = true;
        source = this.state.dropdowns.Biblical.all.chapters;
      } else {
        msg = this.props.labels.chapterIs;
        show = true;
        source = this.state.dropdowns.Biblical.topics[this.state.domain + '.' + book];
      }
    } else if (this.state.docType === "Liturgical") {
          if (this.state.dropdowns.loaded) {
            if (this.state.domain === "*") {
              source = this.state.dropdowns.Liturgical.topics["gr_gr_cog." + book]
              show = (source !== undefined);
            } else {
              source = this.state.dropdowns.Liturgical.topics[this.state.domain + "." + book]
              show = (source !== undefined);
            }
          }
    } // end of if
    this.setState({
      selectedChapter: "*"
      , dropDownChapters: {
        show: show
        , msg: msg
        , source: source
        , initialValue: "*"
      }
    });
  } // end of method

  setGenericChaptersDropdown(type) {
    let msg = "";
    let show = false;
    let source = {};
    if (type === "Biblical") {
      msg = "Select Chapter...";
      show = true;
      source = this.state.dropdowns.Biblical.all.chapters;
    } // end of if
    this.setState({
      dropDownChapters: {
        show: show
        , msg: msg
        , source: source
      }
    });
  } // end of method


  suggestedQuery(docType) {
    if (docType === "Biblical") {
      return "Enter a word or phrase from the Bible, even Greek...";
    } else if (docType === "Liturgical") {
      return "Enter a word or phrase from the Liturgical texts, even Greek...";
    } else {
      return "Enter a word or phrase from the Liturgical texts or the Bible, even Greek...";
    }
  }
  getDropdownChapterTitle() {
    let msg = "";
    if (this.state.docType === "Biblical") {
      if (this.state.domain === "*") {
        msg = this.props.labels.chapterIs;
      } else {
        msg = this.props.labels.chapterIs;
      }
    } else if (this.state.docType === "Liturgical") {
      switch (this.state.selectedBook) {
        case "da":
          msg = this.props.labels.dayIs;
          break;
        case "eo":
          msg = this.props.labels.weekIs;
          break;
        case "eu":
          msg = this.props.labels.serviceIs;
          break;
        case "he":
          msg = this.props.labels.typeIs;
          break;
        case "hi":
          msg = this.props.labels.sectionIs;
          break;
        case "ho":
          msg = this.props.labels.sectionIs;
          break;
        case "oc":
          msg = this.props.labels.modeIs;
          break;
        case "me":
          msg = this.props.labels.monthIs;
          break;
        case "pe":
          msg = this.props.labels.dayIs;
          break;
        case "tr":
          msg = this.props.labels.dayIs;
          break;
        default:
          msg = this.props.labels.chapterIs;
      }
    } // end of if
    return msg;
  }

  getDropdownSectionTitle() {
    let msg = "";
    if (this.state.docType === "Biblical") {
    } else if (this.state.docType === "Liturgical") {
      switch (this.state.selectedBook) {
        case "he":
          msg = this.props.labels.modeIs;
          break;
        case "oc":
          msg = this.props.labels.dayIs;
          break;
        case "me":
          msg = this.props.labels.monthIs;
          break;
        default:
          msg = "undefined subsection";
      }
    } // end of if
    return msg;
  }

  render() {
    return (
        <div className="container">
          <div>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <ResourceSelector
                    title={this.props.labels.findWhereTypeIs}
                    initialValue={this.state.docType}
                    resources={this.props.docTypes}
                    changeHandler={this.handleDocTypeChange}
                />
              </div>
            </div>
            {this.state.dropDownDomains.show &&
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <ResourceSelector
                    title={this.props.labels.domainIs}
                    initialValue={this.state.domain}
                    resources={this.state.dropDownDomains.source}
                    changeHandler={this.handleDomainChange}
                />
              </div>
            </div>
            }
            {this.state.dropDownBooks.show &&
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <ResourceSelector
                    title={this.props.labels.bookIs}
                    initialValue={this.state.selectedBook}
                    resources={this.state.dropDownBooks.source}
                    changeHandler={this.handleBookChange}
                />
              </div>
            </div>
            }
            {this.state.dropDownChapters.show &&
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <ResourceSelector
                    title={this.getDropdownChapterTitle()}
                    initialValue={this.state.selectedChapter}
                    resources={this.state.dropDownChapters.source}
                    changeHandler={this.handleChapterChange}
                />
              </div>
            </div>
            }
            <div><p/></div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <ResourceSelector
                  title={this.props.labels.propertyIs}
                  initialValue=""
                  resources={this.props.properties}
                  changeHandler={this.handlePropertyChange}
              />
              <ResourceSelector
                  title={this.props.matcherTitle}
                  initialValue=""
                  resources={this.props.matchers}
                  changeHandler={this.handleMatcherChange}
              />
              <form onSubmit={this.handleSubmit}>
                <div className="control-label"></div>
              <input
                  type="text"
                  onChange={this.handleValueChange}
                  className="App-search-text-input"
                  name="search"/>
                <span className="App-text-search-icon" >
                    <FontAwesome
                        type="submit"
                        onClick={this.handleSubmit}
                        name={"search"}/>
                </span>
              </form>
            </div>
          </div>
        </div>
    );
  }
}

SearchOptions.propTypes = {
  docTypes: PropTypes.array.isRequired
  , dropDowns: PropTypes.object.isRequired
  , properties: PropTypes.array.isRequired
  , matchers: PropTypes.array.isRequired
  , handleSubmit: PropTypes.func.isRequired
  , labels: PropTypes.object.isRequired
};

export default SearchOptions;