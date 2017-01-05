import React from 'react'
import Hymnographers from './Hymnographers'

export default React.createClass({
  render() {
    return (
    <div className="App-home">
      <div className="jumbotron">
        <h3>Welcome!</h3>
        <Hymnographers />
        <p>Welcome to translators of the liturgical texts, and to scholars who are creating resources to help us understand the meaning of the texts!</p>
        <p>Through the prayers of the Holy Hymnographers Saints Komas the Melodist, John of Damascus, and Nikodemos the Athenite, may our work be done in God, by Him, and through Him, to His glory and honor!</p>
      </div>
    </div>
    )
  }
})
