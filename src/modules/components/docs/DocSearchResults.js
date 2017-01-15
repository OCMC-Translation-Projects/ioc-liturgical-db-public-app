import React from 'react'
import SsSearchResultYourKingdomOf from '../images/SsSearchResultYourKingdomOf';
import SsShowingRows from '../images/SsSearchShowingRows';

export default React.createClass({
  render() {
    return (
    <div className="App-help-doc-search-results">
      <div className="jumbotron">
        <h2>Search Results</h2>
        <p>Below is an example of the result of searching for the phrase <em>kingdom of God</em></p>
        <SsSearchResultYourKingdomOf />
        <p>There are many things to note about the screen shot above...</p>
        <ol>
          <li>Directly below the search text box, the <em>Search Result</em> line tells you how many docs matched your search request.  In this case, it found three docs.</li>
          <li>Each matching doc is shown as its own row.</li>
          <li>Below the rows of matching docs is a message that tells you how many rows are being displayed.  In this case, it is showing <em>rows 1 to 3 of 3</em>.  That means all the matching docs fit on a single web page. (See below about what happens if the rows don't all fit on a page).</li>
          <li>Notice that the search phrase <em>your kingdom of</em> is all lowercase and has no punctuation.  But, the search result was <em>Your kingdom, of</em> and <em>your kingdom, of</em>. The simple search ignores capitalization, diacritics, and punctuation.</li>
          <li>Note that below the <em>Search Result</em> line there is a text box that says <em>type here to filter search results...</em>.  Once you have found docs, you can filter them by typing additional words.</li>
          <li>The column headings of the results table have small up and down arrows.  Click these to sort the results by a particular co</li>
        </ol>
        <p>Note that if the number of docs found are too many to fit on a single page, you will see something like this:</p>
        <SsShowingRows />
        <p>This tells you that there are 746 rows (i.e. docs) and it is showing rows 1 to 30.  Notice on the right there are page numbers.  You can jump directly to a page.  Or you can go to the next page using the <em>></em> button, or to the last page using the <em>>></em> button. Keep in mind that <em>page</em> here refers to a page of search results, not a page in a biblical or liturgical book.</p>
      </div>
    </div>
    )
  }
})
