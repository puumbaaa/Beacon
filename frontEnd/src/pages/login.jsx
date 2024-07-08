import {Container, Row, Col, Card, CardBody, Button, Form, Image, CardFooter} from 'react-bootstrap';
import "../pages_style/login.css"
import React, { createRef } from "react";
import {TryToLogin, User} from "../handlers/user_handler.jsx";

export default function Login() {

    const email = createRef()
    const password = createRef()

    function handleClick() {

        TryToLogin(new User(email.current.value), password.current.value);

    }

    return (
        <Container fluid className="login-container" style={{margin: "100px"}}>

            <div id="wallpaper"></div>

            <Row className='g-0 align-items-center'>
                <Col xs={6} md={4}>

                    <Card className='my-5 cascading-right'
                          style={{background: 'hsla(0, 0%, 100%, 0.55)', backdropFilter: 'blur(30px)'}}>
                        <CardBody className='p-5 shadow-5 text-center'>

                            <h2 className="fw-bold mb-5 beacon-font"> Connectez-vous !</h2>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label className="beacon-font">Adresse email</Form.Label>
                                <Form.Control ref={email} type="email" placeholder="beacon@example.com" required/>
                            </Form.Group>

                            <Form.Label htmlFor="inputPassword5" className="beacon-font">Mot de passe</Form.Label>
                            <Form.Control
                                type="password"
                                id="inputPassword5"
                                aria-describedby="passwordHelpBlock"
                                placeholder="Votre mot de passe"
                                ref={password}
                                required
                            />

                            <div className='d-flex justify-content-center mb-4'>
                                <Form.Check type="checkbox" name='flexCheck' value='' id='flexCheckDefault'
                                            label='Recevoir les nouvelles du site'/>
                            </div>

                            <Button type={"submit"} className='w-100 mb-4' size='md' onClick={handleClick}> Se connecter </Button>

                            <div className="text-center">

                                <p className="beacon-font"> Ou connectez-vous avec : </p>

                                <Button tag='a' color='none' className='mx-3'>
                                    <Image draggable={false} src="/img/twitter.png" className="icon" icon='twitter'
                                           size="sm"/>
                                </Button>

                                <Button tag='a' color='none' className='mx-3'>
                                    <a href="#conn"> <Image draggable={false} src="/img/search.png" className="icon"
                                                            icon='google' size="sm"/> </a>
                                </Button>

                                <Button tag='a' color='none' className='mx-3'>
                                    <Image draggable={false} src="/img/github.png" icon='github' className="icon"
                                           size="sm"/>
                                </Button>

                            </div>

                        </CardBody>

                        <CardFooter className="text-center beacon-font">
                            <a href="/register" style={{textDecoration:"none", color:"#2e1650"}}> <p> Vous n'avez pas de compte ? Cliquez ici ! </p> </a>
                        </CardFooter>

                    </Card>
                </Col>

            </Row>

        </Container>
    );
}