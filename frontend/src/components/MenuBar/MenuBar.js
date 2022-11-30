import { BrowserRouter as Router, Route, Switch, Link,withRouter } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SearchBar from "../Search/SearchBar";
import Notification from "../Notification/Notification";
import NavDropdown from 'react-bootstrap/NavDropdown';

const MenuBar = (props) => {
  const { menuItems, routes, bg, variant,filteredData,setFilteredData } = props;

  return (
    <div>
      {menuItems && menuItems.length ? (
        <Navbar bg={bg || "dark"} variant={variant || "dark"} expand="md">
          <Container>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <img src="/Logo.png"/>
                {menuItems.map((item, index) => {
                  return (
                    <Nav.Link key={index} as={Link} to={item.link}>
                      {item.name}
                    </Nav.Link>
                  );
                })}

                <NavDropdown title="Resource Library" id="basic-nav-dropdown">
                  <NavDropdown.Divider/>
                    <NavDropdown.Item href="#action/3.1">Investments</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Entrepreneurship</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Management</NavDropdown.Item>
                  <NavDropdown.Divider/>
                </NavDropdown>
                
              </Nav>
            </Navbar.Collapse>
            <SearchBar setFilteredData={setFilteredData} filteredData={filteredData} />
            <Notification/>
          </Container>
        </Navbar>
      ) : (
        ""
      )}

      <Switch>
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          );
        })}
      </Switch>
      </div>
   
  );
}

export default MenuBar;