import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <nav className="navbar">
      <h2>School Management</h2>
      <ul className="nav-links">
        {isLoggedIn ? (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/students">Students</Link></li>
            <li><Link to="/teachers">Teachers</Link></li>
            <li><Link to="/classes">Classes</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
}