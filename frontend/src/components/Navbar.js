import React from "react";
import { NavLink, useNavigate } from "react-router-dom";  // Import useNavigate instead of useHistory
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
    const navigate = useNavigate();  // Use useNavigate hook for navigation
    const isAuthenticated = !!localStorage.getItem('jwtToken');  // Check if JWT token is stored

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');  // Remove the stored JWT token
        navigate('/login');  // Redirect user to the login page using navigate instead of history.push
    };

    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <div className='container'>
                <NavLink className='navbar-brand mx-auto' to='/'>
                    Blacksburg Living
                </NavLink>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarNav'
                    aria-controls='navbarNav'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNav'>
                    <ul className='navbar-nav ms-auto'>
                        {!isAuthenticated ? (
                            <>
                                <li className='nav-item'>
                                    <NavLink className='nav-link' to='/register'>
                                        Register
                                    </NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink className='nav-link' to='/login'>
                                        Login
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className='nav-item'>
                                    <NavLink className='nav-link' to='/profile'>
                                        <AccountCircleIcon />
                                    </NavLink>
                                </li>
                                <li className='nav-item'>
                                    <button className='nav-link btn btn-link' onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
