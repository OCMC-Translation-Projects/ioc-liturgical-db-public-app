import React from 'react';
import { Nav, Navbar, NavDropdown, MenuItem, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Flag from './images/Flag';
import auth from './Auth';
import FontAwesome from 'react-fontawesome';

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {someProp: ""}

    this.handleLanguageChange = this.handleLanguageChange.bind(this);
  };

  handleLanguageChange = (event) => {
    if (event.target.id) {
      this.props.changeHandler(event.target.id);
      event.preventDefault();
    }
  };

  render() {
    return (
        <div className="App-header">
          <Navbar fluid fixedTop inverse collapseOnSelect>
            <Navbar.Header >
              <Navbar.Brand>
                <LinkContainer to="/search">
                  <NavItem eventKey={1}>
                    <span className="App-title">IOC Liturgical Database</span>
                  </NavItem>
                </LinkContainer>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <LinkContainer to="/search">
                  <NavItem eventKey={2}>{<FontAwesome  className="App-header-ico" name="search"/>}{this.props.labels.search}</NavItem>
                </LinkContainer>
                <LinkContainer to="/browser">
                  <NavItem eventKey={3}>{<FontAwesome  className="App-header-ico" name="database"/>}{this.props.labels.browser}</NavItem>
                </LinkContainer>
                <LinkContainer to="/about">
                  <NavItem eventKey={4}>{<FontAwesome className="App-header-ico" name="info-circle"/>}{this.props.labels.about}</NavItem>
                </LinkContainer>
                <LinkContainer to="/help">
                  <NavItem eventKey={5}>{<FontAwesome className="App-header-ico"  name="question-circle"/>}{this.props.labels.help}</NavItem>
                </LinkContainer>
                <NavDropdown eventKey={6} title={<Flag code={this.props.language}/>} id="basic-nav-dropdown">
                  <MenuItem eventKey={6.1} id="en" onClick={this.handleLanguageChange}><Flag code="en"/></MenuItem>
                  <MenuItem eventKey={6.2} id="el" onClick={this.handleLanguageChange}><Flag code="el"/></MenuItem>
                </NavDropdown>
                <NavDropdown eventKey={7} title={<FontAwesome name="user-o"/>} id="basic-nav-dropdown">
                  {! auth.isAuthenticated() ?
                      <LinkContainer to="/login"><NavItem eventKey={7.1} >{<FontAwesome className="App-header-ico"  name="sign-in"/>}{this.props.labels.login}</NavItem></LinkContainer>
                      : <LinkContainer to="/logout"><NavItem eventKey={7.1} >{<FontAwesome className="App-header-ico"  name="sign-out"/>}{this.props.labels.logout}</NavItem></LinkContainer>
                  }
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
    )
  }
}

export default Header;

