/**
 * Created by mac002 on 12/7/16.
 */
import React from 'react';
import DocIds from '../components/docs/DocIds';
import DocProps from '../components/docs/DocProps';
import DocSearchTypes from '../components/docs/DocSearchTypes';
import DocSimpleSearch from '../components/docs/DocSimpleSearch';
import DocSearchResults from '../components/docs/DocSearchResults';
import DocSearchAdvanced from '../components/docs/DocSearchAdvanced';
import DocIdPartsSearch from '../components/docs/DocIdPartsSearch';
import DocRegEx from '../components/docs/DocSearchRegularExpressions';

export class Help extends React.Component {
  render() {
    return (
        <div className="App-help">
          <div className="jumbotron">
            <h2>How to Use the IOC Liturgical Database</h2>
            <p>Please keep in mind that the primary purpose of the database is to be the backend of applications that support the translation of liturgical texts, and the generation of services and books.  The texts are not stored as books.  The liturgical text has been broken into paragraphs, and sometimes even a single word or phrase.</p>
            <p>Although the primary purpose of the database is for use by applications, as a public service to the Orthodox Christian community worldwide, we have provided a search capability on this website. Below is information that will help you use the search function.</p>
            <DocIds />
            <DocProps />
            <DocSearchTypes />
            <DocSimpleSearch />
            <DocSearchResults />
            <DocSearchAdvanced/>
            <DocIdPartsSearch/>
            <DocRegEx/>
          </div>
        </div>
    )
  }
}

export default Help;