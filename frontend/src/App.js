import logo from "./logo.svg"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Navbar from "./components/Navbar.js"
import Home from "./components/Home.js"
import Register from "./components/Register.js"
import Login from "./components/Login.js"
import ListingDetails from "./components/ListingDetails.js"
import AddReview from "./components/AddReview.js"
import Profile from "./components/Profile.js"

function App() {
    return (
        <Router>
            <div className='josefin-sans'>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                    <Route path="/listing/:id/:type" element={ListingDetails} />
                    <Route path='/profile' element={<Profile />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
