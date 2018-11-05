import React, { Component } from "react";
import { authContext } from "../adal/config";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";

class NavBar extends Component {
  handleLogout = () => {
    authContext.logOut();
  };

  render() {
    var user = authContext.getCachedUser();
    return (
      <Navbar inverse fluid collapseOnSelect>
        <Navbar.Header width="100%">
          <Navbar.Brand>
            <a href="/">Orders of {user.profile.name}</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem onClick={this.handleLogout}>Log out</NavItem>
        </Nav>
      </Navbar>
    );
  }
}
export default NavBar;
