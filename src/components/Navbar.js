import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';
import '../styles.css';
import { useSelector, useDispatch } from 'react-redux';
import { setUsers, prodSelected, updateUser, deleteUser } from '../reducers/userReducer';

function Navbar() {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const prodSelecteds = useSelector((state) => state.user.productNumber);

  const handleImageClick = () => {
    navigate('/users/cartPage');

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
          <div  className="nav-count">{prodSelecteds}</div>
          </div>

  );
}

export default Navbar;
