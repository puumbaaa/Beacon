import {Container, Row, Col, Card, CardBody, Button, Form, Image, CardFooter} from 'react-bootstrap';
import "../pages_style/login.css"
import React, { createRef } from "react";
import {useNavigate} from "react-router-dom";
import {Disconnect, User} from "../handlers/user_handler.jsx";

export default function Profile() {

    let navigate = useNavigate();

    if (!localStorage.getItem("email")) {

        navigate('/login');

    }

    function handleDisconnect() {

        Disconnect().then(() => navigate("/"))

    }

    return (
        <Container fluid className="login-container" style={{marginTop: "50px"}}>

            <div id="wallpaper"></div>

            <Row className='g-0 align-items-center'>
                <Col xs={10} md={6} style={{margin: "0 auto"}}>

                    <Card className='my-5'
                          style={{background: 'hsla(0, 0%, 100%, 0.55)', backdropFilter: 'blur(30px)'}}>
                        <CardBody className='p-5 shadow-5 text-center'>

                            <h2 className="fw-bold mb-5 beacon-font"> Votre profil !</h2>
                            <h3 className="fw-bold mb-2 beacon-font"> { localStorage.getItem("riotName") }#{ localStorage.getItem("riotTag") } </h3>
                            <h3 className="fw-bold mb-2 beacon-font"> { localStorage.getItem("email") } </h3>

                        </CardBody>

                        <CardFooter className="text-center beacon-font">
                            <a href="?disconnected=true" style={{textDecoration:"none", color:"#2e1650"}}> <p onClick={handleDisconnect}> Deconnexion </p> </a>
                        </CardFooter>

                    </Card>
                </Col>

            </Row>

        </Container>
    );
}