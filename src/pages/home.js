import React, {createRef, useState} from 'react';
import { Container, Navbar, Nav, Form, FormControl, Button, Dropdown } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import '../pages_style/home_style.css';
import { Helmet } from 'react-helmet';
import {SearchBar} from "../components/searchbar";

function Home() {
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
                            <Nav.Link href="./guides.js">GUIDES</Nav.Link>
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

            <div className="content-container">
                <Container className="content">
                    <img className="title-image" src="/img/Beacon_Title.png" alt="BEACON" draggable="false" />
                    <SearchBar />
                </Container>
            </div>

            <div className="language-switch">
                <img src="/img/french_flag.png" alt="French" draggable="false" />
            </div>
        </>
    );
}

export default Home;
