import React, { useState, useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode" // Ensure jwt-decode is correctly imported
import AccountCircleIcon from "@mui/icons-material/AccountCircle"

const Navbar = () => {
    const navigate = useNavigate()
    const isAuthenticated = !!localStorage.getItem("jwtToken")
    const [userType, setUserType] = useState("")

    useEffect(() => {
        const token = localStorage.getItem("jwtToken")
        if (token) {
            const decoded = jwtDecode(token)
            setUserType(decoded.user_type)
            console.log(userType)
        }
    }, [isAuthenticated])

    const handleLogout = () => {
        localStorage.removeItem("jwtToken")
        navigate("/login")
    }

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
                                    <NavLink
                                        className='nav-link'
                                        to='/register'
                                    >
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
                                {userType === "Admin" && (
                                    <li className='nav-item'>
                                        <NavLink
                                            className='nav-link'
                                            to='/admin'
                                        >
                                            Admin Panel
                                        </NavLink>
                                    </li>
                                )}
                                {userType === "Apartment_Leaser" && (
                                    <li className='nav-item'>
                                        <NavLink
                                            className='nav-link'
                                            to='/create-listing'
                                        >
                                            Create Listing
                                        </NavLink>
                                    </li>
                                )}
                                <li className='nav-item'>
                                    <button
                                        className='nav-link btn btn-link'
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
