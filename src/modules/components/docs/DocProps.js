import React from 'react'
export default React.createClass({
  render() {
    return (
    <div className="App-help-doc-props">
      <div className="jumbotron">
        <h2>Understanding the Doc Properties</h2>
        <p>Each biblical and liturgical doc stored in the database has the following properties:</p>
        <ol>
          <li>ID</li>
          <li>value</li>
          <li>nnp</li>
        </ol>
        <p>The <em>ID</em> has been described above.  The <em>value</em> is the actual text of the document.  The <em>nnp</em> means <em>Normalized, No Punctuation</em>.  It is not displayed to you, but is a version of the text with the diacritics (e.g. accent marks) removed, uppercase converted to lowercase, and punctuation removed.  The importance of the nnp property is that it allows you to search without worrying about case, accents, or punctuation.  What is returned back from a search is the actual text, not the nnp.</p>
        <p>Note that in the search function (described below), the phrase <em>Value (nonsensitive)</em> means the search uses the <em>nnp</em> property, and the phrase <em>Search (sensitive)</em> means the search uses the <em>Value</em> property.</p>
      </div>
    </div>
    )
  }
})
