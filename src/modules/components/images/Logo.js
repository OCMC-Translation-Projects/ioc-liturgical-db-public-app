import React from 'react'
import logo from './graphics/ocmc-globe-3.png'

class Logo extends React.Component {
  render() {
    return <img className="App-img App-img-logo" alt="IOC-TMS Logo" role="presentation" src={logo} height="30px" width="110px"/>
  }
};

export default Logo;

