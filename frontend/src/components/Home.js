import React, { useState } from 'react';
import { Container, Row, Col, Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import backgroundImage from './blacksburglivingbackground.jpg';
import { NavLink } from 'react-router-dom';

const Home = () => {
    const [filterType, setFilterType] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);

    const homeListings = [
        { id: 1, price: 1000, address: '123 Main St', type: 'Apartment' },
        { id: 2, price: 1200, address: '456 Elm St', type: 'Apartment' },
        { id: 3, price: 1500, address: '789 Oak St', type: 'Apartment' },
        { id: 4, price: 800, address: '101 Maple St', type: 'Dorm' },
    ];

    const handleFilter = (type) => {
        setFilterType(type);
    };

    const handleSort = (order) => {
        setSortOrder(order);
    };

    let filteredListings = homeListings;
    if (filterType) {
        filteredListings = homeListings.filter(home => home.type === filterType);
    }
    if (sortOrder === 'lowToHigh') {
        filteredListings.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'highToLow') {
        filteredListings.sort((a, b) => b.price - a.price);
    }

    // Label text based on the selected filter type
    let labelText = 'Listings';
    if (filterType === 'Apartment') {
        labelText = 'Apartment Listings';
    } else if (filterType === 'Dorm') {
        labelText = 'Dorm Listings';
    }

    // Max character limit for address
    const maxAddressLength = 20;

    return (
        <div id="home">
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100vw',
                height: '70vh',
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
            }}>
                <h1 className='' style={{ color: 'white', fontSize: '50px' }}>Your key to Blacksburg's best living spaces.</h1>
                <div className="mb-3" style={{ textAlign: 'center' }} >
                    <div className="btn-group" role="group" aria-label="Basic radio toggle button group" style={{ paddingTop: '20px' }}>
                        <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" onClick={() => handleFilter(null)} />
                        <label className="btn btn-outline-light" htmlFor="btnradio1">All</label>

                        <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" onClick={() => handleFilter('Apartment')} />
                        <label className="btn btn-outline-light" htmlFor="btnradio2">Apartments</label>

                        <input type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off" onClick={() => handleFilter('Dorm')} />
                        <label className="btn btn-outline-light" htmlFor="btnradio3">Dorms</label>

                    </div>

                </div>
            </div>

            <Container className="mt-5">
                <Row style={{ paddingBottom: '30px' }}>
                    <Dropdown>
                        <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                            Sorted by
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleSort('lowToHigh')}>Price: Low to High</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSort('highToLow')}>Price: High to Low</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Row>
                <Row style={{ paddingBottom: '20px' }}>
                    <Col>
                        <h3>{labelText}</h3>
                    </Col>
                </Row>
                <Row>
                    {filteredListings.map(home => (
                        <Col key={home.id} md={4} className="mb-4">
                            <NavLink to={`/listing/${home.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className="card">
                                    <img src={backgroundImage} className="card-img-top" alt="Placeholder" style={{ height: '200px' }} />
                                    <div className="card-body">
                                        <h5 className="card-title">${home.price}/month</h5>
                                        <p className="card-text">{home.address.length > maxAddressLength ? home.address.slice(0, maxAddressLength) + '...' : home.address}</p>
                                        <p className="card-text"><b>{home.type}</b></p>
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
