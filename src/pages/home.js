import React from 'react';
import { Container, Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import '../pages_style/home_style.css';
import { Helmet } from 'react-helmet';

function Home() {
    return (
        <>
            <Helmet>
                <title>Beacon</title>
                <meta name="description" content="This is a website to improve your level on League of Legends" />
                <meta content="no-cache" />
                <meta charSet="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="shortcut icon" href="../img/logo_beacon.png" />
            </Helmet>

            <div id="wallpaper"></div>

            <Navbar className="navbar-custom" expand="lg" fixed="top">
                <Container>
                    <Navbar.Brand href="#home">
                        <img
                            src="../img/logo_beacon.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="Beacon logo"
                        />
                        <span>BEACON</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="./guides.js">GUIDES</Nav.Link>
                            <Nav.Link href="/usersearch">Player Search</Nav.Link>
                            <Nav.Link href="./profil_in_game.js">PROFIL IN-GAME</Nav.Link>
                            <Nav.Link href="./pro_tips.js">PRO TIPS</Nav.Link>
                            <Nav.Link href="./e-sport.js">E-SPORT</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#profile">
                                <img
                                    src="../img/login_img.png"
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                    alt="Login"
                                />
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div className="content-container">
                <Container className="content">
                    <img src="../img/Beacon_Title.png" alt="BEACON" />
                    <Form className="search-bar">
                        <FormControl
                            type="search"
                            placeholder="Search for yourself"
                            className="me-2"
                            aria-label="Search"
                        />
                        <select className="form-control">
                            <option>EUW</option>
                            <option>NA</option>
                            <option>KR</option>
                            <option>EUN</option>
                            <option>JP</option>
                            <option>LA</option>
                            <option>OC</option>
                            <option>TR</option>
                            <option>RU</option>
                            <option>PH</option>
                            <option>SG</option>
                            <option>TH</option>
                            <option>TW</option>
                            <option>VN</option>
                        </select>
                        <Button variant="outline-success">
                            <img src="../img/loop.png" alt="loop_button_img" />
                        </Button>
                    </Form>
                </Container>
            </div>

            <div className="language-switch">
                <img src="../img/french_flag.png" alt="French" />
            </div>
        </>
    );
}

export default Home;
