import { Navbar, Nav, Button } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push(`/${e.target.name}`);
  };

  return (
    <>
      <Navbar bg="light" expand="lg" style={{ hight: "130px" }}>
        <Navbar.Brand href="#home" onClick={handleClick} name="">
          Note App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={handleClick} name="createNewNote">
              Create new
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
