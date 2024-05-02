import React, { useState } from "react"
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import Rating from "@mui/material/Rating"
import axios from "axios"

const AddReview = ({ id, type, userId, onAddReview }) => {
    const [rating, setRating] = useState(0)
    const [description, setDescription] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const reviewData = {
            rating: rating,
            review_description: description,
            reviewer_id: userId,
            apartment_review_id: type === "Apartment" ? id : null,
            dorm_review_id: type === "Dorm" ? id : null,
        }

        try {
            const response = await axios.post(
                "http://localhost:3001/api/Review",
                reviewData
            )
            console.log("Review submitted successfully")
            onAddReview(response.data)
            setRating(0)
            setDescription("")
        } catch (error) {
            console.error("Failed to submit review:", error)
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h2>Add a Review</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId='rating'>
                            <Rating
                                name='simple-controlled'
                                value={rating}
                                onChange={(e, newValue) => setRating(newValue)}
                            />
                        </Form.Group>
                        <Form.Group controlId='description'>
                            <Form.Label>Review Description</Form.Label>
                            <Form.Control
                                as='textarea'
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Button
                            variant='dark'
                            type='submit'
                            style={{ marginTop: "20px" }}
                        >
                            Submit Review
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default AddReview
