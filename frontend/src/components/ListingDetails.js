import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import axios from "axios";
import AddReview from "./AddReview";
import backgroundImage from "../assets/blacksburglivingbackground.jpg"; // Assuming the same placeholder image as before
import { useParams } from "react-router-dom";


const ListingDetails = () => {
    const { id, type } = useParams();
    const [listingData, setListingData] = useState(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const endpoint = type === "Apartment" ? "Apartment_Listing" : "Dorm_Listing";
                const url = `http://localhost:3001/api/${endpoint}/${id}`;
                const response = await axios.get(url);
                setListingData(response.data);
            } catch (error) {
                console.error("Failed to fetch listing data:", error);
            }
        };

        fetchData();
    }, [id, type]);

    if (!listingData) {
        return <div>Loading...</div>;
    }

    // Function to add a review to the list
    const addReview = (review) => {
        setReviews([...reviews, review]);
    };

    return (
        <div id='listing-details'>
            <Image src={backgroundImage} fluid style={{ width: "100%", height: "300px", objectFit: "cover" }} />
            <Container className="mt-3">
                <Row>
                    <Col>
                        <h1>Listing Details</h1>
                        <p>Street Address: {listingData.street_address}</p>
                        <p>{type === "Apartment" ? `Apt Number: ${listingData.apt_number}` : `Room Number: ${listingData.room_number}`}</p>
                        <p>City: {listingData.city}</p>
                        <p>State: {listingData.state}</p>
                        <p>Zip Code: {listingData.zip_code}</p>
                        {type === "Apartment" ? (
                            <>
                                <p>Leaser Name: {listingData.leaser_name}</p>
                                <p>Leaser Number: {listingData.leaser_no}</p>
                            </>
                        ) : (
                            <p>Dorm Name: {listingData.dorm_name}</p>
                        )}
                    </Col>
                </Row>
            </Container>
            <Container className="mt-4">
                <Row>
                    <Col>
                        <h2>Reviews</h2>
                        {reviews.length === 0 ? (
                            <p>No reviews yet. Be the first to review!</p>
                        ) : (
                            reviews.map((review, index) => (
                                <div key={index}>
                                    <p>Rating: {review.rating}</p>
                                    <p>Description: {review.description}</p>
                                </div>
                            ))
                        )}
                    </Col>
                </Row>
            </Container>
            <AddReview type={type} onAddReview={addReview} />
        </div>
    );
};

export default ListingDetails;
