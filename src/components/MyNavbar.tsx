import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import DarkModeSwitch from "./DarkModeSwitch";

const MyNavbar = () => {
  return (
    <Navbar expand="lg" className="fixed-top bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/HSR_wrap_resource_calculator/">
          HSR Helper
        </Navbar.Brand>
        <div className="d-flex justify-content-end">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />{" "}
        </div>
        <Navbar.Collapse id="basic-navbar-nav" className="">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/HSR_wrap_resource_calculator/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="releated_links">
              Related Links
            </Nav.Link>
            <Nav.Link as={Link} to="about">
              About
            </Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <div>
            <DarkModeSwitch />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
