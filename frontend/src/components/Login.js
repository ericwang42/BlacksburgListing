import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import loginBackground from "../assets/loginbackground.jpg"; // Import the login background image
import axios from "axios";
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate();  

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        api
            .post("http://localhost:3001/api/Login", {
                username: formData.username,
                password: formData.password,
            })
            .then((response) => {
                console.log("Login Success:", response.data);
                localStorage.setItem('jwtToken', response.data.token); 
                alert("Successfully logged in");
                navigate('/');
                // Optionally, redirect the user to a home page or dashboard
                // history.push('/dashboard');
            })
            .catch((error) => {
                console.error(
                    "Login Error:",
                    error.response ? error.response.data : "Server Error"
                );
                alert("Incorrect username and/or password");
            });

        setFormData({
            username: "",
            password: "",
        });
    };

    return (
        <div
            id="login"
            style={{
                minHeight: "100vh",
                height: "100vh",
                overflow: "hidden",
                backgroundImage: `url(${loginBackground})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                paddingTop: "150px",
            }}
        >
            <div className="container d-flex justify-content-center align-items-center">
                <Card
                    className="account-card"
                    style={{ width: "400px", borderRadius: "5px" }}
                >
                    <Card.Body>
                        <h2 className="text-center">Login</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group style={{ marginTop: "20px" }}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Button
                                type="submit"
                                variant="primary"
                                style={{ marginTop: "20px" }}
                            >
                                Login
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default Login;
