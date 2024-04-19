import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';


import AdminPanel from './components/AdminPanel.js';
import Navbar from './components/Navbar.js';
import Home from './components/Home.js';
import CreateAccount from './components/CreateAccount.js';
import LoginAccount from './components/LoginAccount.js';





function App() {
  return (
    <Router>
      <div className="josefin-sans">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/create-account" element={<CreateAccount/>} />
          <Route path="/login" element={<LoginAccount/>} />
        </Routes>
        {/* <CreateAccount/> */}
        {/* <LoginAccount/> */}
      </div>
    </Router>
  );
}

export default App;

