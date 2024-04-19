import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// import placeholderImage from './placeholder.jpg';
import backgroundImage from './blacksburglivingbackground.jpg';

const Home = () => {
    // (replace this with your actual data)
    const homeListings = [
        { id: 1, price: '$1000', description: 'Spacious 2-bedroom apartment in downtown Blacksburg' },
        { id: 2, price: '$1200', description: 'Cozy 1-bedroom apartment near Virginia Tech campus' },
        { id: 3, price: '$1500', description: 'Modern 3-bedroom house with large backyard' },
        { id: 1, price: '$1000', description: 'Spacious 2-bedroom apartment in downtown Blacksburg' },
        { id: 2, price: '$1200', description: 'Cozy 1-bedroom apartment near Virginia Tech campus' },
        { id: 3, price: '$1500', description: 'Modern 3-bedroom house with large backyard' },

    ];

    return (
        <div id="home" >
            <div id="home" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw', // Set width to 100% of the viewport width
                height: '70vh', // Set height to 100% of the viewport height
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed', // Prevent background from scrolling
            }}>
                <h1 style={{ color: 'white' }}>Your key to Blacksburg's best living spaces.</h1>
            </div>
 

            <div>
                <Container className="text-center" >

                </Container>
                <Container className="mt-5">
                    <Row>
                        {homeListings.map(home => (
                            <Col key={home.id} md={4} className="mb-4">
                                <div className="card" style={{ height: '300px', width: '300px' }}>
                                    <img src={backgroundImage} className="card-img-top" alt="Placeholder" style={{ height: '200px' }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{home.price}</h5>
                                        <p className="card-text">{home.description}</p>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>

        </div>
    );
};

export default Home;
