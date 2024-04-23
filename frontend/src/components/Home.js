import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import backgroundImage from '../assets/blacksburglivingbackground.jpg';

const Home = () => {
    const [filterType, setFilterType] = useState("All");
    const [listings, setListings] = useState([]);
    const [sortOrder, setSortOrder] = useState("");

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const apartments = await axios.get("http://localhost:3001/api/Apartment_Listing");
                const dorms = await axios.get("http://localhost:3001/api/Dorm_Listing");
                let newFetchedListings = [
                    ...apartments.data.map(a => ({ ...a, type: 'Apartment', unique_id: `A-${a.apartment_id}` })),
                    ...dorms.data.map(d => ({ ...d, type: 'Dorm', unique_id: `D-${d.dorm_id}` }))
                ];

                if (filterType !== "All") {
                    newFetchedListings = newFetchedListings.filter(listing => listing.type === filterType);
                }
                
                setListings(newFetchedListings);
            } catch (error) {
                console.error("Failed to fetch listings:", error);
            }
        };

        fetchListings();
    }, [filterType]);

    useEffect(() => {
        if (sortOrder) {
            let sortedListings = [...listings];
            if (sortOrder === "lowToHigh") {
                sortedListings.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            } else if (sortOrder === "highToLow") {
                sortedListings.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            }
            setListings(sortedListings);
        }
    }, [sortOrder]);

    const handleFilter = (type) => {
        setFilterType(type);
    };

    const handleSort = (order) => {
        setSortOrder(order);
    };

    const formatAddress = (listing) => {
        return (
            <>
                <p className="card-text" style={{ marginBottom: '2px', marginTop: '20px' }}>{listing.street_address}</p>
                <p className="card-text" style={{ marginBottom: '2px' }}>{listing.type === 'Apartment' ? `Apt ${listing.apt_number}` : `Room ${listing.room_number}`}</p>
                <p className="card-text" style={{ marginBottom: '20px' }}>{`${listing.city}, ${listing.state} ${listing.zip_code}`}</p>
            </>
        );
    };

    const formatPrice = (listing) => {
        return `$${listing.price}${listing.type === 'Apartment' ? '/month' : '/semester'}`;
    };

    return (
        <div>
            <div id="home" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100vw',
                minHeight: '70vh',
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                marginBottom: '20px',
            }}>
                <h1 style={{ color: 'white', fontSize: '50px', textAlign: 'center' }}>
                    Your key to Blacksburg's best living spaces.
                </h1>
                <ButtonGroup style={{ paddingTop: '20px' }}>
                    <Button variant="outline-light" onClick={() => handleFilter("All")}>All</Button>
                    <Button variant="outline-light" onClick={() => handleFilter("Apartment")}>Apartments</Button>
                    <Button variant="outline-light" onClick={() => handleFilter("Dorm")}>Dorms</Button>
                </ButtonGroup>
            </div>
            <Container className="mt-5">
                <Row>
                    <Dropdown className="mb-3">
                        <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                            Sorted by
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleSort("lowToHigh")}>
                                Price: Low to High
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSort("highToLow")}>
                                Price: High to Low
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Row>
                <Row>
                    <Col>
                        <h3>{filterType === "Apartment" ? "Apartment Listings" : filterType === "Dorm" ? "Dorm Listings" : "All Listings"}</h3>
                    </Col>
                </Row>
                <Row>
                    {listings.map((listing) => (
                        <Col key={listing.apartment_id || listing.dorm_id} md={4} className="mb-4">
                            <NavLink to={`/listing/${listing.apartment_id || listing.dorm_id}`} style={{ textDecoration: "none", color: "inherit" }}>
                                <div className="card">
                                    <img src={backgroundImage} className="card-img-top" alt="Listing" style={{ height: "200px" }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{formatPrice(listing)}</h5>
                                        {formatAddress(listing)}
                                        <p className="card-text"><strong>{listing.type === 'Apartment' ? "Listed by " + listing.leaser_name : listing.dorm_name}</strong></p>
                                    </div>
                                </div>
                            </NavLink>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default Home;
