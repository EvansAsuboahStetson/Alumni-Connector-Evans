import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function MenuBar(props) {
  const { menuItems, routes, bg, variant } = props;

  return (
    <Router>
      {menuItems && menuItems.length ? (
        <Navbar bg={bg || "dark"} variant={variant || "dark"} expand="md">
          <Container>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                {menuItems.map((item, index) => {
                  return (
                    <Nav.Link key={index} as={Link} to={item.link}>
                      {item.name}
                    </Nav.Link>
                  );
                })}
              </Nav>
            </Navbar.Collapse>
            <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search for a major..."
              className="me-2"
              aria-label="Search"
            />
            <Link to="/MajorPage">
            <Button variant="outline-success">Search</Button>
            </Link>
          </Form>
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
    </Router>
  );
}
