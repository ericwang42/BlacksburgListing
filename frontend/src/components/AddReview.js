import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const AddReview = ({ type, onAddReview }) => {
    const [rating, setRating] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted Review:', { rating, description });
        onAddReview({ rating, description }); 
        setRating('');
        setDescription('');
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h2>Add a Review</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="rating">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Review Description</Form.Label>
                            <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>
                        <Button variant="dark" type="submit">Submit Review</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AddReview;
