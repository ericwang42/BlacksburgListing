import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import registerBackground from './registerbackground.jpg'; // Import the register background image

const CreateAccount = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        confirmPassword: '',
        userType: '' // added userType state for radio button selection
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleUserTypeChange = (userType) => {
        setFormData({
            ...formData,
            userType
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log(formData);
    };

    return (
        <div
            id="create-account"
            style={{
                minHeight: '100vh',
                backgroundImage: `url(${registerBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                paddingTop: '50px'

            }}
        >
            <div className="container">
                <Card className='account-card' style={{ width: '400px', margin: 'auto' }}>
                    <Card.Body>
                        <h2 className="text-center">Register</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group >
                                <p style={{ marginTop: '20px' }}>Select User Type:</p>
                                <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                    <Button className={`btn ${formData.userType === 'landlord' ? 'btn-dark' : 'btn-outline-white'}`} onClick={() => handleUserTypeChange('landlord')}>Landlord</Button>
                                    <Button className={`btn ${formData.userType === 'resident' ? 'btn-dark' : 'btn-outline-white'}`} onClick={() => handleUserTypeChange('resident')}>Resident</Button>
                                </div>
                            </Form.Group>
                            <Button type="submit" variant="success" style={{ marginTop: '20px' }}>Create Account</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default CreateAccount;
