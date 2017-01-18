import React from 'react'
import SsSearchTypes from '../images/SsSearchTypes';
export default React.createClass({
  render() {
    return (
    <div className="App-help-doc-search-types">
      <div className="jumbotron">
        <p>There are three types of searches available--simple, advanced, and ID Parts. The first two types are shown below:</p>
        <SsSearchTypes />
        <p>When on the Search page, you can click on the blue links to access the search type that you want.</p>
      </div>
    </div>
    )
  }
})
