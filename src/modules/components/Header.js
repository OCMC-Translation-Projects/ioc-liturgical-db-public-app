import React from 'react';
import { Nav, Navbar, NavDropdown, MenuItem, NavItem } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import {Flag} from 'ioc-liturgical-react';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import Actions from '../../reducers/actionTypes';
import Logo from './images/Logo';

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {someProp: ""}

    this.handleLanguageChange = this.handleLanguageChange.bind(this);
  };

  handleLanguageChange = (event) => {
    if (event.target.id) {
      this.props.dispatch(
          {
            type: Actions.SET_SESSION_LANGUAGE_CODE
            , code: event.target.id
          }
      );
      event.preventDefault();
    }
  };

  render() {
    return (
        <div className="App-header">
          <Navbar fluid fixedTop inverse collapseOnSelect>
            <Navbar.Header >
              <Navbar.Brand>
                <IndexLinkContainer to="/home">
                  <NavItem eventKey={1}>
                    <Logo/>
                    <span className="App-title">Liturgical Database</span>
                  </NavItem>
                </IndexLinkContainer>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                {! this.props.app.session.db.isProtected || this.props.app.session.userInfo.authenticated ?
                    <LinkContainer to="/search">
                      <NavItem eventKey={2}>{<FontAwesome  className="App-header-ico" name="search"/>}{this.props.app.session.labels.header.search}</NavItem>
                    </LinkContainer>
                    :
                    ""
                }
                <LinkContainer to="/about">
                  <NavItem eventKey={4}>{<FontAwesome className="App-header-ico" name="info-circle"/>}{this.props.app.session.labels.header.about}</NavItem>
                </LinkContainer>
                  {this.props.app.session.userInfo.authenticated ?
                      <LinkContainer to="/admin">
                        <NavItem eventKey={5}>{<FontAwesome className="App-header-ico"  name="lock"/>}{"Administer"}</NavItem>
                      </LinkContainer>
                    : ""}
                <LinkContainer to="/help">
                  <NavItem eventKey={6}>{<FontAwesome className="App-header-ico"  name="question-circle"/>}{this.props.app.session.labels.header.help}</NavItem>
                </LinkContainer>
                <NavDropdown eventKey={7} title={<Flag code={this.props.app.session.languageCode}/>} id="basic-nav-dropdown">
                  <MenuItem eventKey={7.1} id="en" onClick={this.handleLanguageChange}><Flag code="en"/></MenuItem>
                  <MenuItem eventKey={7.2} id="el" onClick={this.handleLanguageChange}><Flag code="el"/></MenuItem>
                </NavDropdown>
                <NavDropdown eventKey={8} title={<FontAwesome name="user-o"/>} id="basic-nav-dropdown">
                  {! this.props.app.session.userInfo.authenticated ?
                      <LinkContainer to="/login"><NavItem eventKey={7.1} >{<FontAwesome className="App-header-ico"  name="sign-in"/>}{this.props.app.session.labels.header.login}</NavItem></LinkContainer>
                      : <LinkContainer to="/logout"><NavItem eventKey={7.1} >{<FontAwesome className="App-header-ico"  name="sign-out"/>}{this.props.app.session.labels.header.logout}</NavItem></LinkContainer>
                  }
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
    )
  }
}

/**
 * Maps the redux store state to this component's props.
 * @param state
 * @returns {{app: *}}
 */
function mapStateToProps(state) {
  return (
      {
        app: state
      }
  );
}
export default connect(mapStateToProps) (Header);
