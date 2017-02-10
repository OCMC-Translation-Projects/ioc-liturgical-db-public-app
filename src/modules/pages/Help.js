/**
 * Created by mac002 on 12/7/16.
 */
import React from 'react';
import DocIds from '../components/docs/DocIds';
import DocProps from '../components/docs/DocProps';
import DocComparison from '../components/docs/DocComparison';
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
          <h2>{this.props.labels.help.pageTitle}</h2>
          <div className="jumbotron">
            <p>
              {this.props.labels.help.para01}
            </p>
            <p>
              {this.props.labels.help.para02}
            </p>
            <p>
              {this.props.labels.help.para03}
            </p>
            <Accordion>
              <Panel header={this.props.labels.help.secDocIds} eventKey="1">
                <DocIds
                    labelDomain={this.props.labels.compTable.headerDomain}
                    labelTopic={this.props.labels.compTable.headerTopic}
                    labelKey={this.props.labels.compTable.headerKey}
                    labels={this.props.labels.help}/>
              </Panel>
              <Panel header={this.props.labels.help.secDocProps} eventKey="2">
                <DocProps labels={this.props.labels.help}/>
              </Panel>
              <Panel header={this.props.labels.help.secDocSearchTypes} eventKey="3">
                <DocSearchTypes labels={this.props.labels.help}/>
              </Panel>
              <Panel header={this.props.labels.help.secSimpleSearch}  eventKey="4">
                <DocSimpleSearch labels={this.props.labels.help}/>
              </Panel>
              <Panel header={this.props.labels.help.secSearchResults} eventKey="6">
                <DocSearchResults labels={this.props.labels.help}/>
              </Panel>
              <Panel header={this.props.labels.help.secDocVersionComparisonTitle} eventKey="5">
                <DocComparison labels={this.props.labels.help}/>
              </Panel>
              <Panel header={this.props.labels.help.secAdvancedSearch} eventKey="7">
                <DocSearchAdvanced labels={this.props.labels.help}/>
              </Panel>
              <Panel header={this.props.labels.help.secDocRegExSearch}  eventKey="8">
                <DocRegEx labels={this.props.labels.help}/>
              </Panel>
            </Accordion>
          </div>
        </div>
    )
  }
}

export default Help;