import React from 'react';
import { Container, Button } from 'react-bootstrap';
import '../pages_style/notfound_style.css';

export function NotFound() {
    return (
        <div className="notfound-container">
            <Container className="text-center">
                <h1 className="notfound-title">404</h1>
                <p className="notfound-message">Oops! The page you are looking for does not exist.</p>
                <Button href="/" className="notfound-button">Go Back Home</Button>
            </Container>
        </div>
    );
}
