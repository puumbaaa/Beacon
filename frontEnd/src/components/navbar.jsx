import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../pages_style/home_style.css';

export function CustomNavbar() {
    return (
        <Navbar className="navbar-custom" expand="lg" fixed="top">
            <Container>
                <div className="d-flex align-items-center">
                    <Navbar.Brand href="/" className="brand-left">
                        <img
                            src="/img/logo_beacon.png"
                            width="60"
                            height="60"
                            className="d-inline-block align-top"
                            alt="Beacon logo"
                            draggable="false"
                        />
                        <span className="ms-2">
                            <img
                                src="/img/Beacon_Title.png"
                                width="100"
                                height="25"
                                alt="Beacon Title"
                                draggable="false"
                                className="title-shadow"
                            />
                        </span>
                    </Navbar.Brand>
                </div>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/guide">GUIDES</Nav.Link>
                        <Nav.Link as={Link} to="/usersearch">Player Search</Nav.Link>
                        <Nav.Link as={Link} to="/profil_in_game">PROFIL IN-GAME</Nav.Link>
                        <Nav.Link as={Link} to="/pro_tips">PRO TIPS</Nav.Link>
                        <Nav.Link as={Link} to="/e-sport">E-SPORT</Nav.Link>
                    </Nav>
                    <Nav className="align-items-center">
                        <Nav.Link href="/login">
                            <img
                                src="/img/login_img.png"
                                width="40"
                                height="40"
                                className="d-inline-block align-top"
                                alt="Register"
                                draggable="false"
                            />
                        </Nav.Link>
                        <Nav.Link href="#language" className="flag-link">
                            <img
                                src="/img/french_flag.png"
                                width="40"
                                height="25"
                                className="d-inline-block align-top"
                                alt="French flag"
                                draggable="false"
                            />
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
