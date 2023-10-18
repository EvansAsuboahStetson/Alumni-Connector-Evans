import React from "react";
import { BrowserRouter as Router, Route, Switch, Link, withRouter } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SearchBar from "../Search/SearchBar";
import Notification from "../Notification/Notification";
import MessageNotification from "../MessageNotification/MessageNotification";
import "./MenuBar.css";

const MenuBar = (props) => {
  const { menuItems, routes, bg, variant, filteredData, setFilteredData } = props;

  return (
    <div>
      {menuItems && menuItems.length ? (
        <Navbar bg={bg || "dark"} variant={variant || "dark"} expand="md">
          <Container>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <img className="logo" src="/images/logo.png" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                {menuItems.map((item, index) => (
                  <Nav.Link key={index} as={Link} to={item.link}>
                    {item.name}
                  </Nav.Link>
                ))}
              </Nav>
            </Navbar.Collapse>
            <div className="menu-bar-right">
              <SearchBar setFilteredData={setFilteredData} filteredData={filteredData} />
              <Notification />
              <MessageNotification />
            </div>
          </Container>
        </Navbar>
      ) : (
        ""
      )}

      <Switch>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        ))}
      </Switch>
    </div>
  );
};

export default MenuBar;
