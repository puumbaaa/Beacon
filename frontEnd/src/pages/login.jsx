import {Container, Row, Col, Card, CardBody, Button, Form, Image} from 'react-bootstrap';
import "../pages_style/login.css"
import React, { createRef } from "react";
import {RegisterUser, User} from "../handlers/sql_handler.jsx";

export default function Login() {

    const email = createRef()
    const password = createRef()

    function handleClick() {

        RegisterUser(new User(email.current.value, password.current.value)).then(result => {
            console.log("Vous avez été enregistrez " + result)
        })

    }

    return (
        <Container fluid className="login-container" style={{margin: "100px"}}>

            <div id="wallpaper"></div>

            <Row className='g-0 align-items-center'>
                <Col xs={6} md={4}>

                    <img src="/img/Beacon_Title.png"/>

                    <Card className='my-5 cascading-right'
                          style={{background: 'hsla(0, 0%, 100%, 0.55)', backdropFilter: 'blur(30px)'}}>
                        <CardBody className='p-5 shadow-5 text-center'>

                            <h2 className="fw-bold mb-5 beacon-font">Enregistrez vous !</h2>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label className="beacon-font">Adresse email</Form.Label>
                                <Form.Control ref={email} type="email" placeholder="beacon@example.com"/>
                            </Form.Group>

                            <Form.Label htmlFor="inputPassword5" className="beacon-font">Mot de passe</Form.Label>
                            <Form.Control
                                type="password"
                                id="inputPassword5"
                                aria-describedby="passwordHelpBlock"
                                placeholder="Votre mot de passe"
                                ref={password}
                            />

                            <div className='d-flex justify-content-center mb-4'>
                                <Form.Check type="checkbox" name='flexCheck' value='' id='flexCheckDefault'
                                       label='Recevoir les nouvelles du site'/>
                            </div>

                            <Button className='w-100 mb-4' size='md' onClick={handleClick}>S'enregistrez !</Button>

                            <div className="text-center">

                                <p className="beacon-font"> Ou enregistrez vous avec : </p>

                                <Button tag='a' color='none' className='mx-3'>
                                    <Image src="/img/twitter.png" className="icon" icon='twitter' size="sm"/>
                                </Button>

                                <Button tag='a' color='none' className='mx-3'>
                                    <a href="#conn"> <Image src="/img/search.png" className="icon" icon='google' size="sm"/> </a>
                                </Button>

                                <Button tag='a' color='none' className='mx-3'>
                                    <Image src="/img/github.png"  icon='github' className="icon" size="sm"/>
                                </Button>

                            </div>

                        </CardBody>
                    </Card>
                </Col>

            </Row>

        </Container>
    );
}