import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';

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

      <div>
        <Link to="/users/acceuil" style={{ color: 'white', textDecoration: 'none', marginRight: '30px',marginLeft: '-470px'}}>Home</Link>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Products</Link>
        <Link to="/users/Log" style={{ color: 'white', textDecoration: 'none', marginRight: '30px',marginLeft: '30px' }}>Login </Link>
        <Link to="/users/cartPage" style={{ color: 'white', textDecoration: 'none' }}>CartPage </Link>
        <Link to="/users/UserSettings" style={{ color: 'white', textDecoration: 'none', marginRight: '30px',marginLeft: '30px' }}>UserSettings </Link>
        <Link to="/users/UserDashboard" style={{ color: 'white', textDecoration: 'none', marginRight: '30px',marginLeft: '30px' }}>UserDashboard </Link>

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
