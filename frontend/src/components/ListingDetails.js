import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AddReview from './AddReview';

const ListingDetails = ({ id, type }) => {
    const [listingData, setListingData] = useState(null);
    const [reviews, setReviews] = useState([]); // State to store reviews

    type = 'Apartment';

    useEffect(() => {
        const fetchData = () => {
            console.log("entered");
            if (type === 'Apartment') {
                console.log("entered");
                setListingData({
                    apartment_id: 1,
                    street_address: '123 Main St',
                    apt_number: 'Apt 101',
                    city: 'Blacksburg',
                    state: 'VA',
                    zip_code: '24060',
                    leaser_name: 'John Doe',
                    leaser_no: '123-456-7890',
                });
            } else if (type === 'Dorm') {
                setListingData({
                    dorm_id: 1,
                    street_address: '456 Elm St',
                    room_number: 'Room 201',
                    city: 'Blacksburg',
                    state: 'VA',
                    zip_code: '24061',
                    dorm_name: 'Tech Hall',
                });
            }
        };
        fetchData();
    }, [id, type]);

    if (!listingData) {
        return <div>Loading...</div>;
    }

    // Function to add a review to the list
    const addReview = (review) => {
        setReviews([...reviews, review]); // Add new review to the existing list
    };

    return (
        <div id="listing-details">
            <Container>
                <Row>
                    <Col>
                        <h1>Listing Details</h1>
                        {type === 'Apartment' && (
                            <>
                                <p>Street Address: {listingData.street_address}</p>
                                <p>Apt Number: {listingData.apt_number}</p>
                                <p>City: {listingData.city}</p>
                                <p>State: {listingData.state}</p>
                                <p>Zip Code: {listingData.zip_code}</p>
                                <p>Leaser Name: {listingData.leaser_name}</p>
                                <p>Leaser Number: {listingData.leaser_no}</p>
                            </>
                        )}
                        {type === 'Dorm' && (
                            <>
                                <p>Street Address: {listingData.street_address}</p>
                                <p>Room Number: {listingData.room_number}</p>
                                <p>City: {listingData.city}</p>
                                <p>State: {listingData.state}</p>
                                <p>Zip Code: {listingData.zip_code}</p>
                                <p>Dorm Name: {listingData.dorm_name}</p>
                            </>
                        )}
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col>
                        <h2>Reviews</h2>
                        {reviews.length === 0 ? (
                            <p>Nothing to show here.</p>
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
