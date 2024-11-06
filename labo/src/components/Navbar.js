import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';
import '../styles.css';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive'; // Importer le hook

function Navbar() {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const prodSelecteds = useSelector((state) => state.user.productNumber);

  // Définir les media queries
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 769px) and (max-width: 1024px)' });

  const handleImageClick = () => {
    navigate('/users/cartPage');
  };

  return (
  <div>
    <nav>
    <div className="mobile-nav-links">
        {isMobile && (  <HamburgerMenu /> )}
        </div> 

        <div >
    <div className="nav-links">
        <Link to="/users/acceuil" className="nav-link">Home</Link>
        <Link to="/" className="nav-link">Products</Link>
        <Link to="/users/cartPage" className="nav-link">CartPage</Link>
        <Link to="/users/Log" className="nav-link">Login for Admins</Link>
    </div>
</div>



        <div>
          <img 
            src={require('../images/shop2.png')} 
            alt="Shop Logo" 
            className="nav-shop" 
            onClick={handleImageClick}
          />
          
        </div>

      <div className="nav-shop2">{prodSelecteds}</div>
    </nav>
  </div>
);

}

export default Navbar;



