import {Container, Row, Col, Card, CardBody, Button, Form, Image} from 'react-bootstrap';
import "../pages_style/login.css"
import React from "react";

export default function Login() {
    return (
        <Container fluid style={{margin: "100px"}}>

            <div id="wallpaper"></div>

            <Row className='g-0 align-items-center'>
                <Col xs={6} md={4}>

                    <img src="/img/Beacon_Title.png"/>

                    <Card className='my-5 cascading-right'
                          style={{background: 'hsla(0, 0%, 100%, 0.55)', backdropFilter: 'blur(30px)'}}>
                        <CardBody className='p-5 shadow-5 text-center'>

                            <h2 className="fw-bold mb-5">Sign up now</h2>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Adresse email</Form.Label>
                                <Form.Control type="email" placeholder="beacon@example.com"/>
                            </Form.Group>

                            <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                            <Form.Control
                                type="password"
                                id="inputPassword5"
                                aria-describedby="passwordHelpBlock"
                                placeholder="Your password"
                            />

                            <div className='d-flex justify-content-center mb-4'>
                                <input type="checkbox" name='flexCheck' value='' id='flexCheckDefault'
                                       label='Subscribe to our newsletter'/>
                            </div>

                            <Button className='w-100 mb-4' size='md'>sign up</Button>

                            <div className="text-center">

                                <p> Ou connectez-vous avec : </p>

                                <Button tag='a' color='none' className='mx-3' style={{color: '#1266f1'}}>
                                    <div icon='twitter' size="sm"/>
                                </Button>

                                <Button tag='a' color='none' className='mx-3' style={{color: '#1266f1'}}>
                                    <div icon='google' size="sm"/>
                                </Button>

                                <Button tag='a' color='none' className='mx-3' style={{color: '#1266f1'}}>
                                    <div icon='github' size="sm"/>
                                </Button>

                            </div>

                        </CardBody>
                    </Card>
                </Col>

                <Col col='6'>
                    <Image src="/img/background.jpg" width={400} height={700} className="rounded-4 shadow-4"
                           alt=""/>
                </Col>

            </Row>

        </Container>
    );
}