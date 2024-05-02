import React, { useState, useEffect } from "react"
import { Container, Row, Col, Image, Card } from "react-bootstrap"
import axios from "axios"
import AddReview from "./AddReview"
import backgroundImage from "../assets/blacksburglivingbackground.jpg"
import noImage from "../assets/no-image.jpeg"
import { useParams } from "react-router-dom"
import { jwtDecode } from "jwt-decode"

const ListingDetails = () => {
    const { id, type } = useParams()
    const [listingData, setListingData] = useState(null)
    const [reviews, setReviews] = useState([])
    const isAuthenticated = !!localStorage.getItem("jwtToken")
    const token = localStorage.getItem("jwtToken")
    const [userId, setUserId] = useState("")
    const [userType, setUserType] = useState("")

    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token)
            setUserId(decoded.user_id)
            setUserType(decoded.user_type)
        }
    }, [token])

    const fetchData = async () => {
        const parsedId = id.split("-")[1]
        const endpoint =
            type === "Apartment" ? "Apartment_Listing" : "Dorm_Listing"
        try {
            const listingResponse = await axios.get(
                `http://localhost:3001/api/${endpoint}/${parsedId}`
            )
            setListingData(listingResponse.data)

            const reviewsResponse = await axios.get(
                `http://localhost:3001/api/${endpoint}/${parsedId}/reviews`
            )
            if (reviewsResponse.data && reviewsResponse.data.length > 0) {
                const fetchedReviews = await Promise.all(
                    reviewsResponse.data.map(async (review) => {
                        if (review.review_id && review.reviewer_id) {
                            const [reviewDetails, residentDetails] =
                                await Promise.all([
                                    axios.get(
                                        `http://localhost:3001/api/Review/${review.review_id}`
                                    ),
                                    axios.get(
                                        `http://localhost:3001/api/Blacksburg_Resident/${review.reviewer_id}`
                                    ),
                                ])
                            return {
                                review: reviewDetails.data,
                                resident: residentDetails.data,
                            }
                        }
                        return null
                    })
                )
                setReviews(fetchedReviews.filter((review) => review !== null))
            } else {
                setReviews([])
            }
        } catch (error) {
            console.error("Failed to fetch data:", error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [id, type])

    if (!listingData) {
        return <div>Loading...</div>
    }

    const parsedId = id.split("-")[1]

    return (
        <div id='listing-details'>
            <Image
                src={listingData.image || noImage}
                fluid
                style={{ width: "100%", height: "300px", objectFit: "cover" }}
            />
            <Container className='mt-3'>
                <Row>
                    <Col>
                        <h1 style={{ marginBottom: "25px", marginTop: "25px" }}>
                            {`$${listingData.price}${
                                type === "Apartment"
                                    ? " / month"
                                    : " / semester"
                            }`}
                        </h1>
                        {type === "Dorm" && (
                            <p style={{ marginBottom: "20px" }}>
                                <b>{listingData.dorm_name}</b>
                            </p>
                        )}
                        <p style={{ marginBottom: "2px" }}>
                            {listingData.street_address}
                        </p>
                        {type === "Apartment" && (
                            <p style={{ marginBottom: "2px" }}>
                                Apt Number: {listingData.apt_number}
                            </p>
                        )}
                        <p style={{ marginBottom: "2px" }}>
                            {listingData.city}, {listingData.state}{" "}
                            {listingData.zip_code}
                        </p>
                        {type === "Apartment" && (
                            <p
                                style={{
                                    marginBottom: "20px",
                                    marginTop: "20px",
                                }}
                            >
                                Listed by: {listingData.leaser_name}
                            </p>
                        )}
                        {type === "Dorm" && (
                            <p style={{ marginTop: "20px" }}></p>
                        )}
                    </Col>
                </Row>
                <Row style={{ marginBottom: "5px" }}>
                    <Col>
                        <h2 style={{ marginBottom: "5px" }}> Description:</h2>
                        <p>{listingData.description}</p>
                    </Col>
                </Row>
                <Row>
                    {userType === "Blacksburg_Resident" && (
                        <AddReview
                            id={parsedId}
                            type={type}
                            userId={userId}
                            onAddReview={fetchData}
                        />
                    )}
                </Row>
                <Row style={{ marginTop: "20px" }}>
                    <Col>
                        <h2>Reviews</h2>
                        {reviews.length === 0 ? (
                            <p>No reviews yet. Be the first to review!</p>
                        ) : (
                            reviews.map((item, index) => (
                                <Card key={index} className='mb-3'>
                                    <Card.Header as='h5'>
                                        Reviewed by:{" "}
                                        {item.resident[0].first_name}{" "}
                                        {item.resident[0].last_name}
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Title>
                                            Rating: {item.review[0].rating}
                                        </Card.Title>
                                        <Card.Text>
                                            {item.review[0].review_description}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            ))
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ListingDetails
