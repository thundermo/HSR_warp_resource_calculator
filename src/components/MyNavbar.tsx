import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import DarkModeSwitch from "./DarkModeSwitch";
import { useEffect, useRef, useState } from "react";

const MyNavbar = () => {
  const [expanded, setExpanded] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  const collapseNavbar = () => {
    setExpanded(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target as Node)
    ) {
      setExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Navbar
      ref={navbarRef}
      expanded={expanded}
      expand="lg"
      className="fixed-top bg-body-tertiary"
    >
      <Container fluid>
        <Navbar.Brand
          className="text-info"
          href="/HSR_warp_resource_calculator/"
        >
          HSR Helper
        </Navbar.Brand>
        <div className="d-flex justify-content-end">
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setExpanded(!expanded)}
          />
        </div>
        <Navbar.Collapse id="basic-navbar-nav" className="">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/HSR_warp_resource_calculator/"
              onClick={collapseNavbar}
            >
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="about" onClick={collapseNavbar}>
              About
            </Nav.Link>
            <Nav.Link as={Link} to="releated_links" onClick={collapseNavbar}>
              Related Links
            </Nav.Link>
            <Nav.Link as={Link} to="external_links" onClick={collapseNavbar}>
              External Links
            </Nav.Link>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <div onClick={collapseNavbar}>
            <DarkModeSwitch />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
