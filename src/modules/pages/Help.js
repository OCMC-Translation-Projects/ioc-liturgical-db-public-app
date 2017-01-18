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
import DocRegEx from '../components/docs/DocSearchRegularExpressions';
import {Panel, Accordion} from "react-bootstrap"

export class Help extends React.Component {
  render() {
    return (
        <div className="App-page App-help">
          <h2>How to Use the IOC Liturgical Database</h2>
          <div className="jumbotron">
            <p>Please keep in mind that the primary purpose of the database is to be the backend of applications that provide tools for translation of liturgical texts, and the generation of services and books.  The texts are not stored as books.  The liturgical text has been broken into paragraphs, and sometimes even a single word or phrase.</p>
            <p>Although the primary purpose of the database is for use by applications, as a public service to the Orthodox Christian community worldwide, we have provided a search capability on this website. Below is information that will help you use the search function. Click on a topic to open its contents.  Click again to hide them.</p>
            <p>The user interface for searching the database is still being worked on.  What you see on screens and how they look on the help page might be different for short periods of time.
            </p>
            <Accordion>
              <Panel header="Doc IDs" eventKey="1">
                <DocIds/>
              </Panel>
              <Panel header="Doc Properties" eventKey="2">
                <DocProps/>
              </Panel>
              <Panel header="Doc Search Types" eventKey="3">
                <DocSearchTypes />
              </Panel>
              <Panel header="Simple Search" eventKey="4">
                <DocSimpleSearch />
              </Panel>
              <Panel header="Search Results" eventKey="5">
                <DocSearchResults />
              </Panel>
              <Panel header="Advanced Search" eventKey="6">
                <DocSearchAdvanced/>
              </Panel>
              <Panel header="Regular Expression Search" eventKey="8">
                <DocRegEx/>
              </Panel>
            </Accordion>
          </div>
        </div>
    )
  }
}

export default Help;