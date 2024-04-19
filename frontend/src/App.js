import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar.js';
import Home from './components/Home.js';
import CreateAccount from './components/CreateAccount.js';
import LoginAccount from './components/LoginAccount.js';
import ListingDetails from './components/ListingDetails.js'; 
import AddReview from './components/AddReview.js';

function App() {
  return (
    <Router>
      <div className="josefin-sans">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/login" element={<LoginAccount />} />
          <Route path="/listing/:id" element={<ListingDetails />} /> {/* Add route for ListingDetails */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
