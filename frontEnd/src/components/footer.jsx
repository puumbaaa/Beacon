import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../pages_style/home_style.css';

export function Footer() {
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col>
                        <p>&copy; 2024 Beacon. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}
