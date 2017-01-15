import React from 'react';
import FontAwesome from 'react-fontawesome';
import SsInitial from '../images/SsSearchAvancedInitial';
import SsBiblicalInitial from '../images/SsSearchAvancedBiblicalInitial';
import SsLiturgicalInitial from '../images/SsSearchAvancedLiturgicalInitial';
export default React.createClass({
  render() {
    return (
    <div className="App-help-doc-advanced-search">
      <div className="jumbotron">
        <h2>Advanced Search</h2>
        <p>The advanced search displays after you click on the link that says <em>Advanced</em> when you are on the <em>Search</em> page.</p>
        <p>It looks like this when it first displays:</p>
        <SsInitial />
        <p>To use it:</p>
        <ol>
          <li>Select the type of doc you want to search for from the dropdown labeled <em>Find Doc(s) where type is...</em>.</li>
          <ul>
            <li>Any</li>
            <li>Biblical</li>
            <li>Liturgical</li>
          </ul>
          <li>Select the domain from the dropdown labeled <em>and domain is:</em>.</li>
        </ol>
        <p>If you select Biblical as the search doc type, and select the <em>NT - Greek - Patriarchal</em> domain, and the book of <em>Acts</em>, and chapter 1, you will see the following:</p>
        <SsBiblicalInitial/>
        <p>If you select Liturgical as the search doc type, and <em>Common Orthodox Church</em> as the domain, and <em>Menaion</em> as the book, and <em>January</em> as the month, you will see the following:</p>
      <SsLiturgicalInitial/>
        <p>Once you get this far, you can either click on the search icon <FontAwesome name="search"/>, or you can set property options.</p>
        <p>To set property options for an advanced search, do the following:</p>
        <ol>
          <li>Select the property:</li>
            <ul>
              <li>ID</li>
              <li>Value (insensitive)</li>
              <li>Value (sensitive)</li>
            </ul>
          <li>Select the part of the property to search:</li>
            <ul>
              <li>contains</li>
              <li>starts with</li>
              <li>ends with</li>
              <li>matches regular expression</li>
            </ul>
          <li>Enter the word or phrase to search for, or if it is a regular expression, enter the regular expression.</li>
          <li>Click on the search icon <FontAwesome name="search"/></li>
        </ol>
        <p>Notes:</p>
        <ul>
          <li><em>contains</em> means the property has this word or phrase anywhere in the property value.</li>
          <li><em>starts with</em> means the desired word or phrase must occur at the beginning of the property value.</li>
          <li><em>ends with</em> means the desired word or phrase must occur at the end of the property value.</li>
          <li><em>matches regular expression</em> means that you are not entering a simple word or phrase, but you are using a special tool known as a regular expression. See below.</li>
        </ul>
        <p>Tip: In a dropdown, if you start typing, it will filter the dropdown values to match what you are typing.</p>
      </div>
    </div>
    )
  }
})
