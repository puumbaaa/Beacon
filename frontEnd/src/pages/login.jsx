import { Container, Row, Col, Card, CardBody, Button, Form } from'react-bootstrap';

export default function Login() {
    return (
        <Container fluid className='my-5'>

            <Row className='g-0 align-items-center'>
                <Col col='6'>

                    <Card className='my-5 cascading-right' style={{background: 'hsla(0, 0%, 100%, 0.55)',  backdropFilter: 'blur(30px)'}}>
                        <CardBody className='p-5 shadow-5 text-center'>

                            <h2 className="fw-bold mb-5">Enregistrez-vous !</h2>

                            <Row>
                                <Col col='6'>

                                    <input id='form1' type='text'/>
                                </Col>

                                <Col col='6'>
                                    <input id='form2' type='text'/>
                                </Col>
                            </Row>

                            <input id='form3' type='email'>
                            <Form.Label htmlFor="inputPassword5"> Mot de passe <Form.Label/>

                            <div className='d-flex justify-content-center mb-4'>
                                <input type="checkbox" name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
                            </div>

                            <Button className='w-100 mb-4' size='md'>sign up</Button>

                            <div className="text-center">

                                <p>or sign up with:</p>

                                <Button tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                                    FB
                                </Button>

                                <Button tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                                    TW
                                </Button>

                                <Button tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                                    GO
                                </Button>

                                <Button tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                                    GIT
                                </Button>

                            </div>

                        </CardBody>
                    </Card>
                </Col>

                <Col col='6'>
                    <img src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg" className="w-100 rounded-4 shadow-4"
                         alt=""/>
                </Col>

            </Row>

        </Container>
    );
}