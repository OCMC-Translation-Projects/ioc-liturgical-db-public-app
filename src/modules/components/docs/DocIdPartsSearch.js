import React from 'react';
import SsBeforeSelection from '../images/SsIdPartsBeforeSelection';
import SsSelected from '../images/SsIdPartsSelected';
import SsResult from '../images/SsIdPartsResult';

export default React.createClass({
  render() {
    return (
        <div className="App-help-doc-simple-search">
          <div className="jumbotron">
            <h2>ID Parts Search</h2>
            <p>The ID parts search buttons appear after you have selected a row from the results of either a <em>Simple</em> search or a <em>Advanced</em> search.</p>
            <p>For example, before selecting a row, it might look like this:</p>
            <SsBeforeSelection/>
            <p/>
            <p>And, after clicking the search icon, a new line appears that looks like this:</p>
            <SsSelected/>
            <p/>
            <p>There is an option to use the selected ID to compare versions of the selected doc.  To do so, click on the <em>Compare</em> link.  If you do so, it would look like this:</p>
            <SsResult/>
            <p>The screen shot above is showing you all versions that have the selected row's topic and key. This makes it easy to compare them.  When we created this help page, there were only two versions in the database.  But, over time we will be adding more English versions as well as translations from around the world.</p>
            <p>The <em>Expand</em> option will search the database using the selected row's domain and topic.</p>
          </div>
        </div>
    )
  }
})
