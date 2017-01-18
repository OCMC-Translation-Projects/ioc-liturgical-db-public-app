import React from 'react'
import server from '../../config/server';

export default React.createClass({
  render() {
    // because of the way the install bash script works
    // the last number needs to be 9 or less
    const version = "1.3.1";
    return <div className="App-page App-page-about">
      <h2>About the Database</h2>
      <div className="jumbotron">
        <p>The International Orthodox Christian (IOC) Liturgical Database contains the common Greek version of the Eastern Orthodox Christian liturgical texts and translations of the Greek text. Because the liturgical texts make reference to the Bible, the database also contains biblical texts, which include the LXX (Greek Old Testament), the Greek Patriarchal New Testament, and translations.</p>
        <p>All translations in the database are either public domain or available by their license, or used by permission.</p>
        <p>The database was developed by and is maintained by staff of the Orthodox Christian Mission Center (<a className="App-link" href="http://www.ocmc.org" target="_blank">OCMC</a>).  The primary purpose of the database is to be the backend of applications that provide tools for liturgical translation and the generation of liturgical services and books.  However, it is provided as a public service to Orthodox Christians worldwide.</p>
        <p>The IDs used to identify parts of liturgical texts were created by Fr. Seraphim Dedes and are used in the AGES Liturgical Workbench (ALWB).  ALWB was jointly developed by OCMC and <a className="App-link" href="http://www.agesinitiatives.org/" target="_blank">AGES, Initiatives, Inc.</a> ALWB is used to produce the website of services found at the <a className="App-link" href="http://www.agesinitiatives.com/dcs/public/dcs/dcs.html" target="">Digital Chant Stand.</a> ALWB and other software developed by OCMC are intended to support any language as spoken in any country for any jurisdiction. This is why an ID is made of three parts: an ISO language code, an ISO country code, and a realm.  This same system of identification is used with biblical texts.</p>
      </div>
      <p>Front-end app version {version}.</p>
      <p>DB server at {server.getDbServerPath()}</p>
      <p>REST server at {server.getWsServerPath()}</p>
    </div>
  }
})
