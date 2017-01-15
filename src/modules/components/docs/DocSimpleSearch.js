import React from 'react';
import FontAwesome from 'react-fontawesome';

export default React.createClass({
  render() {
    return (
    <div className="App-help-doc-simple-search">
      <div className="jumbotron">
        <h2>Simple Search</h2>
        <p>The simple search displays automatically when you first access the <em>Search</em> page. If you have switched to the <em>Advanced</em> search or the <em>ID Parts</em> search, click on the link for <em>Simple</em> to return to the Simple search.</p>
        <p>To use it:</p>
        <ol>
          <li>In the text box, type a word or phrase.</li>
          <li>Click the search icon <FontAwesome name={"search"}/>.</li>
        </ol>
        <p>Note that the word or phrase you enter does not need to be capitalized, or (if Greek) accented.  The simple search uses the doc property <em>nnp</em>.</p>
        <p>Also note that the simple search only searches docs that are liturgical.  It does not search the biblical docs.</p>
      </div>
    </div>
    )
  }
})
