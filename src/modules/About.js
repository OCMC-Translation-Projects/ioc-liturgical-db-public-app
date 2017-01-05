import React from 'react'

export default React.createClass({
  render() {
    var version = "v1.0.2";
    return <div className="App-intro">
      <div className="jumbotron">
      <h2>About the IOC Liturgical Database {version}</h2>
        <p>The International Orthodox Christian (IOC) contains the common Greek version of the Eastern Orthodox Christian liturgical texts.  It also contains translations of the Greek text and Biblical texts.  Biblical texts include the LXX (Greek Old Testament), the Greek Patriarchal New Testament, and translations.</p>
        <p>This web site provides read-only access to the database.  An updatable database is also available for authorized applications.</p>
        <p>The IOC-Liturgical-DB is provided free-of-charge to the worldwide Orthodox Christian community.  It was developed by the <a className="App-info-anchor" href="www.ocmc.org">Orthodox Christian Mission Center (OCMC)</a> in cooperation with <a className="App-info-anchor" href="http://agesinitiatives.org/">AGES, Initiatives, Inc.</a></p>
    </div>
    </div>
  }
})
