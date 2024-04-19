import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import loginBackground from './loginbackground.jpg'; // Import the login background image

const LoginAccount = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log(formData);
  };

  return (
    <div
      id="login"
      style={{
        minHeight: '100vh',
        height: '100vh', // Set the height to cover the entire viewport
        overflow: 'hidden', // Prevent scrolling
        backgroundImage: `url(${loginBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        paddingTop: '50px'
      }}
    >
      <div className="container d-flex justify-content-center align-items-center">
        <Card style={{ width: '400px' }}>
          <Card.Body>
            <h2 className="text-center">Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
              </Form.Group>
              <Button type="submit" variant="primary" block>Login</Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default LoginAccount;
