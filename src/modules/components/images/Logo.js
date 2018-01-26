import React from 'react'
import logo from './graphics/ocmc-globe-3.png'

class Logo extends React.Component {
  render() {
    return <img className="App-img App-img-logo" alt="IOC-TMS Logo" role="presentation" src={logo} height="36px" width="120px"/>
  }
};

export default Logo;

