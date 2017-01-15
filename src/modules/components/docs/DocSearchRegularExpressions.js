import React from 'react';
import SsRegEx from '../images/SsRegEx';
import SsRegExResult from '../images/SsRegExResult';

export default React.createClass({
  render() {
    return (
    <div className="App-help-doc-regex-search">
      <div className="jumbotron">
        <h2>Regular Expressions</h2>
        <p>The use of regular expressions is a powerful but very advanced feature.  To learn about regular expressions in general, search the Internet. The following information specific to this database is adapted from a Neo4j manual:</p>
        <p>The regular expression syntax used by the database is inherited from the Java regular expressions. This includes support for flags that change how strings are matched, including case-insensitive (?i), multiline (?m) and dotall (?s). Flags are given at the start of the regular expression.</p>
        <p>If the string you want does not occur at the start of the property, it is necessary to put <em>.*</em> before the string.  And, if it does not occur at the end, it is necessary to put <em>.*</em> at the end. For example, doing a regular expression search using the expression <em>blessed</em> will only find docs that both start with and end with <em>blessed</em>.  There are none.  The expression <em>blessed.*</em> will find docs that start with the word <em>blessed</em>.  The expression <em>.*blessed</em> will find docs that end with the word <em>blessed</em>. And the expression <em>.*blessed.*</em> will find docs that have the word <em>blessed</em> anywhere in the text. This is such a simple example that you would not use a regular expression. But, it illustrates the use of <em>.*</em> when creating regular expressions.</p>
        <p>Regular expression can be escaped using a forward slash, e.g. <em>\\/</em>  Remember that back slash needs to be escaped in string literals.</p>
        <p>By pre-pending a regular expression with (?i), the whole expression becomes case insensitive.</p>
        <p>Let's consider an example of the use of a regular expression.  Let's say that we are interested in seeing places in the liturgical text where we ask for God to do something through the prayers or intercessions of someone.. We could use the following regular expression: <em>.*through the (prayers|intercessions) of.*</em></p>
        <p>We have .* at the beginning and end to search for its occurrence anywhere in a doc.  And, we want to search for either <em>prayers</em> or <em>intercessions</em>, so we put them in parentheses and separate the two words using the pipe symbol | which in a regular expression means <em>or</em>.</p>
        <SsRegEx/>
        <p/>
        <p>After running the search using the regular expression, the result is:</p>
        <SsRegExResult/>
        <p/>
        <p>When we examine the results of the search, we can see that the phrase <em>through the prayers of</em> or the phrase <em>through the intercessions of</em> has the following petitioners:</p>
        <ul>
          <li>Apostles</li>
          <li>Archangels</li>
          <li>hierarchies on high</li>
          <li>holy Mother</li>
          <li>Martyrs</li>
          <li>Saints</li>
          <li>Theotokos</li>
          <li>the Forerunner</li>
          <li>etc., etc.</li>
        </ul>
        <p>You can also use regular expressions to search the Greek docs.  The Greek equivalent regular expression to find the variations of the phrase <em>kingdom of</em> <em>God</em> or <em>heaven</em> or <em>the Father</em> in the Greek text is <em>.*βασιλεια.*(Θεια|οθρανων|πατρος).*</em></p>
      </div>
    </div>
    )
  }
})
