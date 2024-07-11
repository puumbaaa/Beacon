import {Container, Row, Col, Card, CardBody, Button, Form, Image, CardFooter} from 'react-bootstrap';
import "../pages_style/login.css"
import React, { createRef } from "react";
import {TryToLogin, TryToRegister, User} from "../handlers/user_handler.jsx";
import * as formik from "formik";
import * as yup from "yup";
import {useNavigate} from "react-router-dom";

export default function Login() {

    const { Formik } = formik;
    const nav = useNavigate()

    const schema = yup.object().shape({
        mail: yup.string().required(),
        password: yup.string().required(),
    });

    return (
        <Container fluid className="login-container" style={{marginTop: "100px"}}>
            <div id="wallpaper"></div>
            <Row className='g-0 align-items-center'>
                <Col xs={10} md={6} sm={8} style={{margin: "0 auto"}}>
                    <Formik
                        validationSchema={schema}
                        onSubmit={values => {
                            console.log(values)
                            TryToLogin(new User(values.mail, values.username + "#" + values.tag), values.password).then(result => {

                                if (result) {
                                    nav("/")
                                } else {

                                }

                            })
                        }}
                        initialValues={{
                            mail: '',
                            password: '',
                        }}
                    >
                        {({handleSubmit, handleChange, values, touched, errors}) => (
                            <Card className='my-5'
                                  style={{background: 'hsla(0, 0%, 100%, 0.55)', backdropFilter: 'blur(30px)'}}>
                                <CardBody className='p-5 shadow-5 text-center'>
                                    <h2 className="fw-bold mb-5 beacon-font">Connectez-vous !</h2>
                                    <Form noValidate onSubmit={handleSubmit}>
                                        <Row className="mb-4">
                                            <Form.Group
                                                as={Col}
                                                controlId="mailValidate"
                                                className="position-relative"
                                            >
                                                <Form.Label className="fw-bold mb-1 beacon-font">Votre
                                                    e-mail</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    placeholder="superjoueur@monmail.com"
                                                    name="mail"
                                                    value={values.mail}
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.mail}
                                                />

                                                <Form.Control.Feedback type="invalid" tooltip>
                                                    Vous devez mettre votre mail
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-4">
                                            <Form.Group
                                                as={Col}
                                                controlId="passwordValidate"
                                                className="position-relative"
                                            >
                                                <Form.Label className="fw-bold mb-1 beacon-font">Votre mot de
                                                    passe</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="••••••••••••"
                                                    name="password"
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.password}
                                                />

                                                <Form.Control.Feedback type="invalid" tooltip>
                                                    Vous devez mettre votre mot de passe
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Row>
                                        <Button type={"submit"} className='w-50 mb-4' size='md'> Se connecter </Button>
                                    </Form>

                                    <div className="text-center">

                                        <p className="beacon-font"> Ou connectez-vous avec : </p>

                                        <Button tag='a' color='none' className='mx-3'>
                                            <Image draggable={false} src="/img/twitter.png" className="icon"
                                                   icon='twitter'
                                                   size="sm"/>
                                        </Button>

                                        <Button tag='a' color='none' className='mx-3'>
                                            <a href="#conn"> <Image draggable={false} src="/img/search.png"
                                                                    className="icon"
                                                                    icon='google' size="sm"/> </a>
                                        </Button>

                                        <Button tag='a' color='none' className='mx-3'>
                                            <Image draggable={false} src="/img/github.png" icon='github'
                                                   className="icon"
                                                   size="sm"/>
                                        </Button>

                                    </div>
                                </CardBody>
                                <CardFooter className="text-center beacon-font">
                                    <br/>
                                    <a href="/register" style={{textDecoration: "none", color: "#2e1650"}}><p> Vous n'avez pas de
                                        compte ? Cliquez ici ! </p></a>
                                </CardFooter>
                            </Card>
                        )}
                    </Formik>
                </Col>
            </Row>
        </Container>
    );
}