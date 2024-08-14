import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';
import '../styles.css';

function Navbar() {
  const navigate = useNavigate();
const [count,setCount] = useState(0);
  const handleImageClick = () => {
    navigate('/users/list'); 
    setCount(count+1);
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between', // Espace égal entre les éléments
      padding: '13px 30px',
      backgroundColor: '#333',
    }}>
      <HamburgerMenu />

      <div className="nav-links">
        <Link to="/users/acceuil" className="nav-link">Home</Link>
        <Link to="/" className="nav-link">Products</Link>
        <Link to="/users/Log" className="nav-link">Login</Link>
        <Link to="/users/cartPage" className="nav-link">CartPage</Link>
        <Link to="/users/UserSettings" className="nav-link">UserSettings</Link>
        <Link to="/users/UserDashboard" className="nav-link">UserDashboard</Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img 
          src={require('../images/shop2.png')}
          alt="Shop Logo" 
          style={{ width: '20px', height: '20px', marginRight: '50px', cursor: 'pointer' }}
          onClick={handleImageClick}
        />
              <a  style={{ display: 'flex', top: '15px',right:"87px",position: 'relative', cursor: 'pointer',color:"#17eb6f", fontSize:"15px"}}>{count} </a>

      </div>

    </nav>
  );
}
export default Navbar;
