import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';  // Correct import for jwtDecode
import api from '../utils/api'; // Ensure this is your configured Axios instance

const Profile = () => {
    const [userDetails, setUserDetails] = useState({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        school_year: '',
        username: ''
    });
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [userType, setUserType] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            const decoded = jwtDecode(token);
            const { user_id, user_type } = decoded;
            setUserType(user_type); // Set user type in state

            const endpoint = `/${user_type}/${user_id}`; // Construct endpoint based on user type

            api.get(endpoint)
            .then(response => {
                setUserDetails(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Failed to load user data:', error);
                setError('Failed to load profile data.');
                setLoading(false);
            });
        }
    }, []);

    const handleChange = e => {
        const { name, value } = e.target;
        setUserDetails(prevState => ({ ...prevState, [name]: value }));
    };

    const handlePasswordChange = e => {
        const { name, value } = e.target;
        setPasswords(prevState => ({ ...prevState, [name]: value }));
    };

    const handleProfileUpdate = e => {
        e.preventDefault();
        const token = localStorage.getItem('jwtToken');
        const decoded = jwtDecode(token);
        const { user_id, user_type } = decoded;

        const updateEndpoint = `/${user_type}/${user_id}`;

        api.put(updateEndpoint, userDetails)
        .then(response => {
            alert('Profile updated successfully!');
        })
        .catch(error => {
            console.error('Failed to update profile:', error);
            setError('Failed to update profile.');
        });
    };

    const handlePasswordUpdate = e => {
        e.preventDefault();
        if (passwords.newPassword !== passwords.confirmPassword) {
            setError('New passwords do not match.');
            return;
        }

        const token = localStorage.getItem('jwtToken');
        const decoded = jwtDecode(token);
        const { user_id, user_type } = decoded;

        api.post(`/${user_type}/${user_id}/change-password`, {
            oldPassword: passwords.currentPassword,
            newPassword: passwords.newPassword
        })
        .then(response => {
            alert('Password changed successfully!');
        })
        .catch(error => {
            setError('Failed to change password.');
        });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <div>
            <h2>Edit Profile</h2>
            <Form onSubmit={handleProfileUpdate}>
                {renderFormFields(userDetails, handleChange, userType)}
                <Button variant="primary" type="submit">
                    Save Profile Changes
                </Button>
            </Form>

            <h2>Change Password</h2>
            <Form onSubmit={handlePasswordUpdate}>
                <Form.Group>
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="currentPassword"
                        value={passwords.currentPassword}
                        onChange={handlePasswordChange}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="newPassword"
                        value={passwords.newPassword}
                        onChange={handlePasswordChange}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={passwords.confirmPassword}
                        onChange={handlePasswordChange}
                    />
                </Form.Group>

                <Button variant="secondary" type="submit">
                    Change Password
                </Button>
            </Form>
        </div>
    );
};

const renderFormFields = (userDetails, handleChange, userType) => {
    // Dynamically render form fields based on userType
    if (userType === 'Admin') {
        return (
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    name="username"
                    value={userDetails.username}
                    onChange={handleChange}
                    readOnly
                />
            </Form.Group>
        );
    } else {
        return (
            <>
                <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="first_name"
                        value={userDetails.first_name}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="last_name"
                        value={userDetails.last_name}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                        type="date"
                        name="date_of_birth"
                        value={userDetails.date_of_birth}
                        onChange={handleChange}
                    />
                </Form.Group>
                {userDetails.school_year !== undefined && (
                    <Form.Group>
                        <Form.Label>School Year</Form.Label>
                        <Form.Control
                            type="number"
                            name="school_year"
                            value={userDetails.school_year}
                            onChange={handleChange}
                        />
                    </Form.Group>
                )}
            </>
        );
    }
};

export default Profile;
