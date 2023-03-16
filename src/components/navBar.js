import { Button, Nav, Navbar, Form } from 'react-bootstrap';
import { NavLink } from "react-router-dom";

function NavBar() {
    function logout() {
        sessionStorage.clear('token');
        window.location.reload()
    }

    return (
        <>
            <Navbar sticky="top" bg="white" variant="light" expand="lg">
                <Navbar.Brand as={NavLink} to="/">
                    <img
                        alt=""
                        src="https://apps.lib.kth.se/polopoly/KTH_Logotyp.svg"
                        width="75"
                        height="75"
                        className="d-inline-block align-top"
                    />{' '}
                    KTH Bibliotekets sökverktyg
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav variant="" activeKey="/">
                        <Nav.Item>
                            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={NavLink} to="/kthemployees">KTH Anställda(historik)</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={NavLink} to="/hr">KTH HR</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={NavLink} to="/ugusers">KTH Användare(UG)</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={NavLink} to="/openalex">Openalex</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Form className="d-flex">
                        <Button variant="outline-success" onClick={logout}>Logout</Button>
                    </Form>
                </Navbar.Collapse>
                <div id="gradientBorder"></div>
            </Navbar>
            
        </>
    );
}

export default NavBar;