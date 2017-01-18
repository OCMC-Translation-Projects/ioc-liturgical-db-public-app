import React from 'react'
import flag from './graphics/flags/en.ico'

export class FlagEn extends React.Component {

  //    return <img id="GB" className="App-flag" role="presentation" src={flag} height="100%" width="100%"/>

  render(){
    return (
       <img
           id="en"
           className="App-flag"
           role="presentation"
           src={flag}
       />
    )
};
}

export default FlagEn;