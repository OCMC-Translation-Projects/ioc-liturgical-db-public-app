/**
 * Created by mac002 on 12/7/16.
 */
import React from 'react';

export class Help extends React.Component {
  render() {
    return (

        <div className="App-help">
          <div className="jumbotron">
            <h2>How to Use the IOC Liturgical Database</h2>
            <h3>Using the Menu Bar</h3>
            <p>Click on the app logo to go to the home page. Click anywhere else in the menu bar to expand the menu.
              Click again to hide the menu.
            </p>
            <h3>Database Documents</h3>
            <p>You are probably familiar with how a verse in the Bible can be identified by knowing the Book, Chapter, and verse number.  In the same way, AGES, Initiatives, Inc. has created identifiers for each part of the liturgical texts.  Each part is a "doc".  In the IOC Liturgical Database, whether it is a biblical or liturgical doc, the doc has an ID and a value.  The ID is composed of three parts: a domain, a topic, and a key.  A domain is also composed of three parts: an ISO language code, an ISO country code, and a realm.  For example, the King James Version has the domain 'en_uk_kjv', indicating that it is English as spoken in the United Kingdom, and the realm is KJV. The common Greek text used liturgicaly by the Eastern Orthodox Church uses the domain 'gr_gr_cog', meaning, the Greek language, country of Greece, common Greek version.</p>
            <h3>Simple Search</h3>
            <p>The simple search allows you to enter a word or phrase and search the liturgical texts.  You can enter any language that is in the database.  If you enter Greek, you do not need to worry about the accents.  The search is also case insensitive.</p>
            <h3>Advanced Search</h3>
            <p>The advanced search allows you to indicate the type of text you want to search (e.g. Biblical vs Liturgical), which domain to use, which book to search, and which chapter or subdivision of the book.  You can also indicate whether you want to search the ID property or the value property.  The value property can be searched in an insensitive or sensitive manner.  There are options to search for a word or phrase at the beginning or the end of the selected property.  If you don't care where it occurs, select 'contains'.  If you understand regular expressions, there is also an option for that.</p>
            <h3>ID Parts Search</h3>
            <p>As noted above, an ID has three parts: domain, topic, and key.  After you use the simple or advanced search, you will see a list of docs that were found.  If you click on a doc you are interested in, then click on the 'ID Parts' search, you will see the ID of the doc you selected.  You can then check the boxes of the parts you want to search by.  For example, if you click on a doc whose ID is</p>
            <ul><li>en_us_dedes</li><li>da.d3</li><li>daMA.ExapTheotokion.text</li></ul>
            <p>you are viewing a translation by Fr. Seraphim Dedes.  If you want to see all versions for this doc, check the box for da.de and for daMa.ExapTheotokion.text, then click the search icon (the magnifying glass icon). You will then see all versions for that doc.  This is useful for comparing the Greek and its translations.</p>
          </div>
        </div>
    )
  }
}

export default Help;