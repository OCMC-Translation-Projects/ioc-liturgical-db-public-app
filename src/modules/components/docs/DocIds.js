import React from 'react'
import MeM1D1A1 from '../images/MeM1D1A1';

export class DocIds extends React.Component {
  render() {
    return (
        <div className="App-help-doc-ids">
          <div className="jumbotron">
            <p>When the Bible was written, it did not have chapter and verse numbers.  These were added centuries later so that people have a common, standardized way to talk about a specific part of the Bible.  A biblical chapter and verse number uniquely identifies a small document (or, doc for short).  For biblical text, we call that kind of doc a verse.</p>
            <p>Fr. Seraphim Dedes has created the equivalent of chapter and verse identifiers for the Eastern Orthodox Christian liturgical texts.  This identification scheme is used in AGES Liturgical Workbench (ALWB), jointly developed by <a className="App-link" href="http://www.agesinitiatives.org" target="_blank">AGES, Initiatives, Inc.</a> and <a className="App-link" href="http://ocmc.org" target="_blank">OCMC</a>.</p>
            <p>Each doc in the database has an ID that uniquely identifies it.  The ID is composed of three parts:</p>
            <ol>
              <li>Domain</li>
              <li>Topic</li>
              <li>Key</li>
            </ol>
            <p>The domain is equivalent to the version of a Bible translation.  For example, KJV for the King James Version of the Bible.  The topic is equivalent to a Bible book name.  For example the book of Genesis.  The key is equivalent to the chapter and verse number.</p>
            <p>In order to understand how each doc is uniquely identified in the database, consider the following:</p>
            <MeM1D1A1 />
            <p>The text is from the Menaion, Month 1, Day 6, that is, the Theophany of our Lord. Let's look at the ID.  The ID is composed of the domain, topic, and key.</p>
            <p>Let's start with the topic.  In this case, the topic part of the ID is <em>me.m01.d06</em>.  Note that topics often have parts separated by a period.  The first part <em>me</em> means <em>Menaion</em>. The second part <em>m01</em> means <em>Month 1</em>.  The last part <em>d06</em> means <em>Day 6</em>.</p>
            <p>Now, look at the key <em>meVE.Apolytikion1.text</em>.  Again, <em>me</em> means <em>Menaion</em>.  <em>VE</em> means <em>Vespers</em>.  The key also indicates this is Apolytikion 1, which is the dismissal hymn for Vespers.</p>
            <p>Lastly, look at the domain.  Notice that the two rows (one English and one Greek) have the different domains, but the same topic and key.</p>
            <p>A domain is equivalent to a Bible version, for example, RSV, the Revised Standard Version.  A domain has three parts:</p>
            <ol>
              <li>Language Code</li>
              <li>Country Code</li>
              <li>Realm</li>
            </ol>
            <p>The language code is a 2-3 character code from the International Standards Organization (ISO) and uniquely identifies a language.  The country code is from the ISO country code table. A realm is an identifier for a particular translator, a particular diocese, or metropolis.</p>
            <p>Let's look at the domain <em>gr_gr_cog</em>.  The first <em>gr</em> is the language code, and means <em>Greek</em>.  Note that the ISO code for modern Greek is <em>el</em>, so <em>gr</em> signifies non-modern Greek, e.g. Classical, or Hellenistic, or Byzantine. The second <em>gr</em> means the country <em>Greece</em>.  The realm <em>cog</em> is an acronymn and means <em>Common Orthodox Greek</em>, in other words, the Greek liturgical text commonly used by Orthodox Christians around the world.</p>
            <p>The domain <em>en_us_dedes</em> means, English as spoken in the United States, translation by Fr. Seraphim Dedes.  Although it is not shown here, another example is <em>en_uk_lash</em>, which means <emp>English as spoken in the United Kingdom, translation by Fr. Ephrem Lash (of blessed memory).</emp></p>
          </div>
        </div>
    )
  }
}

export default DocIds;
