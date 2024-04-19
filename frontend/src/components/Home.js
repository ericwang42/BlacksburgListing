import React, { useState } from 'react';
import { Container, Row, Col, Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import backgroundImage from './blacksburglivingbackground.jpg';

const Home = () => {
    const [filterType, setFilterType] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);

    const homeListings = [
        { id: 1, price: 1000, description: 'Spacious 2-bedroom apartment in downtown Blacksburg', type: 'Apartment' },
        { id: 2, price: 1200, description: 'Cozy 1-bedroom apartment near Virginia Tech campus', type: 'Apartment' },
        { id: 3, price: 1500, description: 'Modern 3-bedroom apartment with large backyard', type: 'Apartment' },
        { id: 4, price: 800, description: 'Furnished single room in dormitory building', type: 'Dorm' },
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
                    <div class="btn-group" role="group" aria-label="Basic radio toggle button group" style={{ paddingTop: '20px' }}>
                        <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" onClick={() => handleFilter(null)} />
                        <label class="btn btn-outline-light" for="btnradio1">All</label>

                        <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" onClick={() => handleFilter('Apartment')} />
                        <label class="btn btn-outline-light" for="btnradio2">Apartments</label>

                        <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off" onClick={() => handleFilter('Dorm')} />
                        <label class="btn btn-outline-light" for="btnradio3">Dorms</label>

                    </div>

                </div>
            </div>

            <Container className="mt-5">
                <Row style={{paddingBottom: '50px'}}>
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
                <Row>
                    {filteredListings.map(home => (
                        <Col key={home.id} md={4} className="mb-4">
                            <div className="card" style={{ height: '350px' }}>
                                <img src={backgroundImage} className="card-img-top" alt="Placeholder" style={{ height: '200px' }} />
                                <div className="card-body">
                                    <h5 className="card-title">{home.price}</h5>
                                    <p className="card-text">{home.description}</p>
                                    <p className="card-text"><b>{home.type}</b></p>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default Home;
