// /mnt/data/home.js
import React, { useState } from 'react';
import { Container, Navbar, Nav, Form, FormControl, Button, Dropdown } from 'react-bootstrap';
import '../pages_style/home_style.css';
import { Helmet } from 'react-helmet';

function Home() {
    const [region, setRegion] = useState('EUW');

    return (
        <>
            <Helmet>
                <title>Beacon</title>
                <meta name="description" content="This is a website to improve your level on League of Legends" />
                <meta http-equiv="pragma" content="no-cache" />
                <meta charSet="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="shortcut icon" href="/img/logo_beacon.png" />
            </Helmet>

            <div id="wallpaper"></div>

            <Navbar className="navbar-custom" expand="lg" fixed="top">
                <Container>
                    <Navbar.Brand href="#home" className="brand-left">
                        <img
                            src="/img/logo_beacon.png"
                            width="60"
                            height="60"
                            className="d-inline-block align-top"
                            alt="Beacon logo"
                            draggable="false"
                        />
                        <span>
                            <img
                                src="/img/Beacon_Title.png"
                                width="100"
                                height="25"
                                alt="Beacon Title"
                                draggable="false"
                            />
                        </span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/guide">GUIDES</Nav.Link>
                            <Nav.Link href="/usersearch">Player Search</Nav.Link>
                            <Nav.Link href="./profil_in_game.js">PROFIL IN-GAME</Nav.Link>
                            <Nav.Link href="./pro_tips.js">PRO TIPS</Nav.Link>
                            <Nav.Link href="./e-sport.js">E-SPORT</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#profile">
                                <img
                                    src="/img/login_img.png"
                                    width="40"
                                    height="40"
                                    className="d-inline-block align-top"
                                    alt="Login"
                                    draggable="false"
                                />
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div className="download-container">
                <span className="button_lg">
                    <span className="button_sl"></span>
                    <span className="button_text">Download Now</span>
                </span>
            </div>

            <div className="content-container">
                <Container className="content">
                    <img className="title-image" src="/img/Beacon_Title.png" alt="BEACON" draggable="false" />
                    <Form className="search-bar">
                        <FormControl
                            type="search"
                            placeholder="Search for yourself"
                            className="search-input"
                            aria-label="Search"
                        />
                        <Dropdown className="region-dropdown">
                            <Dropdown.Toggle variant="success" id="dropdown-basic" className="region-badge">
                                {region}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {['EUW', 'NA', 'KR', 'EUN', 'JP', 'LA', 'OC', 'TR', 'RU', 'PH', 'SG', 'TH', 'TW', 'VN'].map(r => (
                                    <Dropdown.Item key={r} onClick={() => setRegion(r)}>
                                        {r}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button variant="outline-success" className="search-button">
                            <img src="/img/loop.png" alt="loop_button_img" draggable="false" />
                        </Button>
                    </Form>
                </Container>
            </div>

            <div className="language-switch">
                <img src="/img/french_flag.png" alt="French" draggable="false" />
            </div>
        </>
    );
}

export default Home;
