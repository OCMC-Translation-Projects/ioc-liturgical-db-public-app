import React from 'react'
import Header from './components/Header'
import Labels from '../labels/default';
import Logo from './components/images/Logo';

export class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      language: {
        language: "en"
        , labels: {
          header: Labels.labels.en.header
        }
      }
    }

    this.handleLanguageChange = this.handleLanguageChange.bind(this);
  };

  handleLanguageChange = (code) => {
    if (code.length > 0 && code !== "undefined") {
      this.setState({
        language: {
          code: code
          , labels: {
            header: Labels.labels[code].header
          }
        }
      });
    }
  };

  render() {
    return (
        <div className="App">
          <Logo/>
          <Header
              language={this.state.language.code}
              labels={this.state.language.labels.header}
              changeHandler={this.handleLanguageChange.bind(this)}
          />
          <div className="row App-content-row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              {this.props.children}
            </div>
          </div>
        </div>
    )
  }
}

export default App;
