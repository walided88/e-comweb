import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';
import '../styles.css';

function Navbar() {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  const handleImageClick = () => {
    navigate('/users/list');
    setCount(count + 1);
  };

  return (

    <div >

    <nav>
      <HamburgerMenu />

      <div className="nav-links">
        <Link to="/users/acceuil" className="nav-link">Home</Link>
        <Link to="/" className="nav-link">Products</Link>
        <Link to="/users/Log" className="nav-link">Login</Link>
        <Link to="/users/cartPage" className="nav-link">CartPage</Link>
        <Link to="/users/UserSettings" className="nav-link">UserSettings</Link>
        <Link to="/users/UserDashboard" className="nav-link">UserDashboard</Link>
      </div>

   

    </nav>

    <div >
        <img 
          src={require('../images/shop2.png')}
          alt="Shop Logo" 
          className="nav-shop"
          onClick={handleImageClick}
        />
      </div>
          <div  className="nav-count">{count}</div>
          </div>

  );
}

export default Navbar;
