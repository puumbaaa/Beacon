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

    return (
        <Container fluid className="login-container" style={{margin: "100px"}}>

            <div id="wallpaper"></div>

            <Row className='g-0 align-items-center'>
                <Col xs={6} md={4}>

                    <Card className='my-5 cascading-right'
                          style={{background: 'hsla(0, 0%, 100%, 0.55)', backdropFilter: 'blur(30px)'}}>
                        <CardBody className='p-5 shadow-5 text-center'>

                            <h2 className="fw-bold mb-5 beacon-font"> Votre profile !</h2>



                        </CardBody>

                        <CardFooter className="text-center beacon-font">
                            <a href="#disconnect" style={{textDecoration:"none", color:"#2e1650"}}> <p onClick={Disconnect}> Deconnexion </p> </a>
                        </CardFooter>

                    </Card>
                </Col>

            </Row>

        </Container>
    );
}