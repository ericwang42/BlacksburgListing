import React, { useState } from "react"
import { Button, Card, Form } from "react-bootstrap"
import registerBackground from "../assets/registerbackground.jpg" // Import the register background image
import axios from "axios"
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        username: "",
        password: "",
        confirmPassword: "",
        userType: "",
    })
    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleUserTypeChange = (userType) => {
        setFormData({
            ...formData,
            userType,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        let apiUrl
        if (formData.userType === "resident") {
            apiUrl = "/api/Blacksburg_Resident/register"
        } else if (formData.userType === "landlord") {
            apiUrl = "/api/Apartment_Leaser/register"
        }

        try {
            const response = await axios.post(
                `http://localhost:3001${apiUrl}`,
                {
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    date_of_birth: formData.dateOfBirth,
                    school_year: null,
                    username: formData.username,
                    password_hash: formData.password,
                }
            )
            alert("User registered successfully!")
            console.log(response.data)
            setFormData({
                firstName: "",
                lastName: "",
                dateOfBirth: "",
                username: "",
                password: "",
                confirmPassword: "",
                userType: "",
            })
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.status === 409) {
                console.error("Registration failed: Username already in use");
                alert("Registration failed: Username already in use");
            } else {
                console.error(`Registration failed: ${error}`);
                alert("Registration failed!");
            }
        }
    }

    return (
        <div
            id='register'
            style={{
                minHeight: "100vh",
                backgroundImage: `url(${registerBackground})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                paddingTop: "50px",
            }}
        >
            <div className='container'>
                <Card
                    className='account-card'
                    style={{ width: "400px", margin: "auto" }}
                >
                    <Card.Body>
                        <h2 className='text-center'>Register</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    id='firstName'
                                    name='firstName'
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    id='lastName'
                                    name='lastName'
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control
                                    type='date'
                                    id='dateOfBirth'
                                    name='dateOfBirth'
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type='text'
                                    id='username'
                                    name='username'
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    id='password'
                                    name='password'
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    id='confirmPassword'
                                    name='confirmPassword'
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <p style={{ marginTop: "20px" }}>
                                    Select User Type:
                                </p>
                                <div
                                    className='btn-group btn-group-toggle'
                                    data-toggle='buttons'
                                >
                                    <Button
                                        className={`btn ${
                                            formData.userType === "resident"
                                                ? "btn-dark"
                                                : "btn-outline-white"
                                        }`}
                                        onClick={() =>
                                            handleUserTypeChange("resident")
                                        }
                                    >
                                        Resident
                                    </Button>
                                    <Button
                                        className={`btn ${
                                            formData.userType === "landlord"
                                                ? "btn-dark"
                                                : "btn-outline-white"
                                        }`}
                                        onClick={() =>
                                            handleUserTypeChange("landlord")
                                        }
                                    >
                                        Landlord
                                    </Button>
                                </div>
                            </Form.Group>
                            <Button
                                type='submit'
                                variant='success'
                                style={{ marginTop: "20px" }}
                            >
                                Create Account
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default Register
