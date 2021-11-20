import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const NavBar = (props) => {

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Home</NavbarBrand>
        <NavbarToggler  />
        <Collapse  navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/about_us">About us</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Student Section
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem  href="/answer_upload">
                  Post Answer
                </DropdownItem>
                <DropdownItem  href="/result">
                 Result Page
                </DropdownItem>
                <DropdownItem divider />
              </DropdownMenu>
            </UncontrolledDropdown>
            {/**/ }
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                TA Section
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem  href="/main_checker">
                  Check Papers
                </DropdownItem>
                <DropdownItem  href="/review_checker">
                  Cross Check
                </DropdownItem>
                <DropdownItem divider />
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText>Contact us</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;