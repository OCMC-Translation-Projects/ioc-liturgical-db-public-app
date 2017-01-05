import React from 'react'
import Header from './Header'

export default React.createClass({
  render() {
    return (
      <div className="App">
        <Header />
        <div className="row App-content-row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
})
